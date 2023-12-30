import { Shop } from './shop';
import { DefaulPhoneMemory, DefaulPhoneColor, DefaultPhone } from './default-phone';
export class Phone {
  _id: string;
  isActive: boolean;
  defaultPhoneId: any;
  sellerId: any;
  price: any;
  currency: string = 'сом';
  memory: DefaulPhoneMemory;
  color: DefaulPhoneColor[];
  phoneCollection?: PhoneCollection[];
  sim: string;
  phoneUrl: string;
  producedCountry: string;
  createdDate = new Date();
  updatedDate = new Date();
}

export class PhoneCollection {
  color: DefaulPhoneColor[];
  memory: DefaulPhoneMemory;
  price:number;
  country: string;
}
