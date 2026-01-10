import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Game } from '../models/game';
import { GamesService } from '../firebase-service/games.service';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  game!: Game;

  constructor(private router: Router, private gameService: GamesService) { }

  newGame() {
    this.game = new Game();
    this.gameService.getGameInfo(this.game).then((gameInfo) => {
      this.router.navigate(['/game', gameInfo.id]);
    });
  };
}
