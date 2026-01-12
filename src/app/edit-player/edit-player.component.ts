import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {
  allPictures: string[] = ['player.png','playerin.png', 'pinguin.png']

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>){}

}
