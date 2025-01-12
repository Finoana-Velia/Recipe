import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSubscribeComponent } from './hero-subscribe.component';

describe('HeroSubscribeComponent', () => {
  let component: HeroSubscribeComponent;
  let fixture: ComponentFixture<HeroSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSubscribeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
