import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {ListChildComponentProps, VariableSizeList} from 'react-window';
import names from './names.json';
import {TextMeasurementProvider, useTextMeasurer} from '../index';

export default {
  title: 'Examples',
};

const DynamicHeightList = function () {
  const measure = useTextMeasurer(`normal ${FONT_SIZE}px '${FONT_FAMILY}'`);
  const cache = useRef(new Map<string, number>());
  const list = useRef<VariableSizeList>(null);
  const [width, setWidth] = useState(500);

  const itemSize = useCallback(
    function computeRowHeight(rowIndex: number) {
      const name = names[rowIndex];
      const availableWidth = width - PADDING_X * 2;

      if (!cache.current.has(name)) {
        let numLines = 1;

        if (measure(name) > availableWidth) {
          let words = name.split(/([\s\-\.\@])/);
          let line = '';

          while (words.length) {
            let word = words.shift();
            let nextLine = line + word;
            let length = measure(nextLine);

            if (length > availableWidth) {
              numLines++;
              line = word;
            } else {
              line = nextLine;
            }
          }
        }

        cache.current.set(
          name,
          PADDING_Y * 2 + numLines * FONT_SIZE + (numLines - 1) * LINE_HEIGHT
        );
      }

      return cache.current.get(name);
    },
    [measure, width]
  );

  useLayoutEffect(
    function onResized() {
      cache.current.clear();
      list.current?.resetAfterIndex(0);
    },
    [measure, width]
  );

  return (
    <>
      <VariableSizeList
        ref={list}
        width={width}
        height={500}
        itemSize={itemSize}
        itemKey={itemKey}
        itemCount={names.length}
      >
        {Row}
      </VariableSizeList>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '2rem 0',
          width: 500,
        }}
      >
        <label htmlFor="width-slider">Width: {width}px</label>
        <input
          name="width-slider"
          type="range"
          min="150"
          max="500"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </div>
    </>
  );
};

export const windowingWithDynamicHeights = function () {
  return (
    <TextMeasurementProvider>
      <DynamicHeightList />
    </TextMeasurementProvider>
  );
};

const PADDING_X = 4;
const PADDING_Y = 8;
const FONT_SIZE = 18;
const LINE_HEIGHT = 6;
const FONT_FAMILY = 'Arial';

const Row = memo(({index, style}: ListChildComponentProps) => {
  const name = names[index];
  const background = index % 2 ? 'lightGray' : 'white';

  return (
    <div
      style={{
        background,
        boxSizing: 'border-box',
        fontFamily: FONT_FAMILY,
        fontSize: FONT_SIZE,
        padding: `${PADDING_Y}px ${PADDING_X}px`,
        wordBreak: 'break-all',
        ...style,
      }}
    >
      {name}
    </div>
  );
});

function itemKey(rowIndex: number) {
  return names[rowIndex];
}
