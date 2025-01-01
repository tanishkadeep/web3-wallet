"use client";

import { useRef, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { IoMdCheckmark } from "react-icons/io";

const page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [phrase, setPhrase] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const [publicKey, setPublicKey] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");

  const copy = (text: string) => {
    if (text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

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

    const seed = mnemonicToSeedSync(words!);
    const path = `m/44'/501'/1'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    setPublicKey(Keypair.fromSecretKey(secret).publicKey.toBase58());
    const keypair = Keypair.fromSecretKey(secret);
    setPrivateKey(bs58.encode(keypair.secretKey));
  }

  return (
    <div className="flex flex-col items-center h-screen py-28 w-2/3 mx-auto max-w-7xl">
      <div className="w-full flex flex-col gap-6">
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
      <div className="flex justify-end w-full -mt-4">
        {phrase.length === 12 ? (
          <button
            className="flex items-center gap-2 bg-neutral-800 p-2 rounded-md font-semibold text-center"
            onClick={() => copy(phrase.join(" "))}
          >
            <MdContentCopy className="cursor-pointer text-neutral-600 dark:text-neutral-300 hover:scale-105" />
          </button>
        ) : (
          <div></div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 w-full ">
        {phrase.map((word) => (
          <div className="bg-neutral-800 text-neutral-300 px-6 py-2 rounded font-medium text-center">
            {word}
          </div>
        ))}
      </div>
      {phrase.length === 12 ? (
        <div className="border-t-2 border-neutral-700 mt-8 w-full py-8">
          <div className="text-4xl font-bold mb-6">Wallet</div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Public Key */}
            <div className="text-lg font-medium">Public Key:</div>
            <div className="col-span-2 bg-neutral-800 text-neutral-300 py-2 rounded flex items-center justify-between px-6 gap-4">
              <div className="truncate">{publicKey}</div>
              <MdContentCopy
                className="cursor-pointer text-neutral-600 dark:text-neutral-300 hover:scale-105 w-20"
                onClick={() => copy(publicKey)}
              />
            </div>

            {/* Private Key */}
            <div className="text-lg font-medium mt-2">Private Key:</div>
            <div className="col-span-2 bg-neutral-800 text-neutral-300 py-2 rounded flex items-center justify-between px-6 gap-4">
              <div className="truncate">{privateKey}</div>
              <MdContentCopy
                className="cursor-pointer text-neutral-600 dark:text-neutral-300 hover:scale-105 w-20"
                onClick={() => copy(privateKey)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {showToast && (
        <div className="fixed bottom-8 right-12 bg-neutral-800 text-white px-6 py-2 rounded-md shadow-lg font-medium flex items-center gap-2 border border-neutral-600">
          <IoMdCheckmark /> Copied to clipboard
        </div>
      )}
    </div>
  );
};

export default page;
