import { Component } from '@angular/core';
import { DataService } from '../data.service';

import Utils from '../utils';

@Component({
  selector: 'app-desc',
  templateUrl: './desc.component.html',
  styleUrls: ['./desc.component.scss']
})
export class DescComponent {

   indexDescription = Utils.indexDesc;
   indexID: number = -1;

   constructor(private dataService: DataService) {}

   ngOnInit() {
      this.dataService.getSummary().subscribe((summary) => this.indexID = summary.stIndexLevel.id)
   }

}
