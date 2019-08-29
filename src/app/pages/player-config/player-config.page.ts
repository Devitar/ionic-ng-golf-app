import { Component, OnInit } from '@angular/core';
import { ScorecardService } from '../../api/score-card-service.service';

@Component({
  selector: 'app-player-config',
  templateUrl: './player-config.page.html',
  styleUrls: ['./player-config.page.scss'],
})
export class PlayerConfigPage implements OnInit {

  playerAmt = 1;

  constructor(private scoreCardService: ScorecardService) { }

  ngOnInit() {
  }

  updatePlayerCount(amount) {
    this.playerAmt = amount;
    this.scoreCardService.setPlayers(amount);
  }

}
