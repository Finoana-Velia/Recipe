import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCustomerComponent } from './hero-customer.component';

describe('HeroCustomerComponent', () => {
  let component: HeroCustomerComponent;
  let fixture: ComponentFixture<HeroCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
