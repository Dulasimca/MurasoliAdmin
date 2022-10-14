import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNewsEntryComponent } from './main-news-entry.component';

describe('MainNewsEntryComponent', () => {
  let component: MainNewsEntryComponent;
  let fixture: ComponentFixture<MainNewsEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNewsEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainNewsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
