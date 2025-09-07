import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPreview } from './content-preview';

describe('ContentPreview', () => {
  let component: ContentPreview;
  let fixture: ComponentFixture<ContentPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
