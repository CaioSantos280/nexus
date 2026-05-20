import { Flame } from "lucide-react";

export default function Topbar() {
  return (
    <header
      className="
        flex
        items-center
        justify-between
      "
    >
      <div>

        <p className="text-sm text-zinc-500">
          Welcome back
        </p>

        <h1
          className="
            mt-1
            text-4xl
            font-black
            tracking-tight
          "
        >
          Caio
        </h1>

      </div>

      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-[#18181b]
        "
      >
        <Flame className="text-[#ff7a00]" />
      </div>

    </header>
  );
}