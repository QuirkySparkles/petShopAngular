import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetShopViewComponent } from './pet-shop-view.component';

describe('PetShopViewComponent', () => {
  let component: PetShopViewComponent;
  let fixture: ComponentFixture<PetShopViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetShopViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetShopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
