import {
  useCallback,
  useEffect,
  useState,
  type ComponentPropsWithRef,
} from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft02FreeIcons,
  ArrowRight02FreeIcons,
} from '@hugeicons/core-free-icons';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const updateButtons = () => onSelect(emblaApi);

    queueMicrotask(updateButtons);

    emblaApi.on('reInit', updateButtons);
    emblaApi.on('select', updateButtons);

    return () => {
      emblaApi.off('reInit', updateButtons);
      emblaApi.off('select', updateButtons);
    };
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton = (props: PropType) => {
  const { children, disabled, ...restProps } = props;

  return (
    <button
      className={'embla__button embla__button--prev'.concat(
        disabled ? ' embla__button--disabled' : '',
      )}
      type="button"
      {...restProps}
    >
      <div className="sm:size-8 size-5 p-1 sm:p-0 flex items-center justify-center rounded-full bg-secondary">
        <HugeiconsIcon icon={ArrowLeft02FreeIcons} />
      </div>
      {children}
    </button>
  );
};

export const NextButton = (props: PropType) => {
  const { children, disabled, ...restProps } = props;

  return (
    <button
      className={'embla__button embla__button--next'.concat(
        disabled ? ' embla__button--disabled' : '',
      )}
      type="button"
      {...restProps}
    >
      <div className="sm:size-8 size-5 p-1 sm:p-0 flex items-center justify-center rounded-full bg-secondary">
        <HugeiconsIcon icon={ArrowRight02FreeIcons} />
      </div>
      {children}
    </button>
  );
};
