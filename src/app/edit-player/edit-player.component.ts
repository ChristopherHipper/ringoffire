import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {
  allPictures: string[] = ['player.png','playerin.png', 'pinguin.png']

}
