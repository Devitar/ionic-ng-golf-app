import { Component, OnInit } from '@angular/core';
import { ScorecardService } from 'src/app/api/score-card-service.service';
import { NavController } from '@ionic/angular';
import { Player } from 'src/app/models/player';
import { GolfCourse } from 'src/app/models/golf-course';

@Component({
  selector: 'app-saved-games',
  templateUrl: './saved-games.page.html',
  styleUrls: ['./saved-games.page.scss'],
})
export class SavedGamesPage implements OnInit {
  savedGames;

  constructor(
    private scoreCardService: ScorecardService,
    private navCtrl: NavController,
  ) {
    this.savedGames = this.scoreCardService.savedGames;
  }

  ngOnInit() {
  }

  goToGame(game) {
    this.scoreCardService.allPlayers = [];
    Object.keys(game.data).forEach(playerName => {
      const newPlayer: Player = {
        name: playerName,
        score: 0,
      };
      this.scoreCardService.allPlayers.push(newPlayer);
    });
    this.scoreCardService.getGolfCourseById(game.course).subscribe((response) => {
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
      this.scoreCardService.selectedCourse = courseObj;
      this.scoreCardService.selectedTee = game.tee;
      this.scoreCardService.selectedGameSave = game.data;

      this.navCtrl.navigateForward('/game-page');
    });
  }

}
