let express = require('express');
let router = express.Router();
let mongoose = require("mongoose");

let PriceCard = require('../models/pricecard.js');
let Template = require('../models/template.js');


mongoose.connect('mongodb://localhost:27017/priceCardMaker', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
// mongoose.set('useUnifiedTopology',true);

/* GET all previous priceCards that are saved */
router.get('/api/pricecards', function (req, res, next) {
    PriceCard.find().exec().then((data) => {
        try {
            res.json(data);
        } catch (e) {
            throw e
        }
    })
});

/*Get one priceCard*/
router.get('/api/pricecards/:id', function (req, res, next) {
    PriceCard.findById(req.params.id, function (err, data) {
        res.json(data);
    })
});

/*Post pricecard to save*/
router.post('/api/pricecards', function (req, res, next) {
    let newPriceCard = new PriceCard(
        req.body
    );
    newPriceCard.save().then((err, result) => {
        if (err) throw err;
    });
    res.json({succes: true, message: "PriceCard saved successfully"})

});

/*Delete a priceCard*/
router.delete('/api/pricecards/:id', function (req, res, next) {
    PriceCard.findByIdAndDelete({_id: req.params.id}, function (err, result) {
        if (err) throw err;
        if (result) {
            res.json({success: true, message: "Deleted successfully"})
        }
    })
});

/*Delete all priceCards*/
// TODO: make this function
router.delete('/api/pricecards/delete', function (req, res, next) {

});

/*Get templates*/
router.get('/api/templates', function (req, res, next) {
    Template.find().exec().then((data) => {
        try {
            res.json(data);
        } catch (e) {
            throw e
        }
    })
});

/*Post template to save*/
router.post('/api/templates', function (req, res, next) {
    let newPriceCard = new Template(
        req.body
    );
    newPriceCard.save().then((err, result) => {
        if (err) throw err;
    });
    res.json({success: true, message: "Template saved successfully"})
});

router.get('/api/templates/:id', function (req, res, next) {
    Template.findById(req.params.id, function (err, data) {
        res.json(data);
    })
});

router.delete('/api/templates/:id', function (req, res, next) {
    Template.findByIdAndDelete({_id: req.params.id}, function (err, result) {
        if (err) throw err;
        if (result) {
            res.json({success: true, message: "Deleted successfully"})
        }
    })
});


module.exports = router;
