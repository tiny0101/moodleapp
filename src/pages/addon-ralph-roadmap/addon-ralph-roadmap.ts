// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { CoreTextUtilsProvider } from '@providers/utils/text';
import { CoreUtilsProvider } from '@providers/utils/utils';
import { TranslateService } from '@ngx-translate/core';

/**
 * Page that displays the list of main menu options that aren't in the tabs.
 */
@IonicPage({segment: 'page-addon-ralph-roadmap'})
@Component({
  selector: 'page-addon-ralph-roadmap',
  templateUrl: 'addon-ralph-roadmap.html',
})
export class AddonRalphRoadmapPage implements OnDestroy {

  roadPoints = [
    {name: 'mm.ralph.roadmap_firstday', current_step: false},
    {name: 'mm.ralph.roadmap_firstweek', current_step: true},
    {name: 'mm.ralph.roadmap_firstmonth', current_step: false},
    {name: 'mm.ralph.roadmap_first90days', current_step: false},
    {name: 'mm.ralph.roadmap_keeplearning', current_step: false},
  ];

  roadPointsKeys = [1, 2, 3, 4];

  currentStep = 0;

  protected subscription;
  protected updateSiteObserver;

  constructor(
              protected navCtrl: NavController,
              protected utils: CoreUtilsProvider,
              protected textUtils: CoreTextUtilsProvider,
              protected translate: TranslateService) {

  }

  onSelectRoadmapItem(key: bigint): void {

    if (this.currentStep >= key) {

      this.navCtrl.push('CoreCoursesMyCoursesPage');
      //
      // return $state.go('site.mm_courses', {
      //
      //   itemKey: key + 1,
      //   keyIsCategoryOrRoadMapItemOrFavorites: 2
      // });
    }
  }

  /**
   * View loaded.
   */
  ionViewDidLoad(): void {
    // Load the handlers.

  }

  /**
   * Page destroyed.
   */
  ngOnDestroy(): void {

  }
}
