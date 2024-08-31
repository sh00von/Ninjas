import { useRef, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const impacts = [
  {
    id: 'sea-level-rise', // Added ID for scrolling
    title: 'Sea Level Rise',
    description: 'Rising sea levels due to melting ice caps and glaciers are causing coastal flooding and erosion, threatening communities and ecosystems.',
    imageUrl: 'https://images.pexels.com/photos/16094765/pexels-photo-16094765/free-photo-of-sea-waves-splashing.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/impact/sea-level-rise',
    bgColor: 'bg-green-700',
    textColor: 'text-green-100',
    textHoverColor: 'text-green-200'
  },
  {
    id: 'natural-disasters', // Added ID for scrolling
    title: 'Natural Disasters',
    description: 'Increased global temperatures are leading to more frequent and severe natural disasters like hurricanes, droughts, and wildfires.',
    imageUrl: 'https://images.pexels.com/photos/51951/forest-fire-fire-smoke-conservation-51951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/impact/natural-disasters',
    bgColor: 'bg-yellow-600',
    textColor: 'text-yellow-100',
    textHoverColor: 'text-yellow-200'
  },
  {
    id: 'temperature-rise', // Added ID for scrolling
    title: 'Temperature Rise',
    description: 'The rise in global temperatures is leading to heatwaves and altering weather patterns, impacting agriculture, water resources, and human health.',
    imageUrl: 'https://images.pexels.com/photos/764998/pexels-photo-764998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/impact/temperature-rise',
    bgColor: 'bg-red-600',
    textColor: 'text-red-100',
    textHoverColor: 'text-red-200'
  }
];

export default function Impact() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Impact', href: '/impact' }
  ];

  const cardRefs = useRef([]);

  useEffect(() => {
    // Auto-scroll to the card with ID 'sea-level-rise' after fade-in animation
    const targetId = 'sea-level-rise'; // Change this to the ID of the card you want to scroll to
    const targetCard = cardRefs.current.find(card => card && card.id === targetId);
    if (targetCard) {
      setTimeout(() => {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 2000); // Delay to match the fade-in duration
    }
  }, []);

  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <Header breadcrumbs={breadcrumbs} />

      <main className="px-4 py-12 md:px-8 lg:px-12">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-green-900 mb-6">Impact of Greenhouse Gases</h2>
          <p className="text-lg text-green-700 leading-relaxed mx-auto max-w-3xl">
            Explore how greenhouse gases affect our planet in various ways. Click on each impact to learn more about its effects and what we can do to address it.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {impacts.map((impact, index) => (
            <div
              key={index}
              id={impact.id} // Assign ID for scrolling
              ref={(el) => cardRefs.current[index] = el} // Assign ref to each card
              className={`relative overflow-hidden rounded-lg shadow-lg ${impact.bgColor} p-6 transform transition-transform duration-500 ease-in-out group animate-fadeIn`}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={impact.imageUrl}
                  alt={impact.title}
                  layout="fill"
                  objectFit="cover"
                  className="opacity-40"
                />
              </div>
              <div className="relative z-10 flex flex-col justify-between h-full p-4">
                <div className="mb-6">
                  <h3 className={`text-2xl font-extrabold ${impact.textColor} mb-4 group-hover:${impact.textHoverColor}`}>{impact.title}</h3>
                  <p className="text-gray-200 text-lg leading-relaxed">
                    {impact.description}
                  </p>
                </div>
                <Link href={impact.link} className="block w-full text-center mt-auto">
                  <button className="btn glass">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
