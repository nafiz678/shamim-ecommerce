import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './embela-arrow-buttons';

type PropType = {
  slides: { id: number; title: string; image: string }[];
  options?: EmblaOptionsType;
};

const EmblaCarousel = (props: PropType) => {
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
            <div className="embla__slide" key={index}>
              <div className="md:p-3 p-1 cursor-grab">
                <div className="w-full flex flex-col items-center justify-center border border-border rounded pb-4">
                  <img
                    src={slide.image}
                    alt=""
                    className="size-full object-contain md:p-4 p-1.5 rounded"
                  />
                  <h2 className="md:text-xs text-xxs font-medium">
                    {slide.title}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-[calc((100%/2)-10px)] -translate-y-1/2 left-0 md:-left-5 text-background">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      </div>
      <div className="absolute top-[calc((100%/2)-10px)] -translate-y-1/2 right-0 md:-right-5 text-background">
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};

export default EmblaCarousel;
