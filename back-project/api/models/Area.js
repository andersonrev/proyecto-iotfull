/**
 * Area.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: {
      type: 'string'
    },
    descripcion: {
      type: 'string'
    },
    piso: {
      type: 'number'
    },
    idEdificio: {
      model:'edificio',
      required: true

    },
    areaSensores: {
      collection: 'areaSensor',
      via: 'idArea'
    }
  },

};

