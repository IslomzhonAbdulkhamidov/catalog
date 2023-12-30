import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { getData } from './utils/constants';
import { starsRenderer } from './renderers/stars';
import { progressBarRenderer } from './renderers/progressBar';
import {
  addClassesToRows,
  alignHeaders,
  changeCheckboxCell,
  drawCheckboxInRowHeaders,
} from './utils/hooks-callback';
import Handsontable from 'handsontable';
import { ShopService } from '../../../services/shop.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Shop } from '../../../models/shop';
import { ShopPhoneService } from '../../../services/shop-phone.service';
import { Router } from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-price-editor',
  templateUrl: './price-editor.component.html',
  styleUrls: ['./price-editor.component.scss'],
})
export class PriceEditorComponent implements OnInit {
  intFrameHeight = window.innerHeight - 10;
  intFrameWidth = window.innerWidth;
  dataset = getData();
  alignHeaders = alignHeaders;
  colums = [
    {
      data: 'id',
      readonly: true,
    },
    {
      data: 'brandName',
      readonly: true,
    },
    {
      data: 'phoneName',
      // readonly: true,
    },
    {
      data: 'phoneMemory',
      // readonly: true,
    },
    {
      data: 'phoneColor',
      // readonly: true,
    },
    {
      data: 'phonePrice',
      type: 'numeric',
      numericFormat: {
        pattern: '$0,0.00',
        culture: 'en-US', // this is the default culture, set up for USD
      },
      allowEmpty: false,
    },
    {
      data: 'phoneExist',
      type: 'checkbox',
    },
  ];
  currentUser = null;
  allModels = null;
  hot: any = null;
  shop: Shop;
  location: any;
  routerSubscription: any;
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
  constructor(
    private shopService: ShopService,
    private shopPhoneService: ShopPhoneService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.localStorageService.getShop();
    if (this.currentUser) {
      this.shopService
        .getAllPhoneModel(this.currentUser._id)
        .subscribe((res) => {
          this.allModels = res;
          const container = document.querySelector('#shop_price');
          this.hot = new Handsontable(container, {
            data: this.allModels,
            colHeaders: [
              'Бренд',
              'Модел',
              'Память',
              'Цвет',
              'Цена (KGS)',
              // 'Цена ($)',
              'Доступно',
            ],
            height: this.intFrameHeight,
            rowHeaders: true,
            rowHeaderWidth: 100,
            colWidths: [100, 200, 120, 150, 100, 100, 100],
            nestedRows: true,
            hiddenRows: true,
            //  hiddenColumns: {
            //    columns: [0]
            //  },
            licenseKey: 'non-commercial-and-evaluation',
            columns: [
              { data: 'brandName', readOnly: true },
              { data: 'phoneName', readOnly: true },
              { data: 'phoneMemory', readOnly: true },
              { data: 'phoneColor', readOnly: true },
              // {
              //   data: 'phonePriceSom',
              //   readOnly: false,
              //   type: 'numeric',
              //   allowEmpty: true,
              // },
              {
                data: 'phonePrice',
                readOnly: false,
                type: 'numeric',
                allowEmpty: true,
                numericFormat: {
                  pattern: '0,0.00',
                  culture: 'en-US', // this is the default culture, set up for USD
                },
              },
              {
                data: 'phoneExist',
                type: 'checkbox',
              },
            ],
            cells(row, col) {
              const cellProperties: any = {};
              const data = this.instance.getData();
              const a = data[col];
              // if (a[5] === null) {
              //   cellProperties.readOnly = true; // make cell read-only if it is first row or the text reads 'readOnly'
              //   cellProperties.class = 'something';
              // }

              if (col[5] === null) {
                cellProperties.renderer = this.firstRowRenderer; // uses function directly
              }
              return cellProperties;
            },
          });
          (this.hot.getPlugin('nestedRows') as any).collapsingUI.collapseAll();
        });
    }
    if (this.allModels) {
    }
  }

  starsRenderer = starsRenderer;

  firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.fontWeight = 'bold';
    td.style.color = 'green';
    td.style.background = '#CEC';
  }

  savePrice() {
    this.shop = this.localStorageService.getShop();
    let phoneCol = [];
    const phones = this.hot.getPlugin('nestedRows').dataManager.data;
    for (const brand of phones) {
      for (const model of brand.__children) {
        const phoneCollection = this.generatePhoneCollection(
          model,
          model.id,
          this.shop._id,
          model.phoneExist
        );
        if (
          phoneCollection._id !== null ||
          phoneCollection.phoneCollection.length
        ) {
          phoneCol = [...phoneCol, phoneCollection];
        }
      }
    }
    this.shopPhoneService.updatePriceExcel(phoneCol).subscribe(res => {
      this.router.navigateByUrl('/shop')
    })
  }

  generatePhoneCollection(phoneCollectionArray, defId, selId, active) {
    const phone = {
      _id: null,
      currency: 'сом',
      createdDate: new Date(),
      updatedDate: new Date(),
      phoneCollection: [],
      defaultPhoneId: defId,
      sellerId: selId,
      isActive: active,
      color: [],
    };
    let ans = [];

    for (const memory of phoneCollectionArray.__children) {
      for (const colorPrice of memory.__children) {
        if (colorPrice.id) {
          delete phone.createdDate;
          phone._id = colorPrice.id;
        }
        let col = {
          memory: { ramStorage: null, memoryStorage: null },
          color: [],
          price: null,
        };
        col.memory.memoryStorage = Number(memory.phoneMemory.substr(0, 2));
        col.memory.ramStorage = Number(
          memory.phoneMemory.slice(-4).substr(0, 2)
        );
        if (colorPrice.phonePrice !== 0) {
          const index = ans.findIndex(
            (el) => el.price === colorPrice.phonePrice
          );
          if (index === -1) {
            col.color = [...col.color, this.findColor(colorPrice.phoneColor)];
            col.price = colorPrice.phonePrice;
            ans = [...ans, col];
          } else {
            ans[index].color = [
              ...ans[index].color,
              this.findColor(colorPrice.phoneColor),
            ];
          }
        }
      }
    }
    phone.phoneCollection = ans;

    return phone;
  }

  findColor(str) {
    return this.dfcolors.find((el) => el.name === str);
  }
}
