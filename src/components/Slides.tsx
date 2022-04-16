import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';

export interface Image {
  url: string;
  alt: string;
}

interface Props {
  images: Image[];
}

const Slides = ({ images }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
  };

  return (
    <StyledImages>
      <IoIosArrowBack className="left-arrow" onClick={prevSlide} />
      {images.map((img, index) => {
        return (
          <div
            className={index === currentSlide ? 'slide active' : 'slide'}
            key={index}
          >
            {index === currentSlide && <img src={img.url} alt="hotel image" />}
          </div>
        );
      })}
      <IoIosArrowForward className="right-arrow" onClick={nextSlide} />
    </StyledImages>
  );
};

export default Slides;

const StyledImages = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  border: 1px solid black;
  img {
    width: 100%;
    height: 100%;
  }
`;
