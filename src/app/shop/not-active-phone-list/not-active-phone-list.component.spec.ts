import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotActivePhoneListComponent } from './not-active-phone-list.component';

describe('NotActivePhoneListComponent', () => {
  let component: NotActivePhoneListComponent;
  let fixture: ComponentFixture<NotActivePhoneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotActivePhoneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotActivePhoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
