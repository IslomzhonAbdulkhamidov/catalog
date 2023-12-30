import { Banner1Service } from './../../services/banner1.service';
import { Banner } from './../../models/banner';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  banner = new Banner();
  banners: Banner[] = [];
  openEditModal = false;
  deleteBannerConfirmedId: string;
  constructor(
    private sliderService: Banner1Service,
    private storage: AngularFireStorage,
  ) {
  }

  ngOnInit(): void {
      this.sliderService.getAll().subscribe(res => {
        this.banners = res
      })
  }

  openModal() {
    this.openEditModal = !this.openEditModal;
  }

  createNewBanner() {
    this.sliderService.createBanner(this.banner).then(uploadedbanner => {
      this.banners.push(this.banner)
      this.banner = new Banner();
    });
  }

  uploadFile($event: any, imgPath: string) {
    const file = $event.target.files[0] as File;
    const randomId = Math.random().toString(36).substring(2);
    const filePath = `banners/${randomId}_${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(async () => {
        const url = await ref.getDownloadURL().toPromise();
        if (imgPath === 'questionImgUrl') {
          this.banner.bannerUrl = url;
        }
      })
    )
      .subscribe();
  }
  get isbuttonActive() {
    return this.banner.isButtonActive;
  }

  resetImgUrl() {
    this.banner.bannerUrl = '';
  }

  updateBanner() {
    this.sliderService.updateBanner(this.banner._id, this.banner).then(() => {
      this.banner = new Banner()
    });
  }

  updateConfirmed($event: Banner) {
    this.openEditModal = true;
    this.banner = $event;
  }

  deleteBanner($event: Banner) {
   this.deleteBannerConfirmedId = $event._id;
  }

  deleteConfirm() {
    this.sliderService.deleteBanner(this.deleteBannerConfirmedId).then(() => {
      this.banners = this.banners.filter(b => b._id !== this.deleteBannerConfirmedId);
    });
  }
}
