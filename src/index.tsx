import React, {
  CanvasHTMLAttributes,
  createContext,
  DetailedHTMLProps,
  RefObject,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const getKey = (text: string, textStyle: string) => `${text}::${textStyle}`;

const TextMeasurerContext = createContext<{
  ref: RefObject<HTMLCanvasElement>;
  cache: Map<string, number>;
  measurer(text: string, textStyle: string): number;
}>(null);

export const TextMeasurementProvider = ({children, ...props}: CanvasProps) => {
  const ref = useRef<HTMLCanvasElement>();
  const scaled = useRef(false);
  const [cache] = useState(new Map<string, number>());

  const measurer = useCallback(
    (text: string, textStyle: string) => {
      if (!text?.trim().length) return 0;

      const key = getKey(text, textStyle);
      if (cache.has(key)) return cache.get(key);
      if (!ref.current) return 0;

      const ctx = ref.current.getContext('2d');
      ctx.font = textStyle;

      const {width} = ctx.measureText(text);
      cache.set(key, width);
      return width;
    },
    [cache]
  );

  const context = useMemo(() => ({ref, cache, measurer}), [
    ref,
    cache,
    measurer,
  ]);

  useLayoutEffect(function scaleCanvasForDisplay() {
    if (!ref.current) return;
    if (scaled.current) return;

    const ctx = ref.current.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const bsr =
      (ctx as any).webkitBackingStorePixelRatio ||
      (ctx as any).mozBackingStorePixelRatio ||
      (ctx as any).msBackingStorePixelRatio ||
      (ctx as any).oBackingStorePixelRatio ||
      (ctx as any).backingStorePixelRatio ||
      1;
    const ratio = dpr / bsr;

    ref.current.width = CANVAS_WIDTH * ratio;
    ref.current.height = CANVAS_HEIGHT * ratio;
    ref.current.style.width = CANVAS_WIDTH + 'px';
    ref.current.style.height = CANVAS_HEIGHT + 'px';
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    scaled.current = true;
  });

  return (
    <TextMeasurerContext.Provider value={context}>
      <canvas ref={ref} {...props} />
      {children}
    </TextMeasurerContext.Provider>
  );
};
TextMeasurementProvider.defaultProps = {
  style: {
    position: 'absolute',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    zIndex: -100,
    left: -2000,
    top: -2000,
  },
};

export const useTextMeasurer = (
  textStyle: string
): ((text: string) => number) => {
  const [match, weight, size, family] = /([a-z0-9]+)\s([a-z0-9\.]+)\s(.*)/.exec(
    textStyle
  );
  if (/rem/.test(size)) {
    let inPx = parseFloat(size) * 16;

    textStyle = `${weight} ${inPx}px ${family}`;
  }
  const {measurer} = useContext(TextMeasurerContext);

  return useCallback(
    (text: string) => {
      return measurer(text, textStyle);
    },
    [measurer, textStyle]
  );
};

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 20;

type CanvasProps = DetailedHTMLProps<
  CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;
