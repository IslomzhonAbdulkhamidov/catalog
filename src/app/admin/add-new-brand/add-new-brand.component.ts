import { Brand } from './../../models/brand';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-add-new-brand',
  templateUrl: './add-new-brand.component.html',
  styleUrls: ['./add-new-brand.component.scss']
})
export class AddNewBrandComponent implements OnInit {
  brand = new Brand();
  brands: Brand[] = [];
  openEditModal = false;
  delBrand: Brand;
  seria = '';
  constructor(private bannerService: BrandService,
    private storage: AngularFireStorage,
  ) {
  }

  ngOnInit(): void {
    this.bannerService.getDefaultBrands()
      .subscribe((res) => {
        this.brands = res;
      });
  }

  openModal() {
    this.openEditModal = !this.openEditModal;
  }

  createNewBrand() {
    // console.log(this.brand);
    this.bannerService.create(this.brand).then(uploadedbrand => {
      this.brands.push(uploadedbrand);
    });
  }

  uploadFile($event: any, imgPath: string) {
    const file = $event.target.files[0] as File;
    // console.log(file);
    const randomId = Math.random().toString(36).substring(2);
    const filePath = `banners/${randomId}_${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    // console.log(task);
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(async () => {
        const url = await ref.getDownloadURL().toPromise();
        // console.log('Added to storage and we get image url ', url);
        if (imgPath === 'questionImgUrl') {
          this.brand.logo = url;
        }
      })
    )
      .subscribe();
  }

  addSeries() {
    if (!this.brand.series || this.brand.series.length <= 0) {
      this.brand.series = [];
      if (this.seria.length > 0) {
        this.brand.series.push(this.seria);
      }
    } else {
      if (this.seria.length > 0) {
        this.brand.series.push(this.seria);
      }
    }
    this.seria = '';
  }

  deleteFromSeries(array, element){
    const index = array.indexOf(element);
    array.splice(index, 1);
    this.seria = element;
  }
  resetImgUrl() {
    this.brand.logo = '';
  }

  updateBrand() {
    this.bannerService.update(this.brand).then(() => {
      // console.log(this.brand)
      // console.log('Updated');
    });
  }

  updateConfirmed($event: Brand) {
    this.openEditModal = true;
    this.brand = $event;
  }

  delete($event: Brand) {
    this.delBrand = $event;
  }

  deleteConfirm() {
    this.bannerService.delete(this.delBrand._id).then(() => {
      this.brands = this.brands.filter(brand => brand._id !== this.delBrand._id);
    });
  }

  get isCompleted() {
    if (this.brand.name?.length > 0 && this.brand.logo?.length > 0) {
      return true;
    } else { return false; }
  }

  cancel(){
    this.brand = new Brand();
    // console.log(this.brand)
  }
}
