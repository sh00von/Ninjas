import { useState } from 'react';
import Image from 'next/image';

const LightboxImage = ({ src, alt, width, height }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Thumbnail Image */}
      <div
        className="relative cursor-pointer"
        style={{ width: width, height: height }}
        onClick={openModal}
      >
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="contain"
          className="transition-transform duration-300 transform hover:scale-105"
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-white bg-gray-600 rounded-full p-2"
              onClick={closeModal}
            >
              ×
            </button>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              objectFit="contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LightboxImage;
