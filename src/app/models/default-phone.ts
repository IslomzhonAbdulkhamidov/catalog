import { Brand } from './brand';
export class DefaultPhone {
  _id: string;
  brandId: any;
  series: string;
  model: string;
  images: string[];
  memories: DefaulPhoneMemory[];
  colors: DefaulPhoneColor[];
  sims: string[];
  producedCountry: string[];
  producedDate: number;
  operatingSystem: string;
  description: string;
  characteristics: string;
  defaultCreatedDate = new Date();
  defaultUpdatedDate = new Date();
  pageViewCounter: number;

  // new 
  price?: any;
  brandName?: string;
  screen?: string;
  cpu?: string;
  camera?: string;
  video?: string;
  batary?: string;
  weight?: string
}


export class DefaulPhoneMemory {
  ramStorage: number;
  memoryStorage: number;
  isExists?: boolean;
}

export class DefaulPhoneColor {
  hex: string; // #ff0000
  name: string; // red
  isExists?: boolean;
}


