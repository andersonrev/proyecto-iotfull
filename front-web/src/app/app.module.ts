import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ListarLogHistorialComponent} from './Modulos/logHistorial/listar-log-historial/listar-log-historial.component';
import {ListarAreaSensorComponent} from './Modulos/AreaSensor/listar-area-sensor/listar-area-sensor.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AreaSensoresRestService} from './Servicios/areaSensores.rest.service';
import {WebsocketService} from './Servicios/websocket.service';
import {HttpClientModule} from '@angular/common/http';
import {LogHistorialRestService} from './Servicios/LogHistorial.rest.service';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {TableModule} from 'primeng/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputSwitchModule} from 'primeng/inputswitch';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    ListarLogHistorialComponent,
    ListarAreaSensorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    MessagesModule,
    MessageModule,
    SelectButtonModule,
    InputSwitchModule
  ],
  providers: [
    LogHistorialRestService,
    AreaSensoresRestService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
