import { Router } from '@angular/router';
import { BrandService } from './../../services/brand.service';
import { DefaultPhoneService } from './../../services/default-phone.service';
import { DefaultPhone } from './../../models/default-phone';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
declare var require: any

interface SearchResult {
  name: string;
  _id: string;
  type: 'phone' | 'brand' | 'shop';
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  myfilterArray: any[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allDefaultPhones: DefaultPhone[];
  searchResultList: SearchResult[];
  translit = require('cyrillic-to-latin')

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;

  // @Output() onSelectedOption = new EventEmitter();
  text = '';

  phonelink = []
  constructor(
    public dfPhoneService: DefaultPhoneService,
    public brandService: BrandService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.dfPhoneService.getSearchValue().subscribe(res => { 
      this.myfilterArray = res
    })
    
  }

  // this is where filtering the data happens according to you typed value
  filterCategoryList( searchValue: string): SearchResult[] {
    searchValue = this.translit(searchValue)
    if (searchValue === '' || searchValue === null) {
      return [];
    }
    const seenBrandId = new Map();
    const result: SearchResult[] = [];
    this.myfilterArray.forEach(dphone => {
      if (dphone.name.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1
        && seenBrandId.has(dphone.name.toLowerCase()) === false) {
        seenBrandId.set(dphone.name.toLowerCase(), true);
        result.push(dphone as SearchResult);
      }
    });
    return result;
  }

  // after you clicked an autosuggest option, this function will show the field you want to show in input
  displayFn(result: SearchResult) {
    if (result?.type === 'brand') {
      return ''
    } else {
      return ''
    }
  }

  findLink(phone: any): any{ 
    console.log(phone._id)
    let ans
    this.myfilterArray.forEach(el => {
      // console.log (phone._id, el._id)
      if(phone._id === el._id) {
        // console.log('sss')
        ans =el
      }
    })
    return ans
  }

  findAndRoute(event) {
    const phone = event.source.value;
    if (!phone) {
      // route and show empty 'По вашему поиску ничего не найдена"
    }
    else {
      if (phone?.type === 'brand') {
        const url = phone.name.toLowerCase()
        this.router.navigateByUrl(`/brand/${url}`);
      } else if (phone?.type === 'phone') {
        let el = this.findLink(phone)
        const series = el.series.replace(/\s+/g, '-');
        const model = el.model.replace(/\s+/g, '-');
        // console.log(el.brand+'_'+ series+ '_'+ model )
        this.router.navigate([`/phone-detail/${(el.brand+'_'+ series+ '_'+ model).toLocaleLowerCase()}`]).then(() => {window.location.reload();});
      } else {
        this.router.navigateByUrl(`/shop-page/${phone._id}`);
      }
    }
    this.focusOnPlaceInput();
  }

  onSearchChange() {
   // when user types something in input, the value changes will come through this
   this.myControl.valueChanges.subscribe(userInput => {
    this.searchResultList = this.filterCategoryList(userInput);
    this.text = userInput;
  });
  }

  focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = ''; 
  }

  onSearch(text) {
    text = this.translit(text)
    this.router.navigate([`/search/`], {queryParams: {value: text}});

  }

}
