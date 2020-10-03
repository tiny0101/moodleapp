import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddonRalphHomePage } from './addon-ralph-home';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddonRalphHomePage,
  ],
    imports: [
        IonicPageModule.forChild(AddonRalphHomePage),
        TranslateModule,
    ],
})
export class AddonRalphHomePageModule {}
