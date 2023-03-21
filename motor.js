const { Motor } = require('./models')

class Motors {
    static records = [];
  
    constructor(params) {
      this.manufactur = params.manufactur;
      this.model = params.model;
      this.foto = params.foto;
      this.harga_sewa = params.harga_sewa;
    }

    static create(params) {
        const motor = new this(params);
        const result = Motor.create(motor)
    
        return result;
    }

    static list() {
        const result = Motor.findAll()
        return result;
    }
    
    update(params) {
      const idx = this.constructor.records.findIndex((i) => i.id === this.id);
  
      params.title && (this.title = params.title);
      params.coverImage && (this.coverImage = params.coverImage);
      params.synopsis && (this.synopsis = params.synopsis);
      params.publisher && (this.publisher = params.publisher);
      params.author && (this.author = params.author);
      params.price && (this.price = params.price);
  
      this.constructor.records[idx] = this;
  
      return this;
    }
  
    delete() {
      this.constructor.records = this.constructor.records.filter(
        (i) => i.id !== this.id
      );
    }
  
    
  
    static find(id) {
      const book = this.records.find((i) => i.id === Number(id));
      if (!book) return null;
  
      return book;
    }
  
    
  }
  
module.exports = Motors;
  