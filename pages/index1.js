import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {

  const breadcrumbs = [
    { label: 'Home', href: '/' },

    { label: 'GHG Overview' },
  ];
  return (
    <div className="min-h-screen bg-green-50">
<Header breadcrumbs={breadcrumbs} />

      <main className="flex flex-col items-center px-4">
        {/* Animated Globe with Ozone Layer */}
        <div className="globe-container my-12">
          <div className="globe">
            <div className="ozone-layer"></div>
          </div>
        </div>

        {/* GHG Overview */}
        <section className="w-full max-w-3xl px-4 mt-12">
          <h2 className="text-3xl font-semibold text-green-900 mb-6 text-center animate-fadeIn">What Are Greenhouse Gases?</h2>
          <p className="text-green-800 mb-6 text-lg animate-fadeIn text-justify leading-relaxed">
            The greenhouse effect is the process through which heat is trapped near Earth's surface by substances known as 'greenhouse gases.' Imagine these gases as a cozy blanket enveloping our planet, helping to maintain a warmer temperature than it would have otherwise. Greenhouse gases consist of carbon dioxide, methane, ozone, nitrous oxide, chlorofluorocarbons, and water vapor. Water vapor, which reacts to temperature changes, is referred to as a 'feedback,' because it amplifies the effect of forces that initially caused the warming.
          </p>
        </section>

        {/* See Impact Button */}
        <Link href="/impact">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors">
            See Impact
          </button>
        </Link>

        {/* Image Section */}
        <div className="my-12 text-center">
          <Image
            src="/6166906.jpg"
            alt="GHG Theme"
            width={800} // Specify the width of the image
            height={600} // Specify the height of the image
            className="rounded-lg shadow-lg"
          />
          <p className="mt-4 text-green-700 text-md">
          Visual representation of greenhouse gases and their impact on our environment.
          </p>
        </div>
      </main>
<Footer/>

      {/* Add CSS animations and globe styling */}
      <style jsx>{`
  .animate-bounce {
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 2s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .globe-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .globe {
    width: 150px;
    height: 150px;
    background-color: #4CAF50;
    border-radius: 50%;
    position: relative;
    animation: rotate 10s infinite linear;
    z-index: 1; /* Ensure globe is above the ozone layer */
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .globe:before, .globe:after {
    content: '';
    position: absolute;
    border-radius: 50%;
  }

  .globe:before {
    width: 60%;
    height: 60%;
    top: 20%;
    left: 20%;
    background-color: #66BB6A;
  }

  .globe:after {
    width: 30%;
    height: 30%;
    top: 35%;
    left: 35%;
    background-color: white;
  }

  .ozone-layer {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 6px solid rgba(0, 123, 255, 0.5);
    animation: ozone-pulse 4s infinite ease-in-out;
    transform: translate(-50%, -50%);
    z-index: 0; /* Ensure ozone layer is behind the globe */
  }

  @keyframes ozone-pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.5;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.3);
      opacity: 0.3;
    }
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    .globe {
      width: 120px;
      height: 120px;
    }

    .ozone-layer {
      width: 150px;
      height: 150px;
      border-width: 4px;
    }
  }

  @media (max-width: 480px) {
    .globe {
      width: 100px;
      height: 100px;
    }

    .ozone-layer {
      width: 120px;
      height: 120px;
      border-width: 3px;
    }
  }
`}</style>

    </div>
  );
}
