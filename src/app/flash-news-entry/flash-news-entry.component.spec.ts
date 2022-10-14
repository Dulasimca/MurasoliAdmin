import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashNewsEntryComponent } from './flash-news-entry.component';

describe('FlashNewsEntryComponent', () => {
  let component: FlashNewsEntryComponent;
  let fixture: ComponentFixture<FlashNewsEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashNewsEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashNewsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
