export class Shop {
  // tslint:disable-next-line:variable-name
  _id: string;
  firebaseId:string;
  name: string;
  email: string;
  activated = false;
  logo: string;
  contact: string;
  address: string;
  websiteUrl: string;
  littleInfo: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
