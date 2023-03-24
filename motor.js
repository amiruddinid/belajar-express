const { Motor } = require('./app/models')

class MotorController {
    static records = [];
  
    constructor(params) {
      this.manufactur = params.manufactur;
      this.model = params.model;
      this.foto = params.foto;
      this.harga_sewa = params.harga_sewa;
    }

    static create(params) {
        const obj = new this(params);
        const result = Motor.create(obj)
    
        return result;
    }

    static list() {
        const result = Motor.findAll()
        return result;
    }

    static find(id) {
        const result = Motor.findByPk(id)
    
        return result;
    }
    
    static update(id, params) {
      const result = Motor.update(params, 
        {
          where:{
            id:id
          }
        }
      )
  
      return result;
    }
  
    static delete(id) {
      const result = Motor.destroy({
        where: { id:id }
      })

      return result
    }
  
  }
  
module.exports = MotorController;
  