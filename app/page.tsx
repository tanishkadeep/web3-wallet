import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <div className="text-4xl font-bold mb-6">Web3 Wallet</div>

      <Link
        href="/wallet"
        className="bg-neutral-100 text-neutral-800 px-8 py-2 rounded-md font-semibold"
      >
        Get Started
      </Link>
    </div>
  );
}
