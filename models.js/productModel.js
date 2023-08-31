const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter the product name'],
        trim:true,
        maxLength:[100,'Product name cannot exceed 100 characters']
    },
    price:{
        type:Number,
        required:true,
        default:0.0
    },
    ratings:{
        type:String,
        default:0
    },
    images:[
        {
            image:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,'Please enter product category'],
        enum:{
            values:[
                'Rice',
                'Pizza',
                'Burger',
                'cake',
                'Chicken',
                'Coffee',
                'Seafood',
                'Beverages',
                'Desserts',
                'Snacks',
                'Salads'
            ],
            message:'Please select correct category'
        }
    },
    seller:{
        type:String,
        required:[true, 'Please enter product seller']
    },
    stock:{
        type:String,
        required:[true,'Please enter product stock'],
        maxLength:[20, 'Product stack cannot exceed 20']
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            // user:{
            //     type:mongoose.Schema.Types.ObjectId,
            //     ref:'User'
            // },
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    // user:{
    //     type:mongoose.Schema.Types.ObjectId
    // },
    createdAt:{
        type:Date,
        default:Date.now()
    }

});

let Product = mongoose.model('Product', productSchema)

module.exports = Product;