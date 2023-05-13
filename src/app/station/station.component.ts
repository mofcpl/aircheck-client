import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
   selector: 'app-station',
   templateUrl: './station.component.html',
   styleUrls: ['./station.component.scss']
})
export class StationComponent {
   
   name: string = "";
   distance: number | undefined = undefined;

   constructor(private dataService: DataService) {}

   ngOnInit() {
      this.dataService.getStation().subscribe((station)=> {
         this.name = station.stationName;
      })
      this.dataService.getDistance().subscribe((distance)=> {
         this.distance = distance;
      })
   }
}
