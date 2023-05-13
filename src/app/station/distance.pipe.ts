import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
   name: 'distance'
})
export class DistancePipe implements PipeTransform {
   transform(value: any) {
      if(value === undefined) return "";
      else return Math.round(value) + "m"
   }
}