import { Component, OnInit } from '@angular/core';
import { ScorecardService } from '../../api/score-card-service.service';
import { NavController, AlertController } from '@ionic/angular';
import { Player } from 'src/app/models/player';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-config',
  templateUrl: './player-config.page.html',
  styleUrls: ['./player-config.page.scss'],
})
export class PlayerConfigPage implements OnInit {

  playerAmt = 1;
  inputValues = [];

  constructor(
    private scoreCardService: ScorecardService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private alertController: AlertController,
    ) { }

  ngOnInit() {
    if (!this.scoreCardService.selectedCourse) {
      this.navCtrl.navigateForward(['']);
    }
    const errorMsg = this.route.snapshot.paramMap.get('error');
    if (errorMsg) {
      this.setError('Player names cannot be empty.');
    }
  }

  updatePlayerCount(amount) {
    // this.playerAmt = amount;
    this.scoreCardService.setPlayers(amount);
  }

  async setError(msg) {
    const alert = await this.alertController.create({
      header: 'Oops!',
      message: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  startGame() {
    let canContinue = true;
    for (let i = 1; i <= this.playerAmt; i++) {
      if (this.inputValues[i] === undefined || this.inputValues[i] === '') {
        canContinue = false;
        this.setError('Player names cannot be empty.');
        break;
      }
      let instances = 1;
      this.inputValues.forEach((v, index) => {
        if (index !== i) {
          if (v === this.inputValues[i]) {
            this.inputValues[index] = this.inputValues[index] + instances;
            instances++;
          }
        }
      });
    }
    if (canContinue) {
      this.scoreCardService.allPlayers = []; // Resetting array
      this.inputValues.forEach(v => {
        const newPlayer: Player = {
          name: v,
          score: 0,
        };
        this.scoreCardService.allPlayers.push(newPlayer);
      });
      this.scoreCardService.selectedGameSave = null;
      this.navCtrl.navigateForward(['game-page']);
    }
  }

}
