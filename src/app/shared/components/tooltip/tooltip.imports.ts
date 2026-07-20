import { OverlayModule } from '@angular/cdk/overlay';

import { ZardTooltipComponent, ZardTooltipDirective } from 'src/app/shared/components/tooltip/tooltip';

export const ZardTooltipImports = [ZardTooltipComponent, ZardTooltipDirective, OverlayModule] as const;
