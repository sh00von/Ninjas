import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from '/styles/sea-level-rise.module.css'; // Import the CSS module

export default function SeaLevelRise() {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: "url('/sea-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#B3E5FC', // Light ocean blue background color
      }}
    >
      <div className="w-full max-w-3xl bg-white bg-opacity-10 p-8 rounded-lg shadow-2xl backdrop-blur-md">
        <h1
          className="text-4xl md:text-5xl font-bold mb-8 text-center text-[#0288D1]" // Deep ocean blue
          style={{ fontFamily: 'Poppins, sans-serif' }} // Updated font
        >
          Impact of Sea Level Rise
        </h1>

        <div className={`${styles.step} ${styles[`step-${step}`]} transition-all duration-500`}>
          {step === 0 && (
            <div className={`${styles.stepContent} ${styles.enter} animate-fadeIn`}>
              <Image
                src="/sea-bg.png"
                alt="Sea Level Rise Impact"
                width={800}
                height={450}
                className="mx-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
              />
              <p className="text-xl md:text-2xl mt-6 leading-relaxed text-[#01579B]">
                Sea level rise is a significant consequence of climate change. It threatens coastal ecosystems, infrastructure, and communities worldwide.
              </p>
              <button
                onClick={handleNext}
                className="mt-8 px-6 py-3 bg-[#0277BD] hover:bg-[#01579B] rounded-full text-lg font-semibold text-white transition-transform transform hover:scale-105"
              >
                Show Next
              </button>
            </div>
          )}

          {step === 1 && (
            <div className={`${styles.stepContent} ${styles.enter} animate-fadeIn`}>
              <p className="text-lg md:text-xl mb-4 leading-relaxed text-[#01579B]">
                As global temperatures rise, polar ice caps and glaciers melt, leading to rising sea levels. This results in increased coastal flooding, loss of habitat, and the displacement of human populations.
              </p>
              <button
                onClick={handleNext}
                className="mt-8 px-6 py-3 bg-[#0277BD] hover:bg-[#01579B] rounded-full text-lg font-semibold text-white transition-transform transform hover:scale-105"
              >
                Show Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className={`${styles.stepContent} ${styles.enter} animate-fadeIn`}>
              <p className="text-lg md:text-xl mb-4 leading-relaxed text-[#01579B]">
                Additionally, rising sea levels exacerbate storm surges, making hurricanes and typhoons more destructive. This presents significant challenges to vulnerable coastal communities.
              </p>
              <button
                onClick={handleNext}
                className="mt-8 px-6 py-3 bg-[#0277BD] hover:bg-[#01579B] rounded-full text-lg font-semibold text-white transition-transform transform hover:scale-105"
              >
                Show Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div className={`${styles.stepContent} ${styles.enter} animate-fadeIn`}>
              <p className="text-lg md:text-xl mb-6 leading-relaxed text-[#01579B]">
                Addressing sea level rise requires global cooperation, including reducing greenhouse gas emissions, protecting coastal ecosystems, and planning for the relocation of affected populations.
              </p>
              <div className="flex justify-between items-center">
                <Link href="/impact">
                  <div className="text-[#0288D1] hover:text-[#01579B] font-semibold text-lg cursor-pointer animate-slideInLeft">
                    ← Back to Impact Overview
                  </div>
                </Link>
                <Link href="/impact/temperature-rise">
                  <div className="text-[#0288D1] hover:text-[#01579B] font-semibold text-lg cursor-pointer animate-slideInRight">
                    Next: Temperature Rise →
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
