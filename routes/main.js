// Create a new router
const express = require("express");
const router = express.Router();

var shopData = {shopName: "Sip",
                productCategories:["Beer", "Wine", "Soft Drinks", "Hot Drinks"]
};

var shops = [
  {
    location: "Regent Street, London",
    manager: "Alice Johnson",
    address: "123 Regent Street, London W1B 2EL"
  },
  {
    location: "Manchester",
    manager: "James O'Connor",
    address: "45 Market Street, Manchester M1 1WR"
  },
  {
    location: "Birmingham",
    manager: "Sophie Lee",
    address: "78 New Street, Birmingham B2 4DU"
  }
];

// Handle the main routes

router.get("/", (req, res) => {
    res.render("index.ejs", shopData)
}); 

router.get("/about", (req, res) => {
    res.render("about.ejs", { shopName: shopData.shopName, shops: shops })
}); 

router.get("/search", (req, res) => {
    res.render("search.ejs", shopData)
}); 

router.get('/search_result', function (req, res) {
    // TODO: search in the database
    res.send("You searched for " + req.query.search_text + " in " + req.query.category);
 });

router.get("/register", (req,res) => {
    res.render("register.ejs",  shopData); 
}); 
 
router.post("/registered", (req,res) => { 
    res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered! We will send an email to you at: ' + req.body.email);
}); 

router.get('/survey', (req, res) => {
    const drinksCategories = shopData.productCategories;
    res.render('survey.ejs', { 
        drinksCategories,
        shopName: shopData.shopName  // <-- add this
    });
});


router.post('/survey', (req, res) => {
    const { firstName, surname, email, age, drinkCategory, student } = req.body;

    const surveyData = {
        firstName,
        surname,
        email,
        age,
        drinkCategory,
        student: student === 'on' ? 'Yes' : 'No'
    };

    res.render('surveyResult.ejs', { 
        surveyData,
        shopName: shopData.shopName // <-- add this
    });
});

// Export the router object so index.js can access it
module.exports = router;

