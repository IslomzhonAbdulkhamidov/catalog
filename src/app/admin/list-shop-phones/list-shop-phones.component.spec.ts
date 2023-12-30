import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShopPhonesComponent } from './list-shop-phones.component';

describe('ListShopPhonesComponent', () => {
  let component: ListShopPhonesComponent;
  let fixture: ComponentFixture<ListShopPhonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListShopPhonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListShopPhonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
