import { CheckCircle } from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  title: string;
  benefits: Benefit[];
}

export default function BenefitsSection({
  title,
  benefits,
}: BenefitsSectionProps) {
  return (
    <section className="bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8 md:p-12 mb-8">
      <h2
        className="text-3xl font-bold text-white mb-8 text-center"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        {title}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#ffffff] to-[#f5f5f5] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {benefit.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {benefit.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
