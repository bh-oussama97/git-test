import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
