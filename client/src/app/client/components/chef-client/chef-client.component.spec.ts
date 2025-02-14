import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefClientComponent } from './chef-client.component';

describe('ChefClientComponent', () => {
  let component: ChefClientComponent;
  let fixture: ComponentFixture<ChefClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
