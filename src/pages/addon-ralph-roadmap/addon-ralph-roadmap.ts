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
import { CoreCoursesProvider } from '@core/courses/providers/courses';
import { CoreDomUtilsProvider } from '@providers/utils/dom';
import { CoreCoursesHelperProvider } from '@core/courses/providers/helper';

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
  coursesLoaded = false;
  currentStep = 0;
  courses = [];
  roadMapScores = [ 0, 0, 0, 0, 0];
  roadMapCoursesCount = [0, 0, 0, 0, 0];

  protected subscription;
  protected updateSiteObserver;

  constructor(
              protected navCtrl: NavController,
              protected utils: CoreUtilsProvider,
              protected textUtils: CoreTextUtilsProvider,
              private coursesProvider: CoreCoursesProvider,
              private domUtils: CoreDomUtilsProvider,
              private coursesHelper: CoreCoursesHelperProvider,
              protected translate: TranslateService) {

  }

  onSelectRoadmapItem(key: number): void {

    if (this.currentStep >= key) {

      this.navCtrl.push('CoreCoursesMyCoursesPage', {
        itemKey: key + 1,
        keyIsCategoryOrRoadMapItemOrFavorites: 2
      });
      //
      // return $state.go('site.mm_courses', {
      //
      //   itemKey: key + 1,
      //   keyIsCategoryOrRoadMapItemOrFavorites: 2
      // });
    }
  }

  fetchCourses(): Promise<void> {

    return this.coursesProvider.getUserCoursesByRoadMapItem(0, true).then((courses) => {

      const courseIdsArray = courses.map((course) => {
        return course.id;
      });

      const promises = [];
      var courseIds = courseIdsArray.join(',');

      promises.push(this.coursesHelper.loadCoursesExtraInfo(courses));

      if (this.coursesProvider.canGetAdminAndNavOptions()) {
        promises.push(this.coursesProvider.getCoursesAdminAndNavOptions(courseIdsArray).then((options) => {
          courses.forEach((course) => {
            course.progress = isNaN(parseInt(course.progress, 10)) ? false : parseInt(course.progress, 10);
            course.navOptions = options.navOptions[course.id];
            course.admOptions = options.admOptions[course.id];

            if (!(course.assignroadmap == null || course.assignroadmap < 1 || course.assignroadmap > 5)) {
              this.roadMapCoursesCount[course.assignroadmap - 1] ++;
              if (course.progress == 100) {
                this.roadMapScores[course.assignroadmap - 1] ++;
              }
            }
          });
        }));
      }

      return Promise.all(promises).then(() => {
        this.courses = courses;

        for (let i = 0; i < this.roadMapScores.length; i++) {
          if (this.roadMapScores[i] == this.roadMapCoursesCount[i] && this.roadMapCoursesCount[i] != 0) {
            this.currentStep = i + 1;
            continue;
          }
          else {
            break;
          }
        }
      });

      // return this.coursesProvider.getCoursesOptions(courseIds).then((options) => {
      //
      //   courses.forEach((course) => {
      //     course.progress = isNaN(parseInt(course.progress, 10)) ? false : parseInt(course.progress, 10);
      //     course.navOptions = options.navOptions[course.id];
      //     course.admOptions = options.admOptions[course.id];
      //
      //     if (!(course.assignroadmap == null || course.assignroadmap < 1 || course.assignroadmap > 5)) {
      //       this.roadMapCoursesCount[course.assignroadmap - 1] ++;
      //       if (course.progress == 100) {
      //         this.roadMapScores[course.assignroadmap - 1] ++;
      //       }
      //     }
      //   });
      //   this.courses = courses;
      //
      //   var i, currentStep = 0;
      //   for (i = 0; i < this.roadMapScores.length; i++) {
      //     if (this.roadMapScores[i] == this.roadMapCoursesCount[i] && this.roadMapCoursesCount[i] != 0) {
      //       currentStep = i + 1;
      //       continue;
      //     }
      //     else {
      //       break;
      //     }
      //   }
      //
      //   this.currentStep = currentStep;
      //
      // });
    }).catch((error) => {
      this.domUtils.showErrorModalDefault(error, 'core.courses.errorloadcourses', true);
    });
  }

  /**
   * View loaded.
   */
  ionViewDidLoad(): void {
    // Load the handlers.

    this.fetchCourses().finally(() => {
      this.coursesLoaded = true;
    });

  }

  /**
   * Page destroyed.
   */
  ngOnDestroy(): void {

  }
}
