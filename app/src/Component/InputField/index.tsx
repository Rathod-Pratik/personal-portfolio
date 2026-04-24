import type { ChangeEventHandler, InputHTMLAttributes } from "react";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "children">;

export const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  className,
  ...rest
}: InputFieldProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring focus:ring-blue-500 focus:border-blue-500 ${className ?? ""}`}
      {...rest}
    />
  </div>
);
  