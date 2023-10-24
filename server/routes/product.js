const express = require('express');
const router = express.Router(); 
//middleware routes
const {authCheck} = require('../middlewares/auth');
const {adminCheck} = require('../middlewares/auth');
//controllers
const {create,
        read,
        listAll,
        update,
        remove,
        list,
        productsCount,
        productStar,
        listRelated,
        searchFilters,
        } = require('../controllers/product');
//routes

router.post('/product',authCheck,adminCheck,create);
router.get('/products/total',productsCount);

router.get('/products/:count',listAll);//products/100
router.get('/product/:slug',read);
router.put('/product/:slug',authCheck,adminCheck,update);
router.delete('/product/:slug',authCheck,adminCheck,remove);


router.post('/products',list);
//ratings
router.put("/product/value/:productId",authCheck,productStar);
//related
router.get('/product/related/:productId',listRelated);
// search

router.post("/search/filters", searchFilters);

module.exports = router;