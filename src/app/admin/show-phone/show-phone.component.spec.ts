import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPhoneComponent } from './show-phone.component';

describe('ShowPhoneComponent', () => {
  let component: ShowPhoneComponent;
  let fixture: ComponentFixture<ShowPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
