import Link from 'next/link';
import Image from 'next/image';

export default function Impact() {
  const impacts = [
    { title: 'Sea Level Rise', description: 'Learn about the causes and impacts of rising sea levels.', href: '/sdg/impact/climate-action/sea-level-rise', img: '/sea.png' },
    { title: 'Temperature Rise', description: 'Understand how global temperatures are increasing and its effects.', href: '/impact/temperature-rise', img: '/desert.png' },
    { title: 'Natural Disaster', description: 'Explore the connection between climate change and natural disasters.', href: '/impact/natural-disaster', img: '/forest.png' },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-fixed bg-cover bg-center text-center p-6"
      style={{ backgroundImage: "url('/summer-landscape-with-green-hills-cartoon-style-design-meadow-environment-cloudscape-backdrop-generative-ai.jpg')" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {impacts.map((impact, index) => (
          <Link href={impact.href} key={index} passHref className="relative bg-white bg-opacity-80 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-opacity-100 transition-opacity duration-300 transform hover:scale-105 hover:shadow-2xl transition-transform">
          
              {/* Image centered at the top of the card with a playful bounce animation */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="rounded-full bg-white animate-bounce">
                  <Image src={impact.img} alt={impact.title} width={128} height={128} className="w-32 h-32 rounded-full" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 pt-8 text-blue-600 animate-fadeIn" style={{ fontFamily: 'Bokcero, sans-serif' }}>
                {impact.title}
              </h2>
              <p className="text-md md:text-lg text-gray-800 animate-fadeIn">{impact.description}</p>
          </Link>
        ))}
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mt-8 text-white animate-fadeIn" style={{ fontFamily: 'Bokcero, sans-serif' }}>
        Choose Your Impact
      </h1>
    </div>
  );
}
