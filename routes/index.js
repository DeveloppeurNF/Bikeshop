var express = require('express');
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



 // ----------------------------------------->
// Aller sur la page index "/"

router.get('/', function(req, res, next) {

  // Création du panier par session
  if(req.session.dataCardBike == undefined){
    req.session.dataCardBike = []
    }

  res.render('index', { title: 'Express',dataBikes,dataCardBike:req.session.dataCardBike });
});

 // Aller sur la page index "/"
// ----------------------------------------->

// ----------------------------------------->
// changement de quantité d'un produit du panier

router.post('/update', function(req,res,next){

  req.session.body = req.body;
// Regex sur l'input pour y trouver un charactère n'étant pas un Nombre
  const checkanystring = /\D/g.test(req.session.body.quantity);

  req.session.dataCardBike.forEach(article => {
    if (req.session.body.quantity < 1 || checkanystring === true ){

      console.log("Saisie invalide");
      console.log("Voici les informations de l'utilisateurs qui trifouille de trop");
      console.log(req)

    }else{

      if (article.name == req.session.body.name){

        article.quantity = parseInt(req.session.body.quantity);
        // récupère la donné du front et la transforme en nombre pour définir la nouvelle quantité.
      }
    }
  });

 // ----------------------------------------->
// Sommes du panier
req.session.totalCardBike = 0;

req.session.dataCardBike.forEach(article => {
  
  req.session.totalCardBike += article.price*article.quantity;
  
});
// Sommes du panier 
// ----------------------------------------->

res.render('shop', { title: 'Express',dataCardBike: req.session.dataCardBike,totalCardBike: req.session.totalCardBike });;
});

// changement de quantité d'un produit du panier
// ----------------------------------------->

 // ----------------------------------------->
// Création d'un accès au panier sans ajouter de produit
router.get('/shop', function(req, res, next){
  res.render('shop',{title: 'Express',dataCardBike:req.session.dataCardBike,totalCardBike: req.session.totalCardBike })
});
 // Création d'un accès au panier sans ajouter de produit
// ----------------------------------------->

// ----------------------------------------->
// Ajout du produit selectionné dans le panier 
router.post('/shop', function(req, res, next) {

  req.session.body = req.body;
  var newproduct = req.session.body;
  
  // Check si le produit qu'on ajoute est en doublons
  var doublons = false;
  
  req.session.dataCardBike.forEach(product =>{
    //Si c'est le cas alors informer la mechanique que ça l'est et ajouter +1 en quantité
    if(product.name == newproduct.name){
      doublons = true;
      product.quantity+=1;
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
        
        req.session.dataCardBike.push(addproduct);
        addedproduct = true;
      }
    });
  }
  
   // Ajout du produit selectionné dans le panier 
  // ----------------------------------------->

// ----------------------------------------->
// Sommes du panier
req.session.totalCardBike = 0

req.session.dataCardBike.forEach(article => {
  req.session.totalCardBike += article.price*article.quantity;
  
});
// Sommes du panier 
// ----------------------------------------->

res.render('shop', { title: 'Express',dataCardBike :req.session.dataCardBike,totalCardBike:req.session.totalCardBike });
});

// ----------------------------------------->
// Supprimer un Vélo du panier

router.get('/remove',function(req, res, next){

req.session.query = req.query;

for (var i=0;i<req.session.dataCardBike.length;i++){
 if(req.query.removed==req.session.dataCardBike[i].name){
  req.session.dataCardBike.splice(i,1);
 }
}

// ----------------------------------------->
// Sommes du panier
req.session.totalCardBike = 0;

req.session.dataCardBike.forEach(article => {
  req.session.totalCardBike += article.price*article.quantity;
});
// Sommes du panier 
// ----------------------------------------->

res.render('shop', { title: 'Express',dataCardBike:req.session.dataCardBike,totalCardBike: req.session.totalCardBike });

});
// Supprimer un Vélo du panier
// ----------------------------------------->
module.exports = router;
