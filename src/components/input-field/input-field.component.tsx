type InputTypes = {
  title: string;
  children: React.ReactNode;
};

export default function InputField({ children, title }: InputTypes) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#4EA8DE]">{title}</label>
      {children}
    </div>
  );
}
