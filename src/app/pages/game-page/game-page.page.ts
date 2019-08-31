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
  courseHcp = {
    outHcp: [],
    outTotal: 0,
    inHcp: [],
    inTotal: 0,
    allTotal: 0,
  };
  coursePar = {
    outPar: [],
    outTotal: 0,
    inPar: [],
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
          this.courseYards.outYards.push(teeBox.yards);
          this.courseYards.outTotal += teeBox.yards;

          this.courseHcp.outHcp.push(teeBox.hcp);
          this.courseHcp.outTotal += teeBox.hcp;

          this.coursePar.outPar.push(teeBox.par);
          this.coursePar.outTotal += teeBox.par;

        }
      });
    });
    this.courseHoles.inHoles.forEach( v => {
      v.teeBoxes.forEach( teeBox => {
        if (teeBox.teeType === this.selectedTee) {
          this.courseYards.inYards.push(teeBox.yards);
          this.courseYards.inTotal += teeBox.yards;

          this.courseHcp.inHcp.push(teeBox.hcp);
          this.courseHcp.inTotal += teeBox.hcp;

          this.coursePar.inPar.push(teeBox.par);
          this.coursePar.inTotal += teeBox.par;

        }
      });
    });
    this.courseYards.allTotal = this.courseYards.outTotal + this.courseYards.inTotal;

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

  updateScores() {
    console.log('update scores', this.players);
    
    this.players.forEach(player => {
      const playerScoreOut = document.getElementsByClassName(player.name + 'Out');
      const playerScoreIn = document.getElementsByClassName(player.name + 'In');
      console.log(playerScoreOut, playerScoreIn)
      for (let i = 0; i < playerScoreOut.length; i++) {
        console.log(playerScoreOut[i]);
      }
    });
  }

  saveGame() {

    this.showToast('Your scores have been saved!');
  }

}
