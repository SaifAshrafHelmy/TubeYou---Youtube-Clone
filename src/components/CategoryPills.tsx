import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';
import { useEffect, useRef, useState } from 'react';

type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;

const CategoryPills = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) => {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function handleResize() {
    // Set window width/height to state
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (!container) return;
      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
      if (translate > 0) {
        const edge = container.scrollWidth;
        const width = container.clientWidth;
        console.log({ edge }, { width });
        if (translate + width >= edge) setTranslate(edge - width);
      }
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [categories, translate, windowSize]);

  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === selectedCategory ? 'dark' : 'default'}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
            onClick={() => onSelect(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant={'ghost'}
            size={'icon'}
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = Math.max(translate - TRANSLATE_AMOUNT, 0);
                return newTranslate;
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            variant={'ghost'}
            size={'icon'}
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                if (!containerRef.current) return translate;
                const newTranslate = Math.max(translate + TRANSLATE_AMOUNT, 0);
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                console.log({ edge }, { width });
                if (newTranslate + width >= edge) return edge - width;
                return newTranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryPills;
