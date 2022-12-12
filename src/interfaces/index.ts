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
  id: string;
  name: string;
}

export interface IpriceList {
  id: string;
  price: string;
}