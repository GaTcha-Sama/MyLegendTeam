import { Sport } from "./sports";

export interface SlotSize {
  width: string;
  height: string;
}

export const slotSizes: Record<Sport, SlotSize> = {
  basketball: {
    width: "w-36", 
    height: "h-46"
  },
  rugby: {
    width: "w-30",
    height: "h-40"
  },
  football: {
    width: "w-32",
    height: "h-42"
  },
  // hockey: {
  //   width: "w-36",
  //   height: "h-46"
  // },
  // handball: {
  //   width: "w-26",
  //   height: "h-34"
  // }
}; 