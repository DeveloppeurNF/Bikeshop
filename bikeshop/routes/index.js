var express = require('express');
var router = express.Router();

var dataBikes = [
  {name:"BIKO45",price:679,image:"bike-1.jpg"},
  {name:"ZOOK7",price:799,image:"bike-2.jpg"},
  {name:"LIKO89",price:839,image:"bike-3.jpg"},
  {name:"GEWO8",price:1249,image:"bike-4.jpg"},
  {name:"KIWIT",price:899,image:"bike-5.jpg"},
  {name:"NASAY",price:1399,image:"bike-6.jpg"},
];
var dataCardBike = [
  {name:"BIKO45",price:679,image:"bike-1.jpg",quantity:3},
  {name:"ZOOK7",price:799,image:"bike-2.jpg",quantity:1},
];

 var totalCardBike = 0
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',dataBikes });
});

router.get('/shop', function(req, res, next) {

  for (var i = 0; i<dataCardBike.length;i++){
    totalCardBike += dataCardBike[i].price*dataCardBike[i].quantity
  }

  res.render('shop', { title: 'Express',dataCardBike,totalCardBike });
});

module.exports = router;
