var admin = require("firebase-admin");

var serviceAccount = require("../config/firbaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL:"https://*.firebaseio.com"
});


module.exports = admin;
