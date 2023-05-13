import { Position } from "./models/position.model";

interface IIndexable {
   [key: string]: number[];
 }

export default class Utils {

   //https://stackoverflow.com/a/1502821
   static calcDistance(pos1: Position, pos2: Position) {
      const degToRad = (x: number) => {
         return x * Math.PI / 180;
      }

      const R = 6378137; // Earth’s mean radius in meter
      let dLat = degToRad(pos2.latitude - pos1.latitude);
      let dLong = degToRad(pos2.longitude - pos1.longitude);
      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(degToRad(pos1.latitude)) * Math.cos(degToRad(pos2.latitude)) *
         Math.sin(dLong / 2) * Math.sin(dLong / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c;
      return d; // returns the distance in meter
   }

   static readonly indexDesc = [
      "Jakość powietrza jest bardzo dobra, zanieczyszczenie powietrza nie stanowi zagrożenia dla zdrowia, warunki bardzo sprzyjające do wszelkich aktywności na wolnym powietrzu, bez ograniczeń.",
      "Jakość powietrza jest zadowalająca, zanieczyszczenie powietrza powoduje brak lub niskie ryzyko zagrożenia dla zdrowia. Można przebywać na wolnym powietrzu i wykonywać dowolną aktywność, bez ograniczeń.",
      "Jakość powietrza jest akceptowalna. Zanieczyszczenie powietrza może stanowić zagrożenie dla zdrowia w szczególnych przypadkach (dla osób chorych, osób starszych, kobiet w ciąży oraz małych dzieci). Warunki umiarkowane do aktywności na wolnym powietrzu.",
      "Jakość powietrza jest dostateczna, zanieczyszczenie powietrza stanowi zagrożenie dla zdrowia (szczególnie dla osób chorych, starszych, kobiet w ciąży oraz małych dzieci) oraz może mieć negatywne skutki zdrowotne. Należy rozważyć ograniczenie (skrócenie lub rozłożenie w czasie) aktywności na wolnym powietrzu, szczególnie jeśli ta aktywność wymaga długotrwałego lub wzmożonego wysiłku fizycznego.",
      "Jakość powietrza jest zła, osoby chore, starsze, kobiety w ciąży oraz małe dzieci powinny unikać przebywania na wolnym powietrzu. Pozostała populacja powinna ograniczyć do minimum wszelką aktywność fizyczną na wolnym powietrzu - szczególnie wymagającą długotrwałego lub wzmożonego wysiłku fizycznego.",
      "Jakość powietrza jest bardzo zła i ma negatywny wpływ na zdrowie. Osoby chore, starsze, kobiety w ciąży oraz małe dzieci powinny bezwzględnie unikać przebywania na wolnym powietrzu. Pozostała populacja powinna ograniczyć przebywanie na wolnym powietrzu do niezbędnego minimum. Wszelkie aktywności fizyczne na zewnątrz są odradzane. Długotrwała ekspozycja na działanie substancji znajdujących się w powietrzu zwiększa ryzyko wystąpienia zmian m.in. w układzie oddechowym, naczyniowo-sercowym oraz odpornościowym.",
      "„Brak Indeksu” odpowiada sytuacji, gdy na danej stacji pomiarowej nie są aktualnie prowadzone pomiary pyłu zawieszonego lub ozonu, a jeden z nich jest w danej chwili decydującym zanieczyszczeniem powietrza w województwie. Indeks Jakości Powietrza nie jest wtedy wyznaczany [...]. Stacja pomimo braku określonego Indeksu jest nadal widoczna i jest możliwość sprawdzenia wszystkich pozostałych wyników pomiarów."
   ];

   static readonly colors = ["#57b108", '#b0dd10', '#ffd911', '#e58100', '#e50000', '#990000'];

   static readonly maxValues :IIndexable = {
      'C6H6': [6, 11, 16, 21, 51],
      'CO': [3000, 7000, 11000, 15000, 21000],
      'NO2': [41, 101, 151, 201, 401],
      'O3': [71, 121, 151, 181, 241],
      'PM10': [21, 61, 101, 141, 201],
      'PM2.5': [13, 37, 61, 85, 121],
      'SO2': [51, 101, 201, 351, 501]
   }
}