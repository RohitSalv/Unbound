import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialProof } from './social-proof';

describe('SocialProof', () => {
  let component: SocialProof;
  let fixture: ComponentFixture<SocialProof>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialProof]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialProof);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
