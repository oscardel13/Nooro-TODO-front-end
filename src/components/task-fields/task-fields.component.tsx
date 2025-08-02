import Link from "next/link";
import Image from "next/image";
import InputField from "../input-field/input-field.component";

type TaskFields_Type = {
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleColorClick: (e: React.MouseEvent<HTMLInputElement>) => void;
  title?: string;
  selectedColor?: string;
};

export default function TaskFields(props: TaskFields_Type) {
  const { handleColorClick, handleTitleChange, title, selectedColor } = props;
  const COLORS = {
    red: "#FF3B30",
    orange: "#FF9500",
    yellow: "#FFCC00",
    green: "#34C759",
    blue: "#007AFF",
    indigo: "#5856D6",
    purple: "#AF52DE",
    pink: "#FF2D55",
    brown: "#A2845E",
  };
  return (
    <>
      <Link className="max-w-max" href="/" aria-label="Home">
        <Image
          aria-hidden
          src="/back-arrow.svg"
          alt="back-arrow icon"
          width={20}
          height={20}
        />
      </Link>
      <InputField title={"Title"}>
        <input
          type="text"
          className="flex flex-row p-4 bg-[#262626] border border-[#333333] shadow-md rounded-lg text-[#F2F2F2] text-sm"
          placeholder="Ex. Brush you teeth"
          value={title}
          onChange={handleTitleChange}
        />
      </InputField>

      <InputField title={"Color"}>
        <div className="flex flex-row flex-wrap gap-3">
          {Object.entries(COLORS).map(([color, hex]) => (
            <input
              key={color}
              type="radio"
              name="color"
              value={color}
              className="appearance-none h-[52px] w-[52px] rounded-full cursor-pointer border-2 border-transparent checked:border-white"
              style={{ backgroundColor: hex }}
              onClick={handleColorClick}
              checked={color === selectedColor}
              readOnly
            />
          ))}
        </div>
      </InputField>
    </>
  );
}
