import Link from 'next/link';

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-fixed bg-cover bg-center text-center"
      style={{ backgroundImage: "url('/home-bg.png')" }}
    >
      <h1 className="text-7xl font-bold mb-4 animate-fadeIn" style={{ fontFamily: 'Bokcero, sans-serif', color: 'white' }}>
        Oi GHG nah Pleasee 
      </h1>
      
      <p className="text-xl text-white mb-12 animate-fadeIn">
        Are you ready to make a difference?
      </p>

      <Link href="/choose-sdg">
        <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-full text-2xl font-bold transition-colors animate-bounce">
          Get Started
        </button>
      </Link>
    </div>
  );
}
