import { Component, OnInit } from '@angular/core';
import { ScorecardService } from '../api/score-card-service.service';
import { GolfCourse } from '../models/golf-course';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  courses: any;
  selectedCourse;

  noSelectImg = "../../assets/icons/windows.png";

  constructor(private scoreCardService: ScorecardService) { 
    this.scoreCardService
    .getGolfCourses()
    .subscribe(data => {
      this.courses = data;
      console.log(data);
    });
  }

  ngOnInit() {}

  selectCourse(e) {
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
    })
  }
}
