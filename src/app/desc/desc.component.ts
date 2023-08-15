import { Component } from '@angular/core';
import { DataService } from '../data.service';

import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-desc',
  templateUrl: './desc.component.html',
  styleUrls: ['./desc.component.scss']
})
export class DescComponent {

   indexDescription = this.utilsService.indexDesc;
   indexID: number = -1;

   constructor(private dataService: DataService, private utilsService: UtilsService) {}

   ngOnInit() {
      this.dataService.getSummary().subscribe((summary) => this.indexID = summary.stIndexLevel.id)
   }

}
