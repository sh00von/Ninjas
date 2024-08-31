// pages/choose-sdg.js
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ChooseSDG() {
  const sdgs = [
    { title: 'No Poverty', href: '/sdg/no-poverty' },
    { title: 'Zero Hunger', href: '/sdg/zero-hunger' },
    { title: 'Good Health and Well-being', href: '/sdg/good-health' },
    { title: 'Quality Education', href: '/sdg/quality-education' },
    { title: 'Climate Action', href: '/sdg/climate-action' },
    { title: 'Clean Water and Sanitation', href: '/sdg/clean-water' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: "url('/home-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1
        className="text-4xl md:text-5xl font-bold mb-12 text-center text-white"
        style={{ fontFamily: 'Bokcero, sans-serif' }}
      >
        Choose Your SDG Goal
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center w-full max-w-5xl">
        {sdgs.map((sdg, index) => (
          <motion.div
            key={index}
            className="relative p-8 rounded-lg shadow-2xl cursor-pointer flex flex-col items-center justify-center transition-transform"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
            whileHover={{
              scale: 1.15,
              rotate: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={sdg.href}>
              <h2
                className="text-3xl md:text-4xl font-bold text-white transition-all duration-300"
                style={{ fontFamily: 'Bokcero, sans-serif' }}
              >
                {sdg.title}
              </h2>
            </Link>
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0) 60%, rgba(255,255,255,0.2) 100%)',
                zIndex: -1,
              }}
              whileHover={{ scale: 1.3, opacity: 0.5 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
