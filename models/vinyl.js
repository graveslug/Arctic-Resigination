//============================
//  Band Submission Schema  //
//============================
//The order of operations truthy and falsey form inputs for what is accepted into MongoDb

const mongoose = require('mongoose');

const vinylSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        album: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        vinylColor: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: false
        },
        inStock: Boolean,

        currentQuantity: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
    },
    {
    timestamps: true
    })

const Vinyl = mongoose.model('Vinyl', vinylSchema)

module.exports = Vinyl
