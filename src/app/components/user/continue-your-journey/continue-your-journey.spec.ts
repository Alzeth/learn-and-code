import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';

import { ContinueYourJourney } from './continue-your-journey';

describe('ContinueYourJourney', () => {
  let component: ContinueYourJourney;
  let fixture: ComponentFixture<ContinueYourJourney>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinueYourJourney],
      providers: [
        { provide: TranslocoService, useValue: { translate: vi.fn((key: string) => key) } },
      ],
    })
      .overrideComponent(ContinueYourJourney, { set: { template: '', imports: [] } })
      .compileComponents();

    fixture = TestBed.createComponent(ContinueYourJourney);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
