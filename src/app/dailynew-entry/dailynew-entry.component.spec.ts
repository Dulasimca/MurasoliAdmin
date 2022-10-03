import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailynewEntryComponent } from './dailynew-entry.component';

describe('DailynewEntryComponent', () => {
  let component: DailynewEntryComponent;
  let fixture: ComponentFixture<DailynewEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailynewEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailynewEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
