type Props = {
  children: React.ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-5
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-orange-500/20
        hover:bg-white/[0.07]
      "
    >
      {children}
    </div>
  );
}