/**
 * RolUsuario.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    idRol:{
      model: 'rol',
      required: false
    },
    idUsuario: {
      model: 'usuario',
      required: false
    }

  },

};

