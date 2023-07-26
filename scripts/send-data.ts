import json from '../data/data.json'  assert { type: 'json'}  
import { addProduct } from '../db/index.ts'

json.forEach(item => {
const product = {
    code: item.CODIGO.toUpperCase(),
    name: item.DESCRIPCION,
    size: item.MEDIDA,
    price: parseInt(String(item.PRECIO)),
    cost: parseInt(String(item.COSTO))
  }
  addProduct(product)
})

