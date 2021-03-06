/**
 * AreaSensor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    estado: {
      type: 'number'
    },
    idArea: {
      model: 'area',
      required: false
    },
    idSensor: {
      model:'sensor',
      required: false
    },
    usuariosAreaSensor: {
      collection: 'usuarioAreaSensor',
      via: 'idAreaSensor'
    }
  },

};

