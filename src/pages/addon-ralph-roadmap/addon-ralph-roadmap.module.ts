import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddonRalphRoadmapPage } from './addon-ralph-roadmap';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddonRalphRoadmapPage,
  ],
    imports: [
        IonicPageModule.forChild(AddonRalphRoadmapPage),
        TranslateModule,
    ],
})
export class AddonRalphRoadmapPageModule {}
