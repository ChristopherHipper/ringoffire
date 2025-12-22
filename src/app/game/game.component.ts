import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';

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

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  };


  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.rotation = this.getRandomRotation();
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.pickCardAnimation = false;
        if (this.currentCard != undefined) {
          this.game.playedCards.push({
            name : this.currentCard,
            rotation: this.rotation
          })
        } else {
          alert('Game End')
        }
      }, 1000);
    }
  };

  getRandomRotation(): string {
    return `${Math.floor(Math.random() * 5) - 2}deg`;
  }


}
