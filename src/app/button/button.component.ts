import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  constructor( private dataService: DataService) {
  }

  onButtonPush() {
    this.dataService.check();
  }

}
