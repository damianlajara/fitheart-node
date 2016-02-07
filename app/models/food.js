'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodSchema = new Schema({
    category: { type: String, trim: true, default: ''},
    ndbId: Number,
    name: { type: String, trim: true, default: '' },
    nutrients: [
        {
            nutrient_id: Number,
            name: { type: String, trim: true, default: '' },
            group: { type: String, trim: true, default: '' },
            unit: { type: String, trim: true, default: '' },
            value: Number,
            measures: [
                {
                    label: { type: String, trim: true, default: '' }, // measurement
                    eqv: Number, // Label value in grams
                    qty: Number, // servings
                    value: Number // amount
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Food', foodSchema);

// Sample nutrient layout
//nutrients: [
//    {
//        "nutrient_id": 255,
//        "name": "Water",
//        "group": "Proximates",
//        "unit": "g",
//        "value": 15.87,
//        "sourcecode": "",
//        "dp": 522,
//        "se": "0.061",
//        "measures": [
//            {
//                "userDefined" : false // Users may input their own foods
//                "label": "pat (1\" sq, 1/3\" high)",
//                "eqv": 5.0,
//                "qty": 1.0,
//                "value": 0.79
//            },
//            {
//                "label": "tbsp",
//                "eqv": 14.2,
//                "qty": 1.0,
//                "value": 2.25
//            },
//            {
//                "label": "cup",
//                "eqv": 227.0,
//                "qty": 1.0,
//                "value": 36.02
//            },
//            {
//                "label": "stick",
//                "eqv": 113.0,
//                "qty": 1.0,
//                "value": 17.93
//            }
//        ]
//    },
//]