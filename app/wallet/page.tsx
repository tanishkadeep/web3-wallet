"use client";

import { useRef, useState } from "react";
import { generateMnemonic } from "bip39";

const page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [phrase, setPhrase] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  function generate() {
    let words = inputRef.current?.value;
    let inputArray = words
      ?.split(" ")
      .map((word) => word.trim())
      .filter((word) => word !== "");

    if (inputArray?.length !== 12) {
      words = generateMnemonic();
    }

    inputArray = words
      ?.split(" ")
      .map((word) => word.trim())
      .filter((word) => word !== "");

    if (inputArray) {
      setPhrase(inputArray);
    }

    inputRef.current!.value = "";
    setDisabled(true);
  }

  return (
    <div className="flex flex-col items-center h-screen py-28 w-2/3 mx-auto">
      <div className="w-full flex flex-col gap-6 border-b-2 border-neutral-700 pb-8">
        <div className="flex flex-col gap-2 ">
          <div className="text-5xl font-bold">Secret Recovery Phrase</div>
          <div className="text-neutral-500 text-lg font-medium">
            Save these words in a safe place.
          </div>
        </div>

        <input
          type="text"
          ref={inputRef}
          disabled={disabled}
          placeholder="Enter your secret phrases each separated by a space (or leave blank to generate)"
          className="px-6 py-2 rounded-md  bg-neutral-900 disabled:bg-neutral-800  border-neutral-700 border-2 text-neutral-200 outline-none placeholder:text-neutral-500"
        />
        <button
          className="bg-neutral-200 hover:bg-neutral-50 disabled:bg-neutral-500 text-neutral-800 px-6 py-1.5 rounded-md font-semibold text-center w-fit"
          onClick={generate}
          disabled={disabled}
        >
          Generate Wallet
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8 w-full ">
        {phrase.map((word) => (
          <div className="bg-neutral-800 text-neutral-300 px-6 py-2 rounded font-medium text-center">
            {word}
          </div>
        ))}
      </div>
      {phrase.length === 12 ? (
        <div className="border-t-2 border-neutral-700 mt-8 w-full py-8">

            <div>
                Wallet
            </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default page;
