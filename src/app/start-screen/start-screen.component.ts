import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  firestore = inject(Firestore);
  game!: Game;

  constructor(private router: Router) { }

  async newGame() {
    this.game = new Game();
    let gameInfo = await addDoc(this.getGamesRef(), this.game.gameToJson())
    this.router.navigate(['/game',gameInfo.id]);
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }
}
