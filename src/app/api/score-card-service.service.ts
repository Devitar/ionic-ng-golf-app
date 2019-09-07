import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GolfCourses } from '../models/golf-courses';
import { GolfCourse } from '../models/golf-course';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class ScorecardService {

  allCoursesUrl = 'https://golf-courses-api.herokuapp.com/courses';
  selectedCourse: GolfCourse;
  selectedTee: string;
  hasPicked = false;

  allPlayers: Array<Player>;

  constructor(private httpClient: HttpClient) { }

  getGolfCourses(): Observable<GolfCourse[]> {
    return this.httpClient.get<GolfCourses>(this.allCoursesUrl).pipe(
      map(data => data.courses)
    );
  }

  getGolfCourseById(id: number): Observable<any> {
    return this.httpClient.get<GolfCourse>(this.allCoursesUrl + '/' + id.toString());
  }

  formatPhoneNumber(phoneNumberString: string) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  }

  setPlayers(players) {
    this.allPlayers = players;
  }

  getPlayers() {
    if (this.allPlayers) {
      return this.allPlayers;
    } else {
      return false;
    }
  }

}
