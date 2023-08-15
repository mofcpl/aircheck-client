import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { UtilsService } from '../utils.service';

@Component({
   selector: 'app-summary',
   templateUrl: './summary.component.html',
   styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
   summary: string = "";
   date: string = "";
   colors = this.utilsService.colors;
   indexID: number = 0;

   constructor(private dataService: DataService, private utilsService: UtilsService) {}

   ngOnInit() {
      this.dataService.getSummary().subscribe((summary)=> {
         this.summary = summary.stIndexLevel.indexLevelName;
         this.date = summary.stSourceDataDate;
         this.indexID = summary.stIndexLevel.id
      })
   }

}
