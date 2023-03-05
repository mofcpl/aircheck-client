import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { StationComponent } from './station/station.component';
import { DataComponent } from './data/data.component';
import { SummaryComponent } from './summary/summary.component';
import { ButtonComponent } from './button/button.component';
import { DescComponent } from './desc/desc.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    StationComponent,
    DataComponent,
    SummaryComponent,
    ButtonComponent,
    DescComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
