import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsDashboardComponent } from './locations-dashboard.component';

describe('LocationsDashboardComponent', () => {
  let component: LocationsDashboardComponent;
  let fixture: ComponentFixture<LocationsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
