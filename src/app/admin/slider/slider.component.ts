import { Slider } from './../../models/slider';
import { BannerService } from './../../services/banner.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  banner = new Slider();
  banners: Slider[] = [];
  openEditModal = false;
  deletedSlideId: string;
  constructor(private bannerService: BannerService,
    private storage: AngularFireStorage,
  ) {
  }

  ngOnInit(): void {
    this.bannerService.getData()
      .subscribe((banners) => {
        this.banners = banners;
      });
  }

  openModal() {
    this.openEditModal = !this.openEditModal;
  }
  createNewBanner() {
    this.bannerService.create(this.banner).then(uploadedbanner => {
      this.banners.push(this.banner)
    });
  }

  uploadFile($event: any, imgPath: string) {
    const file = $event.target.files[0] as File;
    console.log(file);
    const randomId = Math.random().toString(36).substring(2);
    const filePath = `banners/${randomId}_${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(async () => {
        const url = await ref.getDownloadURL().toPromise();
        // console.log('Added to storage and we get image url ', url);
        if (imgPath === 'questionImgUrl') {
          this.banner.image = url;
        }
      })
    )
      .subscribe();
  }
  get isbuttonActive() {
    return this.banner.isButtonActive;
  }
  resetImgUrl() {
    this.banner.image = '';
  }

  updateBanner() {
    // console.log('uid: ', this.banner.uid, 'banner: ', this.banner);
    this.bannerService.update(this.banner.uid, this.banner).then(() => {
      // console.log('Updated');
    });
  }

  updateConfirmed($event: Slider) {
    this.openEditModal = true;
    this.banner = $event;
  }

  deleteBanner($event: Slider) {
    this.deletedSlideId = $event.uid;
  }


  deleteConfirm() {
    this.bannerService.deleteById(this.deletedSlideId).then(() => {
      this.banners = this.banners.filter(b => b.uid !== this.deletedSlideId);
    });
  }

}
