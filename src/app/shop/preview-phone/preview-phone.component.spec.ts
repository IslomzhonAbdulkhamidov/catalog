import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPhoneComponent } from './preview-phone.component';

describe('PreviewPhoneComponent', () => {
  let component: PreviewPhoneComponent;
  let fixture: ComponentFixture<PreviewPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
