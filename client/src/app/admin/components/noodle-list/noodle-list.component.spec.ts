import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoodleListComponent } from './noodle-list.component';

describe('NoodleListComponent', () => {
  let component: NoodleListComponent;
  let fixture: ComponentFixture<NoodleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoodleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoodleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
