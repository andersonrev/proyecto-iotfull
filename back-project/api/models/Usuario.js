/**
 * Usuario.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: {
      type: 'string'
    },
    apellido: {
      type: 'string'
    },
    telefono: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    habilitado: {
      type: 'number'
    },
    rolesUsuario: {
      collection: 'rolUsuario',
      via: 'idUsuario'
    },
    usuariosAreaSensor: {
      collection: 'usuarioAreaSensor',
      via: 'idUsuario'
    }
  },

};

