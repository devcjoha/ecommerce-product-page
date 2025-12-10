export default function Loader() {
  return (
    <div className="flex h-64 space-x-2 justify-center items-center">
      <span className="w-2 h-2 bg-orange rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-orange rounded-full animate-bounce [animation-delay:-.3s]"></span>
      <span className="w-2 h-2 bg-orange rounded-full animate-bounce [animation-delay:-.6s]"></span>
    </div>
  );
}