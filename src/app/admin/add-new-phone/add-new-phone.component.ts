import { DefaultPhoneService } from './../../services/default-phone.service';
import { Brand } from './../../models/brand';
import { DefaulPhoneMemory, DefaultPhone } from './../../models/default-phone';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { BrandService } from './../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-add-new-phone',
  templateUrl: './add-new-phone.component.html',
  styleUrls: ['./add-new-phone.component.scss'],
})
export class AddNewPhoneComponent implements OnInit {
  dfcolors = [
    {
      hex: '#000000',
      name: 'Black - Черный',
    },
    {
      hex: '#ffffff',
      name: 'White - Белый',
    },
    {
      hex: '#0000ee',
      name: 'Blue - Синий',
    },
    {
      hex: '#ee0000',
      name: 'Red - Красный',
    },
    {
      hex: '#00ee00',
      name: 'Green - Зеленый',
    },
    {
      hex: '#eec900',
      name: 'Gold - Золотой',
    },
    {
      hex: '#c0c0c0',
      name: 'Silver - Серебряный',
    },
    {
      hex: '#ffb5c5',
      name: 'Pink - Розовый',
    },
    {
      hex: '#a020f0',
      name: 'Purple - Пурпурный',
    },
    {
      hex: '#ffff00',
      name: 'Yellow - Желтый',
    },
    {
      hex: '#ff7f50',
      name: 'Coral - Коралловый',
    },
  ];
  brands: Brand[] = [];
  defaultPhone = new DefaultPhone();
  isEditConfirmed = false;
  selectedBrand: any;
  showSpinner = false;
  brandSeries = [];
  //  new

  country = '';
  sim = '';
  memory = new DefaulPhoneMemory();
  constructor(
    private storage: AngularFireStorage,
    private brandService: BrandService,
    private defaultPhoneService: DefaultPhoneService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.brandService.getDefaultBrands().subscribe((res) => {
      this.brands = res;
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id && id.length > 0) {
        this.getSinglePhone(id);
        this.isEditConfirmed = true;
      }
    });

    this.alljQueryScripts();
  }

  alljQueryScripts() {
    $(document).ready(function () {
      $('.pdetails-largeimages').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        asNavFor: '.pdetails-thumbs',
      });

      $('.pdetails-thumbs:not(.pdetails-thumbs-vertical)').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.pdetails-largeimages',
        arrows: false,
        dots: false,
        focusOnSelect: true,
        vertical: false,
      });

      $('.pdetails-thumbs-vertical').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.pdetails-largeimages',
        arrows: false,
        dots: false,
        focusOnSelect: true,
        centerMode: true,
        vertical: true,
        responsive: [
          {
            breakpoint: 576,
            settings: {
              vertical: false,
            },
          },
        ],
      });
    });
  }


  newbrand(brId: string) {
    this.defaultPhone.brandId = brId;
    // console.log(this.defaultPhone);
    this.selectedBrand = this.brands.filter((br) => br._id === brId);
    this.selectedBrand = this.selectedBrand[0];
    this.defaultPhone.brandName = this.selectedBrand.name;
    (document.getElementById('two') as any).disabled = false;
    this.brandSeries = this.selectedBrand.series;
  }


  //
  uploadFile($event: any, imgPath: string) {
    const file = $event.target.files[0] as File;
    // console.log(file);
    const randomId = Math.random().toString(36).substring(2);
    const filePath = `phoneImages/${randomId}_${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(async () => {
          const url = await ref.getDownloadURL().toPromise();
          if (!this.defaultPhone.images) {
            this.defaultPhone.images = [];
            this.defaultPhone.images.push(url);
          } else {
            this.defaultPhone.images.push(url);
          }
        })
      )
      .subscribe();
  }

  delete(url) {
    this.defaultPhone.images = this.defaultPhone.images.filter(
      (imageurl) => imageurl !== url
    );
  }

  addCounty() {
    if (!this.defaultPhone.producedCountry) {
      this.defaultPhone.producedCountry = [];
      this.defaultPhone.producedCountry.push(this.country);
    } else {
      this.defaultPhone.producedCountry.push(this.country);
    }
    this.country = '';
  }

  deleteCountry(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
    this.country = element;
  }

  addSim() {
    if (!this.defaultPhone.sims) {
      this.defaultPhone.sims = [];
      this.defaultPhone.sims.push(this.sim);
    } else {
      this.defaultPhone.sims.push(this.sim);
    }
    this.sim = '';
  }

  deleteSim(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
    this.sim = element;
  }

  deletecolor(element) {
    const index = this.defaultPhone.colors.indexOf(element);
    this.defaultPhone.colors.splice(index, 1);
  }

  isIn(e, color: any) {
    const classList = e.target.classList;
    const classes = e.target.className;
    classes.includes('circle')
      ? classList.remove('circle')
      : classList.add('circle');
    if (!this.defaultPhone.colors || this.defaultPhone.colors.length === 0) {
      this.defaultPhone.colors = [];
      this.defaultPhone.colors.push(color);
    }
    if (!this.defaultPhone.colors.some((cl) => cl.hex === color.hex)) {
      this.defaultPhone.colors.push(color);
    }
  }

  addMemory(){
    if(!this.defaultPhone.memories) {
      this.defaultPhone.memories = [];
      this.defaultPhone.memories.push(this.memory);
    } else {
      this.defaultPhone.memories.push(this.memory)
    }
    this.memory = new DefaulPhoneMemory()
  }

  deleteMemory (element) {
    const index = this.defaultPhone.memories.indexOf(element);
    this.defaultPhone.memories.splice(index,1)
    this.memory = element
  }

  createNewDefaultPhone() {
    this.showSpinner = true;
    this.defaultPhoneService.create(this.defaultPhone).then((res) => {
      this.router.navigateByUrl('/admin/route/show-all-phone');
      this.showSpinner = false;
    });
    // console.log(this.defaultPhone)
  }

  updateDefaultPhone() {
    this.defaultPhoneService.update(this.defaultPhone, this.defaultPhone._id).then((res: DefaultPhone) => {
      this.router.navigateByUrl('/admin/route/show-all-phone');
    })
  }

  getSinglePhone(id: string) {
    this.defaultPhoneService.getSingle(id).subscribe((res: DefaultPhone) => {
      this.defaultPhone = res;
    });
  }

}
