import { CheckCircle } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface HowToGuideProps {
  title: string;
  steps: Step[];
}

export default function HowToGuide({ title, steps }: HowToGuideProps) {
  return (
    <section className="bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8 md:p-12 mb-8">
      <h2
        className="text-3xl font-bold text-white mb-8 text-center"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        {title}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300"
          >
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-[#ffffff] to-[#f5f5f5] rounded-full flex items-center justify-center font-bold text-black shadow-lg">
              {index + 1}
            </div>
            <h3 className="text-lg font-semibold text-white mb-3 mt-2">
              {step.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
