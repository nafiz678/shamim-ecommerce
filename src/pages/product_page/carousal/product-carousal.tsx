import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./product-arrow-buttons";

type PropType = {
  slides: { id: number; title: string; image: string }[];
  options?: EmblaOptionsType;
};

const ProductCarousel = (props: PropType) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide cursor-grab" key={index}>
              <div className="w-full flex flex-col items-center justify-center rounded">
                <img
                  src={slide.image}
                  alt=""
                  className="size-full object-contain md:p-2 p-1 rounded"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute sm:top-1/2 top-[calc((100%/2)-10px)] -translate-y-1/2 left-0 md:-left-4 text-background">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      </div>
      <div className="absolute sm:top-1/2 top-[calc((100%/2)-10px)] -translate-y-1/2 right-0 md:-right-4 text-background">
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};

export default ProductCarousel;
