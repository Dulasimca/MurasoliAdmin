import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyNewspaperUploadComponent } from './daily-newspaper-upload.component';

describe('DailyNewspaperUploadComponent', () => {
  let component: DailyNewspaperUploadComponent;
  let fixture: ComponentFixture<DailyNewspaperUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyNewspaperUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyNewspaperUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
