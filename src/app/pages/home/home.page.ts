import { Component, OnInit } from '@angular/core';
import { ScorecardService } from '../../api/score-card-service.service';
import { GolfCourse } from '../../models/golf-course';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  courses: any;
  selectedCourse: GolfCourse;
  selectedTee: string;
  canContinue = false;

  noSelectImg = '../../assets/icons/windows.png';

  constructor(
    private scoreCardService: ScorecardService,
    private navCtrl: NavController,
    ) {
    this.scoreCardService
    .getGolfCourses()
    .subscribe(data => {
      this.courses = data;
    });
  }

  ngOnInit() {}

  goToGolfSite() {
    window.location.href = this.selectedCourse.website;
  }

  filterTees(tees) {
    const teeFilter = tees.filter(v => {
      return v.teeType !== 'auto change location';
    });
    return teeFilter;
  }

  selectCourse(e) {
    this.canContinue = false;
    this.selectedTee = '';
    this.scoreCardService.getGolfCourseById(e).subscribe((response) => {
      const data = response.data;
      const courseObj: GolfCourse = {
        name: data.name,
        id: data.id,
        image: data.thumbnail,
        hole_count: data.holeCount,
        address: data.addr1,
        city: data.city,
        state: data.stateOrProvince,
        zip: data.zipCode,
        phone: this.scoreCardService.formatPhoneNumber(data.phone),
        holes: data.holes,
        website: data.website,
      };
      this.selectedCourse = courseObj;
      this.scoreCardService.selectedCourse = courseObj;
    });
  }

  teeSelected(value) {
    if (value !== '') {
      this.canContinue = true;
      this.scoreCardService.selectedTee = value;
    }
  }

  chooseCourse() {
    if (this.canContinue) {
      this.navCtrl.navigateForward(['player-config']);
    }
  }
}
