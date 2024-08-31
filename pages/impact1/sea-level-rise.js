import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LightboxImage from '../../components/LightboxImage';

export default function SeaLevelRise() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Impact', href: '/impact' },
          { label: 'Sea Level Rise', href: '/impact/sea-level-rise' },
        ]}
      />

      <main className="px-4 py-12 md:px-8 lg:px-12">
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-6">Understanding Sea Level Rise</h1>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mx-auto max-w-4xl">
            Sea level rise is a significant consequence of climate change with a range of impacts. Click on the image below to view it in a larger scale.
          </p>
        </section>

        <section className="bg-white p-6 md:p-8 rounded-lg shadow-lg mb-12 animate-fadeIn">
          <LightboxImage
            src="/graph_sealevel.png"
            alt="Sea Level Rise Trend"
            width={800}
            height={600}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
