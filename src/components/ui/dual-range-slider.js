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
      <SliderPrimitive.Track className="relative h-[1px] w-full grow overflow-hidden rounded-full bg-gray-200">
        <SliderPrimitive.Range className="absolute h-full bg-[#cfa84f]" />
      </SliderPrimitive.Track>
      {internalValue && internalValue.map((_, index) => (
        <React.Fragment key={index}>
          <SliderPrimitive.Thumb className="dual-range-thumb relative block h-4 w-4 bg-[#cfa84f] shadow-md transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
          </SliderPrimitive.Thumb>
        </React.Fragment>
      ))}
      <style jsx>{`
        .dual-range-thumb {
          z-index: 3;
        }
        .dual-range-thumb:hover {
          z-index: 5 !important;
        }
        .dual-range-thumb:active {
          z-index: 6 !important;
        }
        .dual-range-thumb:focus {
          z-index: 6 !important;
        }
      `}</style>
    </SliderPrimitive.Root>
  );
});
DualRangeSlider.displayName = 'DualRangeSlider';

export { DualRangeSlider };