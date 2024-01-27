import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, combineLatest, forkJoin } from 'rxjs';
import { concatMap, mergeMap, map, switchMap, shareReplay, tap } from 'rxjs/operators';

import { UtilsService } from './utils.service';
import { Station } from './models/station.model';
import { Sensor } from './models/sensor.model';
import { Data } from './models/data.model';
import { Summary } from './models/summary.model';
import { environment } from './../environments/environment';
import { ApiService } from './api.service';

@Injectable({
   providedIn: 'root'
})
export class DataService {

   private stationSubject = new Subject<Station>;
   private sensorsSubject = new Subject<Sensor[]>;
   private dataSubject = new Subject<Data[]>;
   private summarySubject = new Subject<Summary>;
   private distanceSubject = new Subject<number>;

   constructor(private apiService: ApiService, private utilsService: UtilsService) { }

   getStation(): Observable<Station> {
      return this.stationSubject.asObservable();
   }

   getSensor(): Observable<Sensor[]> {
      return this.sensorsSubject.asObservable();
   }

   getData(): Observable<Data[]> {
      return this.dataSubject.asObservable();
   }

   getSummary(): Observable<Summary> {
      return this.summarySubject.asObservable();
   }

   getDistance(): Observable<number> {
      return this.distanceSubject.asObservable();
   }

   getNearestStation(position: GeolocationCoordinates, stations: Station[]): { station: Station, distance: number } {
      let closestStationIndex = 0;
      let closestDistance = 0;

      stations.forEach((element, index, array) => {
         const newLat = +element.gegrLat;
         const newLng = +element.gegrLon;

         const newDistance = this.utilsService.calcDistance({ latitude: position.latitude, longitude: position.longitude }, { latitude: newLat, longitude: newLng });

         if (index == 0) {
            closestStationIndex = index;
            closestDistance = newDistance;
         } else {
            if (newDistance < closestDistance) {
               closestStationIndex = index;
               closestDistance = newDistance;
            }
         }
      });

      return {station: stations[closestStationIndex], distance: closestDistance};
   }

   check() {

      forkJoin([this.apiService.fetchPosition(), this.apiService.fetchStations()]).pipe(
         map(([position, stations]) => this.getNearestStation(position, stations)),
         tap(data => {
            this.stationSubject.next(data.station)
            this.distanceSubject.next(data.distance)
         })
      ).subscribe()

      this.stationSubject.pipe(
         switchMap( station => this.apiService.fetchSummary(station.id)),
         tap( summary => {
            this.summarySubject.next(summary)
         })
      ).subscribe()

      this.stationSubject.pipe(
         switchMap( station => this.apiService.fetchSensors(station.id)),
         tap( sensors => {
            this.sensorsSubject.next(sensors)
         }),
         switchMap( sensors => forkJoin(sensors.map( sensor => this.apiService.fetchData(sensor.id)))),
         tap( data => {
            this.dataSubject.next(data)
         })
      ).subscribe()

   }
}
