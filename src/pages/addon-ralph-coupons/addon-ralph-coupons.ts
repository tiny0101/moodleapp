import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { CoreCoursesProvider } from '@core/courses/providers/courses';
import { CoreDomUtilsProvider } from '@providers/utils/dom';

/**
 * Generated class for the AddonRalphCouponsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addon-ralph-coupons',
  templateUrl: 'addon-ralph-coupons.html',
})
export class AddonRalphCouponsPage  implements OnInit, OnDestroy  {

  couponDraw = true;
  selectedIndices = [];
  couponItems = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              protected translate: TranslateService,
              private coursesProvider: CoreCoursesProvider,
              private domUtils: CoreDomUtilsProvider) {

  }

  ngOnInit(): void {
    this.getUserCoupons().finally(() => {
      this.couponDraw = true;
    });
  }

  protected getUserCoupons(): any {
    return this.coursesProvider.getUserCoupons().then((coupons) => {
      this.couponItems = coupons;
    }).catch((error) => {
      this.domUtils.showErrorModalDefault(error, 'core.courses.errorloadcoupons', true);
    });
  }

  ngOnDestroy(): void {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddonRalphCouponsPage');
  }

  onRedeemCouponsClicked(): void {

    if (this.selectedIndices.length > 0) {
      // tslint:disable-next-line:max-line-length
      let confirmMessage = this.translate.instant('mm.ralph.coupons.redeemcouponconfirmation', {coupon: this.selectedIndices.length});
      if (this.selectedIndices.length == 1) {
        confirmMessage = confirmMessage.replace('coupons', 'coupon');
      }

      if (confirm(confirmMessage)) {
        const selectedCouponIds = [];
        for (let i = 0; i < this.selectedIndices.length; i ++) {
          selectedCouponIds.push(this.couponItems[this.selectedIndices[i]].id);
        }
        this.redeemCoupons(selectedCouponIds.join());
      }
    }
  }

  redeemCoupons(couponIds): any {
    return this.coursesProvider.redeemCoupons(couponIds).then((result) => {
      if (result.result == 1) {
        this.selectedIndices = [];

        this.couponDraw = false;
        this.coursesProvider.getUserCoupons().then((coupons) => {
          this.couponItems = coupons;
          this.couponDraw = true;
        });
      }
    }).catch((error) => {
      this.domUtils.showErrorModalDefault(error, 'core.courses.errorredeemcoupons', true);
    });
  }

  updateUserCoupons(): any {

    // return updateUserCoupons().then(function(result) {
    //   return result;
    // });
  }

  onSelectCoupon(idx): void {
    if (this.selectedIndices.includes(idx)) {
      const index = this.selectedIndices.indexOf(idx);
      this.selectedIndices.splice(index, 1);
    } else {
      this.selectedIndices.splice(0, 0, idx);

    }
  }
}
