import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperQualityComponent } from './super-quality.component';

describe('SuperQualityComponent', () => {
  let component: SuperQualityComponent;
  let fixture: ComponentFixture<SuperQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperQualityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
