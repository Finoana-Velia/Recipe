import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroPopularComponent } from './hero-popular.component';

describe('HeroPopularComponent', () => {
  let component: HeroPopularComponent;
  let fixture: ComponentFixture<HeroPopularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroPopularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
