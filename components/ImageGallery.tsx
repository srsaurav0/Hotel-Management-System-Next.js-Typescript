import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ImageGalleryProps {
  images: string[];
  totalImageCount: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, totalImageCount }) => {
  const router = useRouter();

  const mainImage = images[0] ? `${images[0]}` : null;
  const sideImages = images.slice(1, 4).map(image => `${image}`);

  const handleImageCountButtonClick = () => {
    console.log('Image count button clicked');

    // Prepare image data for query
    const imageData = images.map((image, index) => ({
      src: image,
      alt: `Image ${index + 1}`
    }));

    router.push({
      pathname: '/ExpandedImageGallery',
      query: {
        images: JSON.stringify(imageData)
      }
    });
  };

  return (
    <div className="gallery">
      <div className="gallery-main">
        {mainImage ? (
          <Image src={mainImage} alt="Main image" width={600} height={400} />
        ) : (
          <p>No main image available</p>
        )}
      </div>
      <div className="gallery-side">
        {sideImages.map((image, index) => (
          image ? (
            <Image key={index} src={image} alt={`Side image ${index + 1}`} width={200} height={150} />
          ) : null
        ))}
        {totalImageCount > 4 && (
          <div className="gallery-image-container">
            {images[4] ? (
              <Image src={`${images[4]}`} alt="Extra image" width={200} height={150} />
            ) : null}
            <a onClick={handleImageCountButtonClick} className="image-count-btn">
              <span className="gallery-icon">📸</span>
              <span className="image-count">{totalImageCount}</span>
              <span className="plus-icon">+</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
