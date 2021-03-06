/**
 * UsuarioAreaSensor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    idAreaSensor: {
      model: 'areaSensor',
      required: false
    },
    idUsuario: {
      model: 'usuario',
      required: false
    },
    logsHistorial: {
      collection: 'logHistorial',
      via: 'idUsuarioAreaSensor'
    }
  },

};

