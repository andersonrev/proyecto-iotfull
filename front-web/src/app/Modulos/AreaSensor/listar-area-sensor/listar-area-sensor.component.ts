import {Component, OnInit} from '@angular/core';
import {AreaSensoresRestService} from '../../../Servicios/areaSensores.rest.service';
import {WebsocketService} from '../../../Servicios/websocket.service';


@Component({
  selector: 'app-listar-area-sensor',
  templateUrl: './listar-area-sensor.component.html',
  styleUrls: ['./listar-area-sensor.component.scss']
})
export class ListarAreaSensorComponent implements OnInit {


  areaSensores = [];
  FILAS = 3;


  constructor(private readonly _areaSensorRestService: AreaSensoresRestService,
              private readonly _socket: WebsocketService
  ) {
  }

  ngOnInit() {

    this._socket.listen('ingreso').subscribe(
      (data) => {
        console.log('Loco estas poniendo cero', data);
        this.listarSensores();
      }
    );
    this.listarSensores();
  }

  listarSensores() {


    const urlLogHistorial$ = this._areaSensorRestService.buscar('');
    urlLogHistorial$.subscribe(
      (data) => {

        this.areaSensores = data;
      },
      (err) => {
        console.log({
          error: err,
          mensaje: 'Error consutando LogHistorial'
        });
      }
    );

  }


  AreaSensorFiltrado() {
    return this.areaSensores;
  }
}
