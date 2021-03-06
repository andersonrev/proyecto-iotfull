import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: any;
  readonly url: string = 'ws://localhost:3000';
  historiales: any[] = [];

  constructor() {
    this.socket = io(this.url);
  }

// Trae cadena de alerta|monitoreo
  listen(eventName: string) {
    return new Observable(
      (subscriber) => {
        this.socket.on(eventName, (data) => {
          console.log('tipo', data);
          subscriber.next(data);
        });
      }
    );
  }

  traerInformacion() {
    return new Observable(() => {
      this.socket.on('ingreso', (data) => {
        console.log('data', data);
        this.historiales.unshift(data);
      });
    });
  }

  // emite al servidor EventName: apagar && data: Apagate
  emit(eventName: string, data: any) {
    console.log('EventName', eventName, 'data', data);
    this.socket.emit(eventName, data);
  }

  enviarMensaje(data: any) {
    this.socket.emit('mandar-mensaje', data);
  }


  escucharSala() {
    return this.socket
      .fromEvent('lectura');

  }

  /*  escucharSala() {
      return this.socket
          .fromEvent('sala');

  }*/
}
