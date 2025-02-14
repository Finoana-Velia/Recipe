import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationClientComponent } from './navigation-client.component';

describe('NavigationClientComponent', () => {
  let component: NavigationClientComponent;
  let fixture: ComponentFixture<NavigationClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
