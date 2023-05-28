const server = require('./app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('User Endpoints', () => {

  it('GET /user should show all users', async () => {
    const res = await requestWithSupertest.get('/api/users');
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toHaveProperty('users')
      expect(res.body.users.length > 0)
      expect(res.body.users[0]).toHaveProperty('id')
      expect(res.body.users[0]).toHaveProperty('first_name')
      expect(res.body.users[0]).toHaveProperty('login')
      expect(res.body.users[0]).toHaveProperty('code')
  });

  it('GET /supplier should show all suppliers', async () => {
    const res = await requestWithSupertest.get('/api/suppliers');
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toHaveProperty('suppliers')
      expect(res.body.suppliers.length > 0)
      expect(res.body.suppliers[0]).toHaveProperty('id')
      expect(res.body.suppliers[0]).toHaveProperty('label')
      expect(res.body.suppliers[0]).toHaveProperty('address')
      expect(res.body.suppliers[0]).toHaveProperty('phone_number')
  });

  it('GET /client should show all clients', async () => {
    const res = await requestWithSupertest.get('/api/clients');
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toHaveProperty('clients')
      expect(res.body.clients.length > 0)
      expect(res.body.clients[0]).toHaveProperty('id')
      expect(res.body.clients[0]).toHaveProperty('label')
  });

  it('GET /product should show all products', async () => {
    const res = await requestWithSupertest.get('/api/products');
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toHaveProperty('products')
      expect(res.body.products.length > 0)
      expect(res.body.products[0]).toHaveProperty('id')
      expect(res.body.products[0]).toHaveProperty('label')
      expect(res.body.products[0]).toHaveProperty('price')
      expect(res.body.products[0]).toHaveProperty('amount')
  });

  it('GET /order should show all orders', async () => {
    const res = await requestWithSupertest.get('/api/orders');
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toHaveProperty('orders')
      expect(res.body.orders.length > 0)
      expect(res.body.orders[0]).toHaveProperty('id')
      expect(res.body.orders[0]).toHaveProperty('order_label')
      expect(res.body.orders[0]).toHaveProperty('client_label')
      expect(res.body.orders[0]).toHaveProperty('date')
      expect(res.body.orders[0]).toHaveProperty('status')
      expect(res.body.orders[0]).toHaveProperty('amount')
  });

  it('GET /supplier should show all suppliers', async () => {
    const res = await requestWithSupertest.get('/api/suppliers');
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toHaveProperty('suppliers')
      expect(res.body.suppliers.length > 0)
      expect(res.body.suppliers[0]).toHaveProperty('id')
      expect(res.body.suppliers[0]).toHaveProperty('label')
      expect(res.body.suppliers[0]).toHaveProperty('address')
      expect(res.body.suppliers[0]).toHaveProperty('phone_number')
  });

  it('GET /delivery item should show all delivery items', async () => {
    const res = await requestWithSupertest.get('/api/delivery_items');
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toHaveProperty('delivery_items')
      expect(res.body.delivery_items.length > 0)
      expect(res.body.delivery_items[0]).toHaveProperty('id')
      expect(res.body.delivery_items[0]).toHaveProperty('address')
      expect(res.body.delivery_items[0]).toHaveProperty('delivery_id')
      expect(res.body.delivery_items[0]).toHaveProperty('products_label')
      expect(res.body.delivery_items[0]).toHaveProperty('amount')
      expect(res.body.delivery_items[0]).toHaveProperty('summa')
  });

    
  
});