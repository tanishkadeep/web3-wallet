"use client";

import { useRouter } from "next/router";
import { useRef } from "react";

const page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleNavigation = () => {
    const data = inputRef.current?.value;
    router.push({
      pathname: "/wallet",
      query: data,
    });
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen">
      <div className="flex flex-col gap-2 w-2/3">
        <div className="text-4xl font-bold">Secret Recovery Phrase</div>
        <div className="text-neutral-500 text-lg font-medium">
          Save these words in a safe place.
        </div>
      </div>
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter your secret phrase (or leave blank to generate)"
        className="px-6 py-2 rounded-md w-2/3 bg-neutral-900 border-neutral-700 border-2 text-neutral-200 outline-none placeholder:text-neutral-500"
      />
      <button
        onClick={handleNavigation}
        className="bg-neutral-200 hover:bg-neutral-50 text-neutral-800 px-8 py-2 rounded-md font-semibold text-center"
      >
        Generate Wallet
      </button>
    </div>
  );
};

export default page;
