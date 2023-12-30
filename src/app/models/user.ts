export class User {
  uid: string;
  fullName: string;
  email: string;
  contact?: string;
  activated = false;
  createdAt: Date;
  updatedAt: Date;
  role = 'admin';

  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
