"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { AuthUser } from "@/lib/types/AuthUser";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const updateUserSchema = z.object({
  fullname: z.string().min(2, { message: "Minimum 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, { message: "Max file size is 5MB" })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), { message: "Only .jpg, .jpeg, .png and .webp formats are supported" }),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;

export default function UpdateUserForm({ user }: { user: AuthUser }) {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    values: {
      fullname: user?.fullname || '',
      email: user?.email || '',
    },
  });

  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    onChange(file);
  };

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getImageUrl = (imagePath?: string | null) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050';
    const timestamp = new Date().getTime();
    return `${baseUrl}/${imagePath}?t=${timestamp}`;
  };

const onSubmit = async (data: UpdateUserData) => {
  try {
    const formData = new FormData();
    formData.append('fullname', data.fullname);
    formData.append('email', data.email);
    if (data.image) formData.append('profilePicture', data.image);

    const response = await handleUpdateProfile(formData);
    if (!response.success) throw new Error(response.message || 'Update profile failed');

    handleDismissImage();
    toast.success('Profile updated successfully');
    router.refresh();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Profile update failed';
    toast.error(message);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-8 sm:px-10">
          <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Image Preview */}
            <div className="mb-4">
              {previewImage ? (
                <div className="relative w-24 h-24">
                  {/* <img src={previewImage} alt="Profile Image Preview" className="w-24 h-24 rounded-full object-cover" /> */}
                  <Controller
                    name="image"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <button
                        type="button"
                        onClick={() => handleDismissImage(onChange)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ✕
                      </button>
                    )}
                  />
                </div>
              ) : user.profilePicture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={getImageUrl(user.profilePicture) || ''} alt="Profile Image" className="w-24 h-24 rounded-full object-cover" />
              ) : (
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">No Image</span>
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Profile Image</label>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange } }) => (
                  <input ref={fileInputRef} type="file" onChange={(e) => handleImageChange(e.target.files?.[0], onChange)} accept=".jpg,.jpeg,.png,.webp" />
                )}
              />
              {errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="fullname">Full Name</label>
              <input
                id="fullname"
                type="text"
                {...register("fullname")}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {errors.fullname && <p className="text-sm text-red-600">{errors.fullname.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
