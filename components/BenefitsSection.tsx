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
    <section className="bg-gray-100/50 dark:bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-zinc-800/50 p-8 md:p-12 mb-8">
      <h2
        className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        {title}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-200 dark:border-zinc-700/50 hover:border-gray-400 dark:hover:border-zinc-600/50 transition-all duration-300 group shadow-sm"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {benefit.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {benefit.title}
            </h3>
            <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
