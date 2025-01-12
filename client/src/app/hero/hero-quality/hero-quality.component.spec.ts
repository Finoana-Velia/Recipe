import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroQualityComponent } from './hero-quality.component';

describe('HeroQualityComponent', () => {
  let component: HeroQualityComponent;
  let fixture: ComponentFixture<HeroQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroQualityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
