export class Brand {
    _id: string;
    name: string;
    logo: string;
    websiteUrl: string; // Link to official website of a brand
    series: string[];
    createdDate: Date;
    updatedDate: Date;

    constructor() {
        this.createdDate = new Date();
        this.updatedDate = new Date();
    }
}
