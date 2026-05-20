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
      <main className="px-5 pb-32 pt-6">
        {children}
      </main>

      <BottomBar />
    </div>
  );
}