import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, combineLatest, forkJoin } from 'rxjs';
import { concatMap, mergeMap, map, switchMap, shareReplay } from 'rxjs/operators';

import { Station } from './models/station.model';
import { Sensor } from './models/sensor.model';
import { Data } from './models/data.model';
import { Summary } from './models/summary.model';

import Utils from './utils';

@Injectable({
   providedIn: 'root'
})
export class DataService {

   readonly proxyServer = "https://cors-anywhere.herokuapp.com/";
   readonly api = "http://api.gios.gov.pl/pjp-api/rest/";

   private stationSubject = new Subject<Station>;
   private sensorsSubject = new Subject<Sensor[]>;
   private dataSubject = new Subject<Data[]>;
   private summarySubject = new Subject<Summary>;
   private distanceSubject = new Subject<number>;

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

   constructor(private http: HttpClient) { }

   fetchPosition(): Observable<GeolocationCoordinates> {
      return new Observable(obs => {
         navigator.geolocation.getCurrentPosition(
            position => {
               obs.next(position.coords);
               obs.complete();
            },
            error => {
               obs.error(error);
            }
         );
      })
   }

   fetchNearestStation(position: GeolocationCoordinates): Observable<{station: Station, distance: number}> {
      return this.http.get<Station[]>(this.proxyServer + this.api + "station/findAll").pipe(
         map((stations) => {
            let closestStationIndex = 0;
            let closestDistance = 0;

            stations.forEach((element, index, array) => {
               const newLat = +element.gegrLat;
               const newLng = +element.gegrLon;

               const newDistance = Utils.calcDistance({ latitude: position.latitude, longitude: position.longitude }, { latitude: newLat, longitude: newLng });

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
         })
      )
   }

   fetchSensors(stationAndDistance: {station: Station, distance: Number}): Observable<Sensor[]> {
      return this.http.get<Sensor[]>(this.proxyServer + this.api + "station/sensors/" + stationAndDistance.station.id)
   }

   fetchData(sensors: Sensor[]): Observable<Data[]> {
      const requests = sensors.map((sensor) => this.http.get<Data>(this.proxyServer + this.api + "data/getData/" + sensor.id))
      return forkJoin(requests)
   }

   fetchSummary(stationAndDistance: {station: Station, distance: Number}): Observable<Summary> {
      return this.http.get<Summary>(this.proxyServer + this.api + "aqindex/getIndex/" + stationAndDistance.station.id)
   }

   check() {
      const stationID$ = this.fetchPosition().pipe(concatMap(this.fetchNearestStation.bind(this)), shareReplay());
      const sensors$ = stationID$.pipe(concatMap(this.fetchSensors.bind(this)), shareReplay());
      const data$ = sensors$.pipe(concatMap(this.fetchData.bind(this)));
      const summary$ = stationID$.pipe(concatMap(this.fetchSummary.bind(this)));

      stationID$.subscribe((stationAndDistance) => {
         this.stationSubject.next(stationAndDistance.station)
         this.distanceSubject.next(stationAndDistance.distance)
      });
      sensors$.subscribe((sensor) => this.sensorsSubject.next(sensor));
      data$.subscribe((data) => this.dataSubject.next(data));
      summary$.subscribe((summary) => this.summarySubject.next(summary));
   }
}
