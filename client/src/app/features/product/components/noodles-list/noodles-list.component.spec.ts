import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoodlesListComponent } from './noodles-list.component';

describe('NoodlesListComponent', () => {
  let component: NoodlesListComponent;
  let fixture: ComponentFixture<NoodlesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoodlesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoodlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
