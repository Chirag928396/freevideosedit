import AdSpace from "@/components/AdSpace";
import BenefitsSection from "@/components/BenefitsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowToGuide from "@/components/HowToGuide";
import ScrollToTool from "@/components/ScrollToTool";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type Step = {
  title: string;
  description: string;
};

type Benefit = {
  title: string;
  description: string;
  icon: ReactNode;
};

type FAQ = {
  question: string;
  answer: string;
};

type UseCase = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type VideoUseCasePageProps = {
  jsonLd: object;
  title: string;
  intro: string;
  details: string;
  accent: string;
  tool: ReactNode;
  toolLabel: string;
  useCases: UseCase[];
  howToTitle: string;
  steps: Step[];
  benefitsTitle: string;
  benefits: Benefit[];
  faqs: FAQ[];
};

export default function VideoUseCasePage({
  jsonLd,
  title,
  intro,
  details,
  accent,
  tool,
  toolLabel,
  useCases,
  howToTitle,
  steps,
  benefitsTitle,
  benefits,
  faqs,
}: VideoUseCasePageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="mx-auto max-w-[1800px] px-6 py-8">
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "2.5fr 7fr 2.5fr" }}
        >
          <AdSpace position="left" />

          <div className="col-span-12 xl:col-span-1">
            <section className="mb-8 text-center">
              <div
                className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} shadow-lg`}
              >
                {useCases[0] ? (
                  (() => {
                    const Icon = useCases[0].icon;
                    return <Icon className="h-7 w-7 text-white" />;
                  })()
                ) : null}
              </div>
              <h1
                className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {title}
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-zinc-400">
                {intro}
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-zinc-500">
                {details}
              </p>
            </section>

            <section className="mb-10 grid gap-4 md:grid-cols-3">
              {useCases.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/50"
                  >
                    <Icon className="mb-3 h-5 w-5 text-gray-900 dark:text-white" />
                    <h2 className="font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </section>

            <ScrollToTool />
            <div id="tool" className="scroll-mt-16" aria-label={toolLabel}>
              {tool}
            </div>

            <div className="mt-12">
              <HowToGuide title={howToTitle} steps={steps} />
            </div>

            <div className="mt-12">
              <BenefitsSection title={benefitsTitle} benefits={benefits} />
            </div>

            <FAQSection title="Frequently Asked Questions" faqs={faqs} />
          </div>

          <AdSpace position="right" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
