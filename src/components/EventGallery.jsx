import React, { useState } from "react";

const EventGallery = ({ images }) => {
  const [zoomedIndex, setZoomedIndex] = useState(null);

  if (!images || images.length === 0) return null;

  const openZoom = (index) => setZoomedIndex(index);
  const closeZoom = () => setZoomedIndex(null);
  const nextImage = () => setZoomedIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setZoomedIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="mb-8">
      {/* Gallery Thumbnails */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Gallery ${index + 1}`}
            className="rounded-lg cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={() => openZoom(index)}
          />
        ))}
      </div>

      {zoomedIndex !== null && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90">
          {/* Close button */}
          <button
            onClick={closeZoom}
            className="absolute top-5 right-5 text-white text-4xl font-bold z-50"
          >
            &times;
          </button>

          {/* Previous Button */}
          <button
            onClick={prevImage}
            className="absolute left-5 text-white text-4xl font-bold z-50"
          >
            &#8249;
          </button>

          {/* Zoomed Image */}
          <img
            src={galleryImages[zoomedIndex]}
            alt={`Zoomed ${zoomedIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-xl object-contain"
          />

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-5 text-white text-4xl font-bold z-50"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
};

export default EventGallery;
