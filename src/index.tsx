import { createServer, Model } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

createServer({
  models: {
    transaction: Model
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance Site',
          amount: 2000,
          type: 'deposit',
          category: 'Dev',
          createdAt: new Date('2022-02-12 09:00:00')
        },
        {
          id: 2,
          title: 'Market',
          amount: 400,
          type: 'withdraw',
          category: 'Food',
          createdAt: new Date('2022-02-14 09:00:00')
        },
      ]
    })
  },
  routes() {
    this.namespace = 'api';

    this.get('/transactions', (schema) => this.schema.all('transaction'))

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);