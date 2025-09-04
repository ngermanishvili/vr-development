'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

const DualRangeSlider = React.forwardRef(({ 
  className, 
  label, 
  labelPosition = 'top', 
  ...props 
}, ref) => {
  const [internalValue, setInternalValue] = React.useState(props.value || [props.min, props.max])

  React.useEffect(() => {
    if (props.value) {
      setInternalValue(props.value)
    }
  }, [props.value])

  const handleValueChange = (newValue) => {
    setInternalValue(newValue)
    if (props.onValueChange) {
      props.onValueChange(newValue)
    }
  }

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
      value={internalValue}
      onValueChange={handleValueChange}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
        <SliderPrimitive.Range className="absolute h-full bg-[#cfa84f]" />
      </SliderPrimitive.Track>
      {internalValue && internalValue.map((_, index) => (
        <React.Fragment key={index}>
          <SliderPrimitive.Thumb className="dual-range-thumb relative block h-4 w-4 rounded-full bg-[#cfa84f] shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cfa84f] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer border-2 border-white">
          </SliderPrimitive.Thumb>
        </React.Fragment>
      ))}
      <style jsx>{`
        .dual-range-thumb {
          z-index: 3;
        }
        .dual-range-thumb:hover {
          z-index: 5 !important;
          transform: scale(1.1);
        }
        .dual-range-thumb:active {
          z-index: 6 !important;
          transform: scale(1.2);
        }
        .dual-range-thumb:focus {
          z-index: 6 !important;
          transform: scale(1.1);
        }
      `}</style>
    </SliderPrimitive.Root>
  );
});
DualRangeSlider.displayName = 'DualRangeSlider';

export { DualRangeSlider };