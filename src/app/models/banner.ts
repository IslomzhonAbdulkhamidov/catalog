export class Banner {
    _id?: string;
    uid?: string;
    isActive: boolean;
    isMain: boolean = false;
    isSingle: boolean = false;
    bannerUrl: string;
    isButtonActive: boolean;
    buttonUrl: string;
    newTab: boolean;
    createdDate = new Date();
    updatedDate = new Date();
}
