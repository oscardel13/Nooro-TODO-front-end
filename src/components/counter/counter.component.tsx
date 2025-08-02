export default function Counter({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 text-sm bg-[#262626] max-content rounded-full border border-[#333333] shadow-lg text-white">
      {children}
    </div>
  );
}
