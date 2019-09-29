const express = require('express');
const products = require('./db/products/all-products.json');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4040;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('GET request to homepage !!!');
});

app.get('/products', (req, res) => {
  res.status(200).json(products);
});

app.get('/products', (req, res) => {
  const category = req.query.category;

  if (category) {
    const categoryProducts = {
      items: products.filter(product =>
        product.categories.join().include(category),
      ),
    };
    res.status(200).json(categoryProducts);
  } else {
    res.status(400).json('Something wrong !!!');
  }
});

app.get('/products/:id', (req, res) => {
  const finedProduct = {
    order: products.find(product => product.id === Number(req.params.id)),
  };
  res.status(200).json(finedProduct);
});

app.use((req, res, next) => {
  const err = new Error('Not found !!!');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send('Error');
});

app.listen(PORT, () => {
  console.log('Port is listenning on port ' + PORT);
});