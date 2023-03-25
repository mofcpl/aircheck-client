import { Component } from '@angular/core';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent {
  name = 'Warszawska';
  distance = '1000m'
}
