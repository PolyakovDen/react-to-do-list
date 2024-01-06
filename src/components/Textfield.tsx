import { useRef } from "react";
import { Keys } from "@/constants/keys";

export default function Textfield({
  value = "",
  placeholder = "",
  disabled = false,
  type = "text",
  onChange = () => {},
  handleEnter = () => {},
}: {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  onChange?: (value: string) => void;
  handleEnter?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const blur = () => {
    if (inputRef.current) inputRef.current.blur();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Keys.Enter) {
      blur();
      handleEnter();
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        className="focus:border-blue-500 rounded-md py-2 px-3 w-80"
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </>
  );
}
