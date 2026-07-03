interface TickerProps {
  texts: string[];
}

export default function Ticker({ texts }: TickerProps) {
  const repeated = [...texts, ...texts, ...texts, ...texts];

  return (
    <div
      className="w-full overflow-hidden py-3 select-none"
      style={{
        background: "#0a0a0a",
        color: "#f0ece4",
      }}
    >
      <div className="animate-marquee">
        {repeated.map((text, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 flex-shrink-0"
          >
            <span
              className="font-black uppercase text-xs tracking-widest whitespace-nowrap px-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.2em" }}
            >
              {text}
            </span>
            <span className="text-[#e8291c] font-black text-base">+</span>
          </span>
        ))}
      </div>
    </div>
  );
}
