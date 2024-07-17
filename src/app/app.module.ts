import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { SearchComponent } from './feactures/search/search.component';
import { CardComponent } from './feactures/card/card.component';
import { ProfileComponent } from './feactures/profile/profile.component';
import { GraphicComponent } from './feactures/graphic/graphic.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CardComponent,
    ProfileComponent,
    GraphicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
