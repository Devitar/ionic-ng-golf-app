import {
  Component,
  OnInit
} from '@angular/core';
import {
  ScorecardService
} from 'src/app/api/score-card-service.service';
import {
  Player
} from 'src/app/models/player';
import {
  NavController,
  ToastController
} from '@ionic/angular';
import {
  GolfCourse
} from 'src/app/models/golf-course';
import {
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.page.html',
  styleUrls: ['./game-page.page.scss'],
})
export class GamePagePage implements OnInit {

  players: Array < Player > ;
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

  playerScoreGroups = {};

  constructor(
    private scoreCardService: ScorecardService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {
    this.players = this.scoreCardService.allPlayers;
    this.selectedCourse = this.scoreCardService.selectedCourse;
    this.selectedTee = this.scoreCardService.selectedTee;

    const outHoles = this.scoreCardService.selectedCourse.holes.filter(v => {
      return v.hole <= 9;
    });
    const inHoles = this.scoreCardService.selectedCourse.holes.filter(v => {
      return v.hole > 9;
    });
    this.courseHoles.outHoles = outHoles;
    this.courseHoles.inHoles = inHoles;

    this.courseHoles.outHoles.forEach(v => {
      v.teeBoxes.forEach(teeBox => {
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
    this.courseHoles.inHoles.forEach(v => {
      v.teeBoxes.forEach(teeBox => {
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

    this.players.forEach(player => {
      const playerControl = {};
      for (let i = 0; i < 9; i++) {
        playerControl[i.toString() + 'In'] = new FormControl('');
      }
      for (let i = 0; i < 9; i++) {
        playerControl[i.toString() + 'Out'] = new FormControl('');
      }

      this.playerScoreGroups[player.name] = [
        new FormGroup(playerControl),
        {
          OutTotal: 0,
          InTotal: 0,
        }
      ];
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
          this.navCtrl.navigateForward(['player-config', {
            error: 'emptyName'
          }]);
        }
      });
    }
  }

  updateScores(e) {
    if (isNaN(Number(e.srcElement.value))) {
      e.srcElement.value = '';
    } else {
      Object.keys(this.playerScoreGroups).forEach(playerName => {
        const form = this.playerScoreGroups[playerName][0];
        const formValue = form.value;
        let isValid = true;
        let indexCount = 0;
        let totalCountOut = 0;
        let totalCountIn = 0;
        Object.keys(formValue).forEach(index => {
          if (!isValid) { return; }
            let value = formValue[index];

            if (value === '') {
              isValid = false;
            } else {
              if (indexCount < 9) {
                totalCountOut += Number(value);
              } else {
                totalCountIn += Number(value);
              }
            }
            if (indexCount === 8 && isValid) {
              this.playerScoreGroups[playerName][1].OutTotal = totalCountOut;
              
            }
            if (indexCount === 17 && isValid) {
              this.playerScoreGroups[playerName][1].InTotal = totalCountIn;

            }
            indexCount++;
        });
        if (isValid) {
          console.log(playerName, '`s scorecard is completed');
          // To Do Calculate totals
        }
      });
    }
  }

  saveGame() {

    this.showToast('Your scores have been saved!');
  }

}