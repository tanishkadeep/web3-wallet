import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <div className="text-4xl font-bold mb-6 text-indigo-500">Web3 Wallet</div>

      <Link
        href="/mnemonics"
        className="bg-indigo-200 text-neutral-900 px-8 py-2 rounded-md font-semibold"
      >
        Get Started
      </Link>
    </div>
  );
}
