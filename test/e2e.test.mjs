import request from 'supertest';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const app = require('../index.js');

describe('Suite de pruebas E2E', () => {
  it('Debería responder con "Hola Carlos" en la ruta raíz', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Hola Carlos')
      .end(done);
  });
});

describe('Inserte el nombre, precio y categoría', () => {
  it('Debería crear un nuevo producto', (done) => {
    const newProduct = {
      name: 'Producto de prueba',
      price: 19,
      category: 'Categoría de prueba'
    };

    request(app)
      .post('/api/v1/products')
      .send(newProduct)
      .expect(201)
      .expect((res) => {
        if (!res.body.data.id) throw new Error('Falta el ID del producto');
        if (res.body.data.name !== newProduct.name) throw new Error('El nombre del producto no coincide');
        if (res.body.data.price !== newProduct.price) throw new Error('El precio del producto no coincide');
        if (res.body.data.category !== newProduct.category) throw new Error('La categoría del producto no coincide');
      })
      .end(done);
  });
});