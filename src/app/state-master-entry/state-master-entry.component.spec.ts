import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateMasterEntryComponent } from './state-master-entry.component';

describe('StateMasterEntryComponent', () => {
  let component: StateMasterEntryComponent;
  let fixture: ComponentFixture<StateMasterEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateMasterEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateMasterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
