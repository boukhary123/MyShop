const functions = require('firebase-functions');
const secureCompare = require('secure-compare');


// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.UpdateDates = functions.https.onRequest((req, res) => {

  return admin.database().ref('/MyOrderList').once('value').then(function(snapshot) {  
	snapshot.forEach(function(ordersnap){
	var order=ordersnap.val();
	if(order.DeliveredToClient==="false" && Number(order.DaysFromOrder)<=15){
	var	neworder={
	"Image": order.Image,
	"Discription": order.Discription,
	"HighEndSeller": order.HighEndSeller,
	"MyPrice": order.MyPrice,
	"DeliveryFromSeller": order.DeliveryFromSeller,
	"Nameofclient": order.Nameofclient,
	"Address": order.Address,
	"DateOfOrder": order.DateOfOrder,
	"SellingPrice": order.SellingPrice,
    "DeliveredToMe": order.DeliveredToMe,
    "DeliveredToClient": order.DeliveredToClient,	
	"DaysFromOrder": (order.DaysFromOrder==="15")?"Late":(Number(order.DaysFromOrder)+1).toString(),
	"Profit": order.Profit
	};	
	var updates={};
	updates['/MyOrderList/'+ordersnap.key]=neworder;
	admin.database().ref().update(updates);
	}
	return;
  });
  return res.redirect(303, snapshot.ref);
});
});

