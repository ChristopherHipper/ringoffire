import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, docData } from '@angular/fire/firestore';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  firestore = inject(Firestore);
  gamesSub:any;

  constructor() { }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  async getGameInfo(game:Game) {
    let docInfo = await addDoc(this.getGamesRef(), game.gameToJson())
    return docInfo
  }

  getSingleGame(docId: string) {
    return doc(this.firestore, 'games/', docId);
  }

  getDocData(id:string){
    return docData(this.getSingleGame(id))
  }
}
