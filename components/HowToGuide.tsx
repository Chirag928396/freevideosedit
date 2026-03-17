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
    <section className="bg-gray-100/50 dark:bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-zinc-800/50 p-8 md:p-12 mb-8">
      <h2
        className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        {title}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative bg-white dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-200 dark:border-zinc-700/50 hover:border-gray-400 dark:hover:border-zinc-600/50 transition-all duration-300 shadow-sm"
          >
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 rounded-full flex items-center justify-center font-bold text-white dark:text-black shadow-lg">
              {index + 1}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-2">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
