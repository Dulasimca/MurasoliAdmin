import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporterRegistrationComponent } from './reporter-registration.component';

describe('ReporterRegistrationComponent', () => {
  let component: ReporterRegistrationComponent;
  let fixture: ComponentFixture<ReporterRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporterRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporterRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
