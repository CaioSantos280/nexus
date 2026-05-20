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
            min-w-[180px]
            rounded-[30px]
            bg-[#ff7a00]
            p-5
            text-black
          "
        >
          <div className="flex items-center justify-between">
            <Flame size={24} />

            <span className="text-sm font-medium">
              Calories
            </span>
          </div>

          <h2 className="mt-8 text-4xl font-black">
            2,450
          </h2>
        </div>

        <div
          className="
            min-w-[180px]
            rounded-[30px]
            bg-[#18181b]
            p-5
          "
        >
          <div className="flex items-center justify-between">
            <Dumbbell
              size={24}
              className="text-[#ff7a00]"
            />

            <span className="text-sm text-zinc-400">
              Workouts
            </span>
          </div>

          <h2 className="mt-8 text-4xl font-black">
            5
          </h2>
        </div>

        <div
          className="
            min-w-[180px]
            rounded-[30px]
            bg-[#18181b]
            p-5
          "
        >
          <div className="flex items-center justify-between">
            <Trophy
              size={24}
              className="text-[#ff7a00]"
            />

            <span className="text-sm text-zinc-400">
              PRs
            </span>
          </div>

          <h2 className="mt-8 text-4xl font-black">
            12
          </h2>
        </div>

      </section>

      <TodayWorkout />

    </MainLayout>
  );
}