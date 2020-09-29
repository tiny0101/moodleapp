import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

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
export class AddonRalphCouponsPage {

  couponDraw = true;
  selectedIndices = [];
  couponItems = [{id: 25, user_id: '2', coupon_type: '0', course_id: '1583051759', removed: '0'},
    {id: 36, user_id: '2', coupon_type: '0', course_id: '1583761522', removed: '0'},
    {id: 37, user_id: '2', coupon_type: '0', course_id: '1584492246', removed: '0'},
    {id: 39, user_id: '2', coupon_type: '0', course_id: '1584848105', removed: '0'},
    {id: 40, user_id: '2', coupon_type: '0', course_id: '1586553910', removed: '0'},
    {id: 41, user_id: '2', coupon_type: '0', course_id: '1587131636', removed: '0'},
    {id: 43, user_id: '2', coupon_type: '0', course_id: '1591154070', removed: '0'},
    {id: 46, user_id: '2', coupon_type: '0', course_id: '1595324628', removed: '0'},
    {id: 48, user_id: '2', coupon_type: '0', course_id: '1596126458', removed: '0'},
    {id: 49, user_id: '2', coupon_type: '0', course_id: '1596450100', removed: '0'},
    {id: 50, user_id: '2', coupon_type: '0', course_id: '1596576294', removed: '0'},
    {id: 51, user_id: '2', coupon_type: '0', course_id: '1596836788', removed: '0'},
    {id: 52, user_id: '2', coupon_type: '0', course_id: '1599755550', removed: '0'},
    {id: 53, user_id: '2', coupon_type: '0', course_id: '1599969348', removed: '0'},
    {id: 54, user_id: '2', coupon_type: '0', course_id: '1601027976', removed: '0'},
    {id: 55, user_id: '2', coupon_type: '0', course_id: '1601151589', removed: '0'},
    {id: 56, user_id: '2', coupon_type: '0', course_id: '1601357839', removed: '0'}];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              protected translate: TranslateService) {

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
        let selectedCouponIds = [];
        for (i = 0; i < this.selectedIndices.length; i ++) {
          selectedCouponIds.push(this.couponItems[this.selectedIndices[i]].id);
        }
        this.redeemCoupons(selectedCouponIds.join());
      }
    }
  }

  getUserCoupons(): void {


    // if (typeof preferCache == 'undefined') {
    //   preferCache = false;
    // }
    // return $mmSitesManager.getSite(siteid).then(function(site) {
    //   var userid = site.getUserId(),
    //       presets = {
    //         omitExpires: preferCache,
    //         getFromCache : 0
    //       },
    //       data = {userid: userid};
    //   if (typeof userid === 'undefined') {
    //     return $q.reject();
    //   }
    //   return site.read('local_ralphlauren_get_user_coupons', data, presets).then(function(coupons) {
    //     $scope.couponItems = coupons;
    //
    //     siteid = siteid || site.getId();
    //     if (siteid === $mmSite.getId()) {
    //
    //     }
    //     return coupons;
    //   });
    // });
  }

  redeemCoupons(couponIds, preferCache, siteid): any {
    // if (typeof preferCache == 'undefined') {
    //   preferCache = false;
    // }
    // return $mmSitesManager.getSite(siteid).then(function(site) {
    //   var userid = site.getUserId(),
    //       presets = {
    //         omitExpires: preferCache,
    //         getFromCache : 0
    //       },
    //       data = {
    //         userid: userid,
    //         couponids: couponIds
    //       };
    //   if (typeof userid === 'undefined') {
    //     return $q.reject();
    //   }
    //   return site.read('local_ralphlauren_redeem_user_coupons', data, presets).then(function(result) {
    //
    //     if(result.result == 1) {
    //       selectedIndices = [];
    //
    //       $scope.couponDraw = false;
    //       getUserCoupons().finally(function() {
    //         $scope.couponDraw = true;
    //       });
    //     }
    //
    //     siteid = siteid || site.getId();
    //     if (siteid === $mmSite.getId()) {
    //
    //     }
    //     return result;
    //   });
    // });
  }

  updateUserCoupons(): any {

    // return updateUserCoupons().then(function(result) {
    //   return result;
    // });
  }

  onSelectCoupon(idx): void {
    if  (this.selectedIndices.includes(idx)) {
      let index = this.selectedIndices.indexOf(idx);
      this.selectedIndices.splice(index, 1);
      $('#coupon_item_' + idx).css('border', '1px solid ')
          .css('background-color', '#002855').css('text-align', 'center').css('padding-top', '26px');
      // $("#coupon_item_text_" + idx).show();

      if ($scope.couponItems[idx].coupon_type == 0) {
        $('#coupon_item_' + idx).removeClass('coupon-circle-selected1').addClass('coupon-circle-normal').addClass('activated');
      }
      else if ($scope.couponItems[idx].coupon_type == 1) {
        $('#coupon_item_' + idx).removeClass('coupon-circle-selected2').addClass('coupon-circle-normal').addClass('activated');
      }

    }
    else {
      this.selectedIndices.splice(0, 0, idx);
      $('#coupon_item_' + idx).css('background-color', 'transparent').css('padding-top', '0px');
      // $("#coupon_item_text_" + idx).hide();
      if ($scope.couponItems[idx].coupon_type == 0) {
        $('#coupon_item_' + idx).removeClass('coupon-circle-normal').addClass('coupon-circle-selected1').addClass('activated');
      }
      else if ($scope.couponItems[idx].coupon_type == 1) {
        $('#coupon_item_' + idx).removeClass('coupon-circle-normal').addClass('coupon-circle-selected2').addClass('activated');
      }
    }

  }

}
