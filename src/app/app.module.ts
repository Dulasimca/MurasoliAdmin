import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DailynewEntryComponent } from './dailynew-entry/dailynew-entry.component';
import { MainNewsEntryComponent } from './main-news-entry/main-news-entry.component';
import { FlashNewsEntryComponent } from './flash-news-entry/flash-news-entry.component';
import { HeaderComponent } from './header/header.component';
import { UserMasterComponent } from './user-master/user-master.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DailynewEntryComponent,
    MainNewsEntryComponent,
    FlashNewsEntryComponent,
    HeaderComponent,
    UserMasterComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    PanelMenuModule,
    PanelModule,
    InputTextareaModule,
    CalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
