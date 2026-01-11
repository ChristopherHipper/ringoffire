import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  firestore = inject(Firestore);
  gamesSub: any;

  constructor() { }

  getGamesRef() {
    return collection(this.firestore, 'games');
  };

  gameToJson(game: Game) {
    return {
      players: game.players,
      stack: game.stack,
      playedCards: game.playedCards,
      currentPlayer: game.currentPlayer,
      currentCard: game.currentCard,
      pickCardAnimation: game.pickCardAnimation,
      playerImage: game.playerImage,
    };
  };

  async getGameInfo(game: Game) {
    let docInfo = await addDoc(this.getGamesRef(), this.gameToJson(game));
    return docInfo;
  };

  getSingleGame(docId: string) {
    return doc(this.firestore, 'games/', docId);
  };

  getDocData(id: string) {
    return docData(this.getSingleGame(id));
  };

  async updateGame(game: Game) {
    if (game.id) {
      let docRef = this.getSingleGame(game.id);
      let JsonRef = this.gameToJson(game);
      await updateDoc(docRef, JsonRef).catch(
        (err) => {
          console.log('fehler:', err);
        });
    };
  };
}
