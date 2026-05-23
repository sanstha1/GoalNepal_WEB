import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  type: string;
  placeholder?: string; 
  register: UseFormRegisterReturn;
  error?: FieldError;
};

export default function InputField({
  label,
  type,
  placeholder,
  register,
  error,
}: Props) {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-black font-medium">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="
          w-full 
          px-3 py-2 
          border border-black 
          rounded
          bg-white
          text-black
          placeholder-gray-500
          focus:outline-none
          focus:ring-2
          focus:ring-black
        "
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}
