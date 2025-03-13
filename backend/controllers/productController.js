const ProductModel = require('../models/productModel');

// to use await async is used
//get products api---api/v1/product
exports.getProducts = async (req,res,next)=>{
   const query=req.query.keyword?{name:{
    $regex:req.query.keyword,
    $options: 'i' //no case sensitive

   }}:{}//else every produts will be displayed
    const products = await ProductModel.find(query);
    
    res.json({
        success:true,
        products
    })
}
//get single products api---api/v1/product/:id

exports.getSingleProduct = async(req,res,next)=>{
  console.log(req.params.id  ,'ID') //to get the id
  try{
    const product = await ProductModel.findById(req.params.id);
    res.json({
        success:true,
        product
    })
  }
  catch(error)
  {
    res.status(404).json({
        success:false,
        //message:error.message
        message:'Unable to get the product with that ID'
    })
  }
   
}