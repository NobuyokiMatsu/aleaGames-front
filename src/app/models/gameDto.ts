export interface gameDto {
  idGame: number;
  name: string;
  lastTimePlayed: Date;
  playingTime: number;
  complexity: number;
  competitive: boolean;
  typeList: string[];
}
