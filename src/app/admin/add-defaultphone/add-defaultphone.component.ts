import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { DefaultPhone } from 'src/app/models/default-phone';
import { BrandService } from 'src/app/services/brand.service';
import { DefaultPhoneService } from 'src/app/services/default-phone.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-defaultphone',
  templateUrl: './add-defaultphone.component.html',
  styleUrls: ['./add-defaultphone.component.scss']
})
export class AddDefaultphoneComponent implements OnInit {
  dfcolors = [
    {
      hex: '#000000',
      name: 'Черный'
    },
    {
      hex: '#ffffff',
      name: 'Белый'
    },
    {
      hex: '#0000ee',
      name: 'Синий'
    },
    {
      hex: '#ee0000',
      name: 'Красный'
    },
    {
      hex: '#00ee00',
      name: 'Зеленый'
    },
    {
      hex: '#eec900',
      name: 'Золотой'
    },
    {
      hex: '#c0c0c0',
      name: 'Серебряный'
    },
    {
      hex: '#ffb5c5',
      name: 'Розовый'
    },
    {
      hex: '#a020f0',
      name: 'Пурпурный'
    },
    {
      hex: '#ffff00',
      name: 'Желтый'
    },
    {
      hex: '#ff7f50',
      name: 'Коралловый'
    }
  ];
  defaultPhone: DefaultPhone;
  brands: Brand[] = [];
  isEditConfirmed = false;
  selectedBrand: any;
  brandSeries = [];
   ////

  country = '';
  sim = ''; 
  constructor(
    private storage: AngularFireStorage,
    private brandService: BrandService,
    private defaultPhoneService: DefaultPhoneService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.brandService.getDefaultBrands()
    .subscribe((res) => {
      this.brands = res;
    });
  }
  newbrand(brId: string) {
    this.selectedBrand = this.brands.filter(br => br._id === brId);
    this.selectedBrand = this.selectedBrand[0];
    (document.getElementById('two') as any).disabled = false;
    this.brandSeries = this.selectedBrand.series;
  }

  addCounty() {
    this.defaultPhone.producedCountry.push(this.country);
    this.country = ''
    
  }

  deleteCountry(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
    this.country = element;
  }

  addSim() {
    this.defaultPhone.producedCountry.push(this.country);
    this.sim = ''
    
  }

  deleteSim(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
    this.sim = element;
  }

  uploadFile($event: any) {
    const file = $event.target.files[0] as File;
    // console.log(file);
    const randomId = Math.random().toString(36).substring(2);
    const filePath = `phoneImages/${randomId}_${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    task.snapshotChanges().pipe(
      finalize(async () => {
        const url = await ref.getDownloadURL().toPromise();
        this.defaultPhone.images.push(url);
      })
    )
      .subscribe();
  }

  updateDefaultPhone(){
    console.log('updating')
  }

  createNewDefaultPhone(){
    console.log('creating new defPhone', this.defaultPhone)
  }

}
