import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllDefaultPhoneComponent } from './show-all-default-phone.component';

describe('ShowAllDefaultPhoneComponent', () => {
  let component: ShowAllDefaultPhoneComponent;
  let fixture: ComponentFixture<ShowAllDefaultPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllDefaultPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllDefaultPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
