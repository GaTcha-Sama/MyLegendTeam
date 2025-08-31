import { Player } from "./players";

export interface ActiveRetiredStaredSelectorProps {
    selectedActiveRetiredStared: number | null | "legendary";
    onSelectActiveRetiredStared: (activeRetiredStared: number | null | "legendary") => void;
    players: Player[];
    selectedSport: string;
}