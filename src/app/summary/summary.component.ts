import { Component } from '@angular/core';
import { DataService } from '../data.service';

import Utils from '../utils';

@Component({
   selector: 'app-summary',
   templateUrl: './summary.component.html',
   styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
   summary: string = "";
   date: string = "";
   colors = Utils.colors;
   indexID: number = 0;

   constructor(private dataService: DataService) {}

   ngOnInit() {
      this.dataService.getSummary().subscribe((summary)=> {
         this.summary = summary.stIndexLevel.indexLevelName;
         this.date = summary.stSourceDataDate;
         this.indexID = summary.stIndexLevel.id
      })
   }

}
