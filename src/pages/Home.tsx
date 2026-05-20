import MainLayout from "../layouts/MainLayout";
import Topbar from "../components/dashboard/Topbar";
import TodayWorkout from "../components/dashboard/TodayWorkout";

import {
  Flame,
  Dumbbell,
  Trophy,
} from "lucide-react";

export default function Home() {
  return (
    <MainLayout>

      <Topbar />

      <section
        className="
          mt-8
          overflow-hidden
          rounded-[36px]
          bg-[#ff7a00]
          p-6
          text-black
        "
      >

        <p className="text-sm font-medium opacity-70">
          Weekly Progress
        </p>

        <h2
          className="
            mt-3
            text-5xl
            font-black
            leading-none
            tracking-tight
          "
        >
          5
        </h2>

        <p className="mt-2 text-black/70">
          workouts completed this week
        </p>

        <div
          className="
            mt-8
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              rounded-2xl
              bg-black/10
              p-4
            "
          >
            <Flame size={24} />
          </div>

          <div>
            <p className="text-sm opacity-70">
              Current streak
            </p>

            <h3 className="text-2xl font-black">
              7 days
            </h3>
          </div>

        </div>

      </section>

      <section
        className="
          -mx-5
          mt-6
          flex
          gap-4
          overflow-x-auto
          px-5
          pb-2
          scrollbar-none
        "
      >

        <div
          className="
            min-w-[170px]
            rounded-[28px]
            bg-[#18181b]
            p-5
          "
        >
          <Dumbbell
            className="text-[#ff7a00]"
            size={24}
          />

          <h2 className="mt-8 text-4xl font-black">
            12
          </h2>

          <p className="mt-1 text-zinc-500">
            Exercises
          </p>
        </div>

        <div
          className="
            min-w-[170px]
            rounded-[28px]
            bg-[#18181b]
            p-5
          "
        >
          <Trophy
            className="text-[#ff7a00]"
            size={24}
          />

          <h2 className="mt-8 text-4xl font-black">
            4
          </h2>

          <p className="mt-1 text-zinc-500">
            PRs achieved
          </p>
        </div>

      </section>

      <TodayWorkout />

    </MainLayout>
  );
}