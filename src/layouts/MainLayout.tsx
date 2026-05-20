import BottomBar from "../components/dashboard/BottomBar";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({
  children,
}: Props) {
  return (
    <div
      className="
        min-h-screen
        bg-[#0d0d0f]
        text-white
      "
    >

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(255,122,0,0.15),transparent_35%)]
        "
      />

      <main
        className="
          relative
          mx-auto
          w-full
          max-w-md
          px-5
          pb-32
          pt-6
        "
      >
        {children}
      </main>

      <BottomBar />

    </div>
  );
}