import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporterregApprovalComponent } from './reporterreg-approval.component';

describe('ReporterregApprovalComponent', () => {
  let component: ReporterregApprovalComponent;
  let fixture: ComponentFixture<ReporterregApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporterregApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporterregApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
