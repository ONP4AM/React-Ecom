const express = require('express');
const router = express.Router(); 
//middleware routes
const {authCheck} = require('../middlewares/auth');
const {adminCheck} = require('../middlewares/auth');
//controllers
const {createOrUpdateUser} = require('../controllers/auth');
const {currentUser} = require('../controllers/auth');
//router
router.post("/create-or-update-user",authCheck,createOrUpdateUser);
router.post("/current-user",authCheck,currentUser);
router.post("/current-admin",authCheck,adminCheck,currentUser);
  
module.exports = router;