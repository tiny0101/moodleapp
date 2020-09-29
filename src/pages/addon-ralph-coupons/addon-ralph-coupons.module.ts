import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddonRalphCouponsPage } from './addon-ralph-coupons';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddonRalphCouponsPage,
  ],
    imports: [
        IonicPageModule.forChild(AddonRalphCouponsPage),
        TranslateModule,
    ],
})
export class AddonRalphCouponsPageModule {}
