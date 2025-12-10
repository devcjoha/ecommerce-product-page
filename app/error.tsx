"use client";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-foreground">
      <h2 className="text-xl font-bold ">⚠️ Sorry, an error occurred, please try again.</h2>
      <p className="mt-2 text-red-600">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Retry
      </button>
    </div>
  );
};