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
      this.alertController.create({
        header: 'Error',
        message: 'Player names cannot be empty',
        buttons: ['OK']
      });
    }
  }

  updatePlayerCount(amount) {
    // this.playerAmt = amount;
    this.scoreCardService.setPlayers(amount);
  }

  async startGame() {
    let canContinue = true;
    for (let i = 1; i <= this.playerAmt; i++) {
      if (this.inputValues[i] === undefined) {
        canContinue = false;
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Player names cannot be empty',
          buttons: ['OK']
        });
        alert.present();

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

      this.navCtrl.navigateForward(['game-page']);
    }
  }

}
