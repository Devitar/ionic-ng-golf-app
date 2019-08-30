import { Component, OnInit } from '@angular/core';
import { ScorecardService } from 'src/app/api/score-card-service.service';
import { Player } from 'src/app/models/player';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.page.html',
  styleUrls: ['./game-page.page.scss'],
})
export class GamePagePage implements OnInit {

  players: Array<Player>;

  constructor(
    private scoreCardService: ScorecardService,
    private navCtrl: NavController
  ) { this.players = this.scoreCardService.allPlayers; }

  ngOnInit() {
    if (!this.scoreCardService.selectedCourse) {
      this.navCtrl.navigateForward(['']);
    }
    if (this.scoreCardService.allPlayers.length < 1) {
      this.navCtrl.navigateForward(['player-config']);
    } else {
      this.scoreCardService.allPlayers.forEach(v => {
        if (v.name === undefined) {
          this.navCtrl.navigateForward(['player-config', {error: 'emptyName'}]);
        }
      });
    }
  }

}
