"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  faqs: FAQ[];
}

export default function FAQSection({ title, faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8 md:p-12 mb-8">
      <h2
        className="text-3xl font-bold text-white mb-8 text-center"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        {title}
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-zinc-800/50 rounded-xl border border-zinc-700/50 overflow-hidden transition-all duration-300 hover:border-zinc-600/50"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-zinc-800/80 transition-colors"
            >
              <span className="text-white font-semibold pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-zinc-400 transition-transform duration-300 flex-shrink-0 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="px-6 pb-4 text-zinc-400 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
