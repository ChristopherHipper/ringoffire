import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../firebase-service/games.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit {
  game!: Game;
  rotation = '0deg';

  constructor(private gameService: GamesService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameService.gamesSub = this.gameService.getDocData(params['id']).subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.id = params['id'];
        this.game.currentCard = game.currentCard;
        this.game.pickCardAnimation = game.pickCardAnimation;
      });
    });
  }

  newGame() {
    this.game = new Game();
  };

  takeCard() {
    if (this.game.players.length == 0) {
      return;
    };
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.rotation = this.getRandomRotation();
      this.game.pickCardAnimation = true;
      this.gameService.updateGame(this.game);
      this.handelCard();
    };
  };

  handelCurrentPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  };

  handelCard() {
    setTimeout(() => {
      this.game.pickCardAnimation = false;
      if (this.game.currentCard != undefined) {
        this.game.playedCards.push({
          name: this.game.currentCard,
          rotation: this.rotation
        });
        this.handelCurrentPlayer();
        this.gameService.updateGame(this.game);
      } else {
        alert('Game End');
      };
    }, 1000);
  };

  getRandomRotation(): string {
    return `${Math.floor(Math.random() * 5) - 2}deg`;
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });
    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.game.players.push(name);
        this.gameService.updateGame(this.game);
      };
    });
  };
};
