import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueYourJourney } from './continue-your-journey';

describe('ContinueYourJourney', () => {
  let component: ContinueYourJourney;
  let fixture: ComponentFixture<ContinueYourJourney>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinueYourJourney],
    }).compileComponents();

    fixture = TestBed.createComponent(ContinueYourJourney);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
