import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Data } from './models/data.model';
import { Sensor } from "./models/sensor.model";
import { Station } from "./models/station.model";
import { Summary } from "./models/summary.model";
import { HttpClient } from "@angular/common/http";
import { UtilsService } from "./utils.service";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient, private utilsService: UtilsService) { }

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

    fetchStations(): Observable<Station[]> {
        return this.http.get<Station[]>(environment.api + "station/findAll")
    }

    fetchSensors(stationId: number): Observable<Sensor[]> {
        return this.http.get<Sensor[]>(environment.api + "station/sensors/" + stationId)
    }

    fetchData(sensorsId: number): Observable<Data> {
        return this.http.get<Data>(environment.api + "data/getData/" + sensorsId)
    }

    fetchSummary(stationId: number): Observable<Summary> {
        return this.http.get<Summary>(environment.api + "aqindex/getIndex/" + stationId)
    }
}