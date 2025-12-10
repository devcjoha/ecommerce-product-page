"use client";

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-light-grayish-blue  z-50">
      <div
        className="h-1 bg-orange transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
