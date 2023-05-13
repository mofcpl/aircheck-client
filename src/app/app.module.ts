import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { StationComponent } from './station/station.component';
import { DataComponent } from './data/data.component';
import { SummaryComponent } from './summary/summary.component';
import { ButtonComponent } from './button/button.component';
import { DescComponent } from './desc/desc.component';

import { DistancePipe } from './station/distance.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    StationComponent,
    DataComponent,
    SummaryComponent,
    ButtonComponent,
    DescComponent,
    DistancePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
