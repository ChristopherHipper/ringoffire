import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnChanges {
  title:string = 'Spielablauf:';
  description: string = 'Füge Spieler hinzu "+". Anschließend könnt ihr spielen. Klicke auf den Stapel, wenn du dran bist und schau was deine bzw. eure Aufgaben sind';
  @Input() card: string | undefined = '';

  cardAction = [
    { title: 'Label', description: 'Nenne du eine Marke (z.B.: BMW) rechte Nachhbar nennt ebenfalls eine Marke aus der gleichen Kategorie (z.B. Audi) usw.... Wer zu lange braucht oder es nicht schafft, muss trinken.' },
    { title: 'You', description: 'Du bestimmst jemanden, der einen Schluck trinken muss.' },
    { title: 'Me', description: 'Du selbst trinkst einen Schluck.' },
    { title: 'Floor', description: 'Alle müssen den Boden berühren – der Letzte trinkt.' },
    { title: 'Dancer', description: 'Du machst einen Tanzmove vor. Dein rechter Nachbar wiederholt den Move und fügt einen weiteren hinzu, und so geht es weiter. Der letzte muss den kompletten Tanz vorführen; wenn er einen Fehler macht, muss er trinken.' },
    { title: 'Chicks', description: 'Alle Frauen trinken.' },
    { title: 'Thumbmaster ', description: 'Du kannst jederzeit deinen Daumen auf den Tisch legen. Wer als Letzter reagiert, trinkt.' },
    { title: 'Mate', description: 'Wähle einen Mitspieler – ab jetzt müsst ihr immer gemeinsam trinken.' },
    { title: 'Rhyme', description: 'Sag ein Wort. Im Uhrzeigersinn muss jeder einen Reim sagen. Wer scheitert, trinkt.' },
    { title: 'Men', description: 'Alle Männer trinken.' },
    { title: 'Quizmaster', description: 'Erfinde eine Regel, die ab sofort gilt. Beispiel: „Nur mit links trinken“ oder „Niemand darf fluchen“.' },
    { title: 'Never have i ever...', description: 'Starte eine Runde „Ich hab noch nie…“ – wer etwas doch getan hat, trinkt.' },
    { title: 'Speaker ', description: 'Mit dir darf niemand reden, bis jemand anderes eine Königin gezogen hat. Wer doch mit dir redet, muss trinken.' },
  ];

  ngOnChanges(): void {
    if ( this.card && this.card != undefined) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber-1].title;
      this.description = this.cardAction[cardNumber-1].description;
    }
  }
}
