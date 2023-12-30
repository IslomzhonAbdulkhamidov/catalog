import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefaultphoneComponent } from './add-defaultphone.component';

describe('AddDefaultphoneComponent', () => {
  let component: AddDefaultphoneComponent;
  let fixture: ComponentFixture<AddDefaultphoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDefaultphoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDefaultphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
