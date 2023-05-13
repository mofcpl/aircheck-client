interface Commune {
    communeName: string;
    districtName: string;
    provinceName: string;
}

interface City {
    commune: Commune;
    id: number;
    name: string;
}

export interface Station {
    id: number;
    gegrLat: string;
    gegrLon: string;
    city: City;
    stationName: string
}