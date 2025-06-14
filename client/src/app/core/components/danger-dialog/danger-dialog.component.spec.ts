import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerDialogComponent } from './danger-dialog.component';

describe('DangerDialogComponent', () => {
  let component: DangerDialogComponent;
  let fixture: ComponentFixture<DangerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DangerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
