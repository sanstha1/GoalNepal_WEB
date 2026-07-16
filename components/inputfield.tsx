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
      <label className="block mb-1 text-[#2F2F2F] font-medium">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="
          w-full 
          px-3 py-2 
          border border-[#E5E7EB] 
          rounded
          bg-white
          text-[#2F2F2F]
          placeholder-[#9CA3AF]
          focus:outline-none
          focus:ring-2
          focus:ring-[#FF8A2A]
        "
      />

      {error && (
        <p className="text-[#EF4444] text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}