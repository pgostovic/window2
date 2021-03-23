import React, { FC, useEffect, useRef, useState } from 'react';

import { Scroller, ScrollerRef } from '../src';

const NUM = 1000;

const numbers: number[] = [];
for (let i = 0; i < NUM; i++) {
  numbers.push(i);
}

const sizes: (number | 'natural')[] = [];
for (let i = 0; i < NUM; i++) {
  if (i === 0) {
    sizes.push('natural');
  } else {
    sizes.push(20 + Math.round(Math.random() * 50));
  }
}

let offset = { x: 0, y: 0 };

export const ItemSizes: FC = () => {
  const windowRef = useRef<ScrollerRef>();
  const [slice, setSlice] = useState(NUM);

  const slicedNums = numbers.slice(0, slice);
  const slicedSizes = sizes.slice(0, slice);

  useEffect(() => {
    return () => {
      offset = windowRef.current.getOffset();
    };
  });
  return (
    <>
      <button onClick={() => setSlice(5)}>Slice 5</button>
      <button onClick={() => setSlice(25)}>Slice 25</button>
      <button onClick={() => setSlice(1000)}>Slice 1000</button>
      <Scroller
        ref={windowRef}
        style={{ height: '500px', width: '200px' }}
        rows={slicedNums}
        rowHeight={index => slicedSizes[index]}
        initOffset={offset}
      >
        {(num: number, { row }) => (
          <div style={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
            <span style={{ flex: 1 }}>{num}</span>
            <span style={{ fontSize: 'small', color: '#999' }}>{slicedSizes[row]}px</span>
          </div>
        )}
      </Scroller>
      <p>
        Note: Offset is saved on unmount (via ScrollerRef.getOffset()) and then applied on mount
        (via initOffset prop). If you navigate to another story, then navigate back to this one, the
        scroll offset will be the same.
      </p>
    </>
  );
};
