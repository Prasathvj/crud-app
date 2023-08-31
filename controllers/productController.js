const Product = require("../models.js/productModel");
const APIFeatures = require("../utils/apifeatures");


//get all products
exports.getAllProducts = async(req, res)=>{
    const resPerPage = 4;
    const apiFeatures= new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    
    try {
        const data = await apiFeatures.query;
        if(!data){
            return res.status(400).json({message:'product find failed'})
        }
        res.status(200).json({
            message:'product load success',
            count: data.length,
            data})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error",error })
    }
}
exports.getSingleProduct = async(req, res)=>{
    try {
        const data = await Product.findById(
            {_id:req.params.id}
        )
        if(!data){
            return res.status(400).json({message:'error accuring in finding product'})
        }
        res.status(200).json({
            message:'product find success',
            data
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error",error })
    }
}

//create new product
exports.createProduct=async(req,res)=>{
    try {
        const data = await Product.create(req.body)
        if (!data) {
            return res.status(400).json({ message: "Product created failed" })
        }
        res.status(200).json({ message: "Product created Successfully", data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
    
}

exports.updateProduct = async(req, res)=>{
    try {
        const data = await Product.findByIdAndUpdate(
            {_id:req.params.id},
            {$set:req.body},
            {new:true}
        )
        if(!data){
            return res.status(400).json({message:'product Update failed'})
        }
        res.status(200).json({message:'Product updated successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.deleteProduct = async(req, res)=>{
    try {
        const data = await Product.findByIdAndDelete(
            {_id:req.params.id}
        )
        if(!data){
            return res.status(400).json({message:'Product delete failed'})
        }
        res.status(200).json({message:'Product deleted successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}
