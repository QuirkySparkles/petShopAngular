import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetInstanceComponent } from './pet-instance.component';

describe('PetInstanceComponent', () => {
  let component: PetInstanceComponent;
  let fixture: ComponentFixture<PetInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
