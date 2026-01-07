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
  currentCard: string | undefined = '';
  pickCardAnimation: boolean = false;
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
      })
    })

  }

  newGame() {
    this.game = new Game();
  };

  takeCard() {
    if (this.game.players.length == 0) {
      return
    }
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.rotation = this.getRandomRotation();
      this.pickCardAnimation = true;
      this.handelCard();
    };
  };

  handelCurrentPlayer() {
    this.game.currentPlayer++
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length
  }

  handelCard() {
    setTimeout(() => {
      this.pickCardAnimation = false;
      if (this.currentCard != undefined) {
        this.game.playedCards.push({
          name: this.currentCard,
          rotation: this.rotation
        });
        this.handelCurrentPlayer();
      } else {
        alert('Game End');
      };
    }, 1000);
  }

  getRandomRotation(): string {
    return `${Math.floor(Math.random() * 5) - 2}deg`;
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.game.players.push(name)
      }

    });
  }


};
