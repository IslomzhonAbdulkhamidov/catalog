import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopRegisterComponent } from './shop-register.component';

describe('ShopRegisterComponent', () => {
  let component: ShopRegisterComponent;
  let fixture: ComponentFixture<ShopRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
