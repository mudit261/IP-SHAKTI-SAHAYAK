import { Leaf, Globe2 } from "lucide-react";

export function HeroOrbit() {
  return (
    <div className="relative mx-auto hidden h-[620px] w-full max-w-[560px] items-center justify-center lg:flex">
      <div className="absolute -top-10 right-0 h-[520px] w-[520px] rounded-full border border-[#dca12f]/15" />
      <div className="absolute top-40 -right-24 h-[420px] w-[420px] rounded-full border border-[#dca12f]/10" />

      <span className="absolute right-[15%] top-[6%] h-2 w-2 rounded-full bg-[#86a878]" />
      <span className="absolute right-[2%] top-[42%] h-2.5 w-2.5 rounded-full bg-[#dca12f]" />

      <div className="absolute left-0 top-[28%] w-48 rounded-2xl border border-[#f5f0e4]/10 bg-[#173a3d]/80 p-4 backdrop-blur-sm">
        <Globe2 className="h-4 w-4 text-[#dca12f]" strokeWidth={1.75} />
        <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-[#f5f0e4]/40">
          LANGUAGES
        </p>
        <p className="mt-1 text-sm text-[#f5f0e4]/90">हिन्दी · தமிழ் · বাংলা</p>
      </div>

      <div className="relative flex h-[380px] w-[380px] items-center justify-center rounded-full border border-[#dca12f]/30">
        <div className="flex h-[300px] w-[300px] flex-col items-center justify-center gap-3 rounded-full bg-[#dca12f] text-center">
          <Leaf className="h-6 w-6 text-[#122d31]" strokeWidth={1.5} />
          <p className="font-mono text-[10px] tracking-[0.25em] text-[#122d31]/70">
            KNOWLEDGE / CARE / DUTY
          </p>
          <p className="font-serif text-3xl text-[#122d31]">sahayak</p>
        </div>
      </div>

      <div className="absolute bottom-[6%] right-0 w-56 rounded-2xl border border-[#f5f0e4]/10 bg-[#173a3d]/80 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#86a878]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#dca12f]" />
        </div>
        <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-[#f5f0e4]/40">
          EVIDENCE TRACE
        </p>
        <p className="mt-1 text-sm text-[#f5f0e4]/90">4 sources linked</p>
      </div>
    </div>
  );
}
