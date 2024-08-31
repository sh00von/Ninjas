import Link from 'next/link';

export default function Overview() {
  const buttons = [
    { title: 'Impact', href: '/sdg/impact/climate-action', description: 'Discover how climate change affects our world.' },
    { title: 'Cause', href: '/cause', description: 'Learn about the factors contributing to climate change.' },
    { title: 'Solution', href: '/solution', description: 'Explore ways to combat and mitigate climate change.' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-fixed bg-cover bg-center text-center p-6"
      style={{ backgroundImage: "url('/home-bg.png')" }}
    >
      <div className="bg-white bg-opacity-80 rounded-lg p-8 shadow-lg max-w-2xl">
        <h1
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fadeIn"
          style={{ fontFamily: 'Bokcero, sans-serif' }}
        >
          Overview
        </h1>
        <p className="text-md md:text-lg text-gray-700 mb-8">
          Delve into comprehensive insights about climate change. Explore its impacts, understand the underlying causes, and discover effective solutions to build a sustainable future.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buttons.map((button, index) => (
            <Link href={button.href} key={index} passHref  className="flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white py-6 px-4 rounded-xl shadow-md transform transition duration-300 hover:scale-105"
               >
           
                <h2 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'Bokcero, sans-serif' }}>
                  {button.title}
                </h2>
                <p className="text-sm text-center px-2">{button.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
