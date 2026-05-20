const exercises = [
  {
    name: "Bench Press",
    sets: "4 x 10",
  },
  {
    name: "Incline Dumbbell",
    sets: "3 x 12",
  },
  {
    name: "Cable Fly",
    sets: "3 x 15",
  },
];

export default function TodayWorkout() {
  return (
    <section className="mt-8">

      <div className="mb-5 flex items-center justify-between">

        <div>
          <p className="text-sm text-zinc-500">
            Today
          </p>

          <h2 className="text-3xl font-black">
            Push Day
          </h2>
        </div>

        <button
          className="
            rounded-2xl
            bg-[#ff7a00]
            px-5
            py-3
            font-bold
            text-black
          "
        >
          Start
        </button>

      </div>

      <div className="space-y-3">

        {exercises.map((exercise) => (
          <div
            key={exercise.name}
            className="
              flex
              items-center
              justify-between
              rounded-[24px]
              bg-[#18181b]
              p-5
            "
          >

            <div>

              <h3 className="font-semibold">
                {exercise.name}
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                {exercise.sets}
              </p>

            </div>

            <div
              className="
                h-3
                w-3
                rounded-full
                bg-[#ff7a00]
              "
            />

          </div>
        ))}

      </div>

    </section>
  );
}