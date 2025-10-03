const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const products = require('./data/products.json')

const app = express()
app.use(cors())
app.use(bodyParser.json())

let orders = []

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const p = products.find(x=>x.id===req.params.id)
  if(!p) return res.status(404).json({error:'Not found'})
  res.json(p)
})

app.post('/api/orders', (req, res) => {
  const { customer, items, total } = req.body
  if(!customer || !items) return res.status(400).json({error:'Invalid'})
  const order = { id: 'ORD-'+Date.now(), date: new Date().toISOString(), customer, items, total }
  orders.push(order)
  res.status(201).json(order)
})

app.get('/api/orders', (req, res)=> res.json(orders))

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> console.log('Backend escuchando en', PORT))
