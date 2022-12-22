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
import { RadioButtonModule } from 'primeng/radiobutton';
import {TableModule} from 'primeng/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MenuModule} from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DailynewEntryComponent } from './dailynew-entry/dailynew-entry.component';
import { MainNewsEntryComponent } from './main-news-entry/main-news-entry.component';
import { FlashNewsEntryComponent } from './flash-news-entry/flash-news-entry.component';
import { HeaderComponent } from './header/header.component';
import { UserMasterComponent } from './user-master/user-master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DistrictMasterEntryComponent } from './district-master-entry/district-master-entry.component';
import { HttpClientModule } from '@angular/common/http';
import { StateMasterEntryComponent } from './state-master-entry/state-master-entry.component';
import { CountryMasterComponent } from './country-master/country-master.component';
import { MessageService } from 'primeng/api';
import { RestAPIService } from './Services/restApi.service';
import { MenuComponent } from './menu/menu.component';
import { DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DailyNewspaperUploadComponent } from './daily-newspaper-upload/daily-newspaper-upload.component';
<<<<<<< HEAD
import { ReporterRegistrationComponent } from './Reporter-Modules/reporter-registration/reporter-registration.component';
=======
import { NgxEditorModule } from 'ngx-editor';
>>>>>>> 8d0821ee252977a894094c0ecbcd3b76bf5835f7

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
    DistrictMasterEntryComponent,
    StateMasterEntryComponent,
    CountryMasterComponent,
    MenuComponent,
    DailyNewspaperUploadComponent,
    ReporterRegistrationComponent
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
    RadioButtonModule,
    HttpClientModule,
    TableModule,
    MessageModule,
    MessagesModule,
    MenuModule,
    DialogModule,
    FlexLayoutModule,
    OverlayPanelModule,
    NgxEditorModule

  ],
  providers: [MessageService, RestAPIService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
