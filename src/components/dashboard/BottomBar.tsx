import {
  LayoutDashboard,
  Dumbbell,
  ChartNoAxesCombined,
  Apple,
 Target,
} from "lucide-react";

const links = [
  {
    icon: LayoutDashboard,
  },
  {
    icon: Dumbbell,
  },
  {
    icon: ChartNoAxesCombined,
  },
  {
    icon: Apple,
  },
  {
    icon: Target,
  },
];

export default function BottomBar() {
  return (
    <nav
      className="
        fixed
        bottom-4
        left-1/2
        z-50
        flex
        w-[92%]
        max-w-md
        -translate-x-1/2
        items-center
        justify-around
        rounded-[28px]
        border
        border-white/10
        bg-[#151518]/90
        p-3
        backdrop-blur-xl
      "
    >
      {links.map((link, index) => {
        const Icon = link.icon;

        return (
          <button
            key={index}
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              text-zinc-500
              transition-all
              duration-300
              hover:bg-[#1d1d21]
              hover:text-[#ff7a00]
            "
          >
            <Icon size={24} />
          </button>
        );
      })}
    </nav>
  );
}