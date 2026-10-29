import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/brandConfig';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="flex flex-col items-center gap-12 mx-auto w-[88%] md:w-10/12 max-w-width-mx"
    >
      <div className="w-full">
        <div className="flex flex-col items-center mx-auto max-w-xl text-center">
          <h2 className="font-season font-normal text-tx text-3xl md:text-4xl lg:text-[44px] leading-[120%] tracking-[-1px]">
            Frequently Asked Questions
          </h2>
        </div>
      </div>

      <div className="w-full max-w-4xl">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={item.question}
              className="border-st border-b transition-colors duration-200"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggleIndex(idx)}
                className="group flex justify-between items-center gap-4 py-6 w-full text-left cursor-pointer"
              >
                <span className="font-normal text-tx group-hover:text-tx/80 text-xl leading-[130%] tracking-[-0.4px] transition-colors">
                  {item.question}
                </span>
                <div className="relative flex justify-center items-center w-6 h-6 text-tx-secondary shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`transition-transform duration-300 ease-out ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
              <div
                style={{
                  height: isOpen ? 'auto' : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                className="overflow-hidden transition-all duration-300"
              >
                <p className="pb-6 max-w-3xl text-tx-secondary text-base leading-normal">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
