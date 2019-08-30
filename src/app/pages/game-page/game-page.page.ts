import { Component, OnInit } from '@angular/core';
import { ScorecardService } from 'src/app/api/score-card-service.service';
import { Player } from 'src/app/models/player';
import { NavController, ToastController } from '@ionic/angular';
import { GolfCourse } from 'src/app/models/golf-course';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.page.html',
  styleUrls: ['./game-page.page.scss'],
})
export class GamePagePage implements OnInit {

  players: Array<Player>;
  selectedCourse: GolfCourse;
  selectedTee: string;
  courseHoles = {
    outHoles: [],
    inHoles: [],
  };
  courseYards = {
    outYards: [],
    outTotal: 0,
    inYards: [],
    inTotal: 0,
    allTotal: 0,
  };

  constructor(
    private scoreCardService: ScorecardService,
    private navCtrl: NavController,
    private toastController: ToastController
    ) {
    this.players = this.scoreCardService.allPlayers;
    this.selectedCourse = this.scoreCardService.selectedCourse;
    this.selectedTee = this.scoreCardService.selectedTee;

    const outHoles = this.scoreCardService.selectedCourse.holes.filter( v => {
      return v.hole <= 9;
    });
    const inHoles = this.scoreCardService.selectedCourse.holes.filter( v => {
      return v.hole > 9;
    });
    this.courseHoles.outHoles = outHoles;
    this.courseHoles.inHoles = inHoles;

    this.courseHoles.outHoles.forEach( v => {
      v.teeBoxes.forEach( teeBox => {
        if (teeBox.teeType === this.selectedTee) {
          this.courseYards.outYards[v.hole - 1] = teeBox.yards;
        }
      });
    });
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    if (!this.scoreCardService.selectedCourse) {
      this.navCtrl.navigateForward(['']);
    }
    if (this.scoreCardService.allPlayers.length < 1) {
      this.navCtrl.navigateForward(['player-config']);
    } else {
      this.scoreCardService.allPlayers.forEach(v => {
        if (v.name === undefined || v.name === '') {
          this.navCtrl.navigateForward(['player-config', {error: 'emptyName'}]);
        }
      });
    }
  }

  saveGame() {
    this.showToast('Your scores have been saved!');
  }

}
