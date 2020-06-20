var express = require('express');
const cookieParser = require('cookie-parser');
var router = express.Router();

// Declaration datas vélos
var dataBikes = [
  {name:"BIKO45",price:679,image:"bike-1.jpg"},
  {name:"ZOOK7",price:799,image:"bike-2.jpg"},
  {name:"LIKO89",price:839,image:"bike-3.jpg"},
  {name:"GEWO8",price:1249,image:"bike-4.jpg"},
  {name:"KIWIT",price:899,image:"bike-5.jpg"},
  {name:"NASAY",price:1399,image:"bike-6.jpg"},
];
var dataCardBike = [];



 // ----------------------------------------->
// Aller sur la page index "/"

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',dataBikes });
});

 // Aller sur la page index "/"
// ----------------------------------------->

// ----------------------------------------->
// changement de quantité d'un produit du panier

router.post('/update', function(req,res,next){

  console.log(req.body);
  
  dataCardBike.forEach(article => {
    if (article.name == req.body.name){
      article.quantity = req.body.quantity;
    }
  });

 // ----------------------------------------->
// Sommes du panier
var totalCardBike = 0

dataCardBike.forEach(article => {
  
  console.log("console.log() dans sommes du panier de article"+article);
  totalCardBike += article.price*article.quantity;
  
});
// Sommes du panier 
// ----------------------------------------->

res.render('shop', { title: 'Express',dataCardBike,totalCardBike });;
});

// changement de quantité d'un produit du panier
// ----------------------------------------->



// ----------------------------------------->
// Ajout du produit selectionné dans le panier 
router.post('/shop', function(req, res, next) {
  
  var newproduct = req.body
  
  // Check si le produit qu'on ajoute est en doublons
  var doublons = false;
  
  dataCardBike.forEach(product =>{
    //Si c'est le cas alors informer la mechanique que ça l'est et ajouter +1 en quantité
    if(product.name == newproduct.name){
      doublons = true;
      product.quantity+=1
    }
  });
  
  // Si ça n'est pas le cas récuperer les informations concernant le produit dans la liste d'objet databikes
  
  if(!doublons){
    
    dataBikes.forEach(product=>{
      if(product.name == newproduct.name){
        
        var addproduct = {}
        addproduct.name = product.name;
        addproduct.image = product.image;
        addproduct.price = product.price;
        addproduct.quantity = 1;
        
        dataCardBike.push(addproduct)
        addedproduct = true;
      }
    });
  }
  
   // Ajout du produit selectionné dans le panier 
  // ----------------------------------------->

// ----------------------------------------->
// Sommes du panier
var totalCardBike = 0

dataCardBike.forEach(article => {
  totalCardBike += article.price*article.quantity;
  
});
// Sommes du panier 
// ----------------------------------------->

res.render('shop', { title: 'Express',dataCardBike,totalCardBike });
});

// ----------------------------------------->
// Supprimer un Vélo du panier

router.get('/remove',function(req, res, next){

for (var i=0;i<dataCardBike.length;i++){
 if(req.query.removed==dataCardBike[i].name){
   dataCardBike.splice(i,1);
 }
}

// ----------------------------------------->
// Sommes du panier
var totalCardBike = 0;

dataCardBike.forEach(article => {
 totalCardBike += article.price*article.quantity;
});
// Sommes du panier 
// ----------------------------------------->

res.render('shop', { title: 'Express',dataCardBike,totalCardBike });

});
// Supprimer un Vélo du panier
// ----------------------------------------->
module.exports = router;
