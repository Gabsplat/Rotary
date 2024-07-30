export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-blue-rotary text-white px-4 py-2 rounded-md">
      {children}
    </button>
  );
}
