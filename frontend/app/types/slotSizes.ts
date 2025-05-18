import { Sport } from "./sports";

export interface SlotSize {
  width: string;
  height: string;
}

export const slotSizes: Record<Sport, SlotSize> = {
  basketball: {
    width: "w-36",  // Plus large pour le basket
    height: "h-46"  // Plus haut pour le basket
  },
  rugby: {
    width: "w-26",
    height: "h-34"
  },
  football: {
    width: "w-26",
    height: "h-34"
  },
  hockey: {
    width: "w-26",
    height: "h-34"
  },
  handball: {
    width: "w-26",
    height: "h-34"
  }
}; 