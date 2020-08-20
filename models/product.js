const mongoose = require('mongoose');

const arcticresiginationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        album: { type: String, required: true },
        image: {type: String, required: false},
        vinylColor: { type: String, required: true },
        price: {type: Number, required: false},
        inStock: Boolean,
        currentQuantity: {type: Number, required: true},
        description: {type: String, required: true},
    },
    {
    timestamps: true
    });

const Product = mongoose.model('Product', arcticresiginationSchema);

module.exports = Product;
