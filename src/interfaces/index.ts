export interface Idata {
  id: string;
  name: string;
  price: number;
  parcelamento: [number, number];
  color: string;
  image: string;
  size: [string];
  date: string;
}

export interface IsortList {
  id: number;
  name: string;
}

export interface IcolorList {
  id: number;
  color: string;
}