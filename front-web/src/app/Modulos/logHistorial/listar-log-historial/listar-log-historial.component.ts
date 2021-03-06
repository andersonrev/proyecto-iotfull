import {Component, OnInit} from '@angular/core';
import {WebsocketService} from '../../../Servicios/websocket.service';
import {LogHistorialRestService} from '../../../Servicios/LogHistorial.rest.service';
import {AreaSensoresRestService} from '../../../Servicios/areaSensores.rest.service';


@Component({
  selector: 'app-listar-log-historial',
  templateUrl: './listar-log-historial.component.html',
  styleUrls: ['./listar-log-historial.component.scss']
})
export class ListarLogHistorialComponent implements OnInit {
  historiales = [];
  FILAS = 10;
  stateOptions: any[];
  value1: string = 'off';
  checked: boolean = false;


  alerta: string;

  constructor(
    private readonly _logHistorialRestService: LogHistorialRestService,
    private readonly _socket: WebsocketService,
    private readonly _areaSensorRestService: AreaSensoresRestService
  ) {
  }

  ngOnInit() {
    this.stateOptions = [{label: 'Apagar', value: 'off'}, {label: 'On', value: 'on'}];
    this.listarHistorial();
    this._socket.listen('test event')
      .subscribe(
        (data) => {
          this.alerta = data.toString();
        }
      );

    this._socket.listen('ingreso')
      .subscribe(
        (data) => {
          if (data) {
            this.historiales.unshift(data);
          }
        }
      );
  }

  listarHistorial() {
    const urlLogHistorial$ = this._logHistorialRestService.buscar('');
    urlLogHistorial$.subscribe(
      (data) => {
        console.log('dataBase', data);
        this.historiales = data;
      },
      (err) => {
        console.log({
          error: err,
          mensaje: 'Error consutando LogHistorial'
        });
      }
    );

  }


  logFiltrado() {
    return this.historiales;
  }

  mostrarBotonApagar() {
    return this.alerta === 'alerta';
  }

  apagar() {
    this._socket.emit('apagar', 'Apagate');
    this.checked = false;
    /*
    if (this.checked) {
      this._socket.emit('apagar', 'Apagate');
    }
    */
    /* this._areaSensorRestService.editar(1, {
       estado: 1
     }).subscribe(
       () => {
         console.log('ya se ha editado desde el friont');
       }
     );*/
  }
}
