import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetentryComponent } from './timesheetentry.component';

describe('TimesheetentryComponent', () => {
  let component: TimesheetentryComponent;
  let fixture: ComponentFixture<TimesheetentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesheetentryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimesheetentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
