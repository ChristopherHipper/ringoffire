import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { inject } from '@angular/core';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit {
  firestore = inject(Firestore);
  items$:any;
  items:any;
  game!: Game;
  currentCard: string | undefined = '';
  pickCardAnimation: boolean = false;
  rotation = '0deg';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.items$ = collectionData(this.getGamesRef(), { idField: 'id' })
    this.items = this.items$.subscribe((game:any) => {
      console.log(game);
      
    })
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  };

   getGamesRef() {
    return collection(this.firestore, 'games');
  }

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
