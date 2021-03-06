/**
 * Sensor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre:{
      type: 'number'
    },
    descripcion: {
      type: 'string'
    },
    areaSensores: {
      collection:'areaSensor',
      via: 'idSensor'
    }
  },

};

