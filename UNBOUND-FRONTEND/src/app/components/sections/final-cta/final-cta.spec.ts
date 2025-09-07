import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalCta } from './final-cta';

describe('FinalCta', () => {
  let component: FinalCta;
  let fixture: ComponentFixture<FinalCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalCta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalCta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
