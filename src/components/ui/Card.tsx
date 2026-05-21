type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-[20px]
        border border-white/[0.05]
        bg-zinc-900/40
        p-6
        backdrop-blur-2xl
        before:absolute before:inset-0
        before:bg-gradient-to-b before:from-white/[0.05] before:to-transparent
        before:pointer-events-none
        shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]
        ${className}
      `}
    >
      {/* Glow Interno */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}