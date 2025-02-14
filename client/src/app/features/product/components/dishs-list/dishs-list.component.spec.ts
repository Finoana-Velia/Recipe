import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishsListComponent } from './dishs-list.component';

describe('DishsListComponent', () => {
  let component: DishsListComponent;
  let fixture: ComponentFixture<DishsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
