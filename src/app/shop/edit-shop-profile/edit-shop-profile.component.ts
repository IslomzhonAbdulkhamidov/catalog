import {AngularFireStorage} from '@angular/fire/storage';
import {Shop} from '../../models/shop';
import {ShopService} from '../../services/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-edit-shop-profile',
  templateUrl: './edit-shop-profile.component.html',
  styleUrls: ['./edit-shop-profile.component.scss']
})
export class EditShopProfileComponent implements OnInit {
  id = '';
  shop: Shop;

  constructor(private route: ActivatedRoute,
              private shopService: ShopService,
              private storage: AngularFireStorage,
              private localStorageService: LocalStorageService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.shop = this.localStorageService.getShop();
  }

  updateShopInfo() {
    this.shopService.update(this.shop).then(() => {
      this.localStorageService.saveShop(this.shop)
      this.router.navigateByUrl('/shop');
    });
  }

  uploadFile($event: any, imgPath: string) {
    const file = $event.target.files[0] as File;
    const randomId = Math.random().toString(36).substring(2);
    const filePath = `shopLogo/${randomId}_${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(async () => {
        const url = await ref.getDownloadURL().toPromise();
        // console.log('Added to storage and we get image url ', url);
        if (imgPath === 'shopLogo') {
          this.shop.logo = url;
        }
      })
    )
      .subscribe();
  }

}
