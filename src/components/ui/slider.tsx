import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center group",
      className
    )}
    {...props}
  >
    {/* Track */}
    <SliderPrimitive.Track className="relative h-[3px] w-full grow overflow-hidden rounded-full bg-white/15">
      {/* Filled range */}
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
    </SliderPrimitive.Track>

    {/* Thumb */}
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-full",
        "border-2 border-white/70",
        "bg-gradient-to-br from-blue-400 to-violet-500",
        "shadow-[0_0_8px_rgba(139,92,246,0.6)]",
        "ring-offset-0",
        "transition-all duration-150",
        "hover:scale-125 hover:shadow-[0_0_14px_rgba(139,92,246,0.9)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        "disabled:pointer-events-none disabled:opacity-50",
        "cursor-grab active:cursor-grabbing active:scale-110"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
