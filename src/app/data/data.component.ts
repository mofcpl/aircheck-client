import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { combineLatest, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent {

   constructor(private dataService: DataService,  private utilsService: UtilsService) {}

   valueLevels = this.utilsService.maxValues;
   colors = this.utilsService.colors;
   data: {code: string; name: string; value: number; level: number}[] = [];

   ngOnInit() {
      combineLatest([this.dataService.getSensor(), this.dataService.getData()]).pipe(map((combinedData) => {
         return {sensors: combinedData[0], data: combinedData[1]}
      })).subscribe((combinedData) => {
         this.data = [];
         combinedData.sensors.forEach((sensorElement) => {
            const dataElement = combinedData.data.find((dataElement) => sensorElement.param.paramCode == dataElement.key )
            if (dataElement) {
               let levelIndex = this.valueLevels[sensorElement.param.paramCode].findIndex((element) => {
                  return dataElement.values[0].value < element
               })
               // let i = 0;
               // while(dataElement.values[0].value > this.valueLevels[sensorElement.param.paramCode][i]) {
               //    i++
               // }
               this.data.push({code: sensorElement.param.paramCode, name: sensorElement.param.paramName, value: dataElement.values[0].value, level: levelIndex})
            }
         })
      })
   }

}
