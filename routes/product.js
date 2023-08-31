const express = require('express');
const { createProduct, updateProduct, getAllProducts } = require('../controllers/productController');
const { authentication, adminOnly } = require('../middlewares/authendication');

const router = express.Router();

router.get('/all',authentication,getAllProducts)
router.post('/add',authentication,adminOnly,createProduct)
router.put('/edit/:id',updateProduct)


module.exports = router;