const orderModel = require('../models/orderModel');

exports.createOrder = async(req,res,next)=>{

     const cartItems = req.body;
     const amount = Number(cartItems.reduce((acc,item)=>(acc + item.product.price* item.qty),0)) .toFixed(2);
     //console.log(amount,'AMOUNT')
     const status = 'pending';
    const order = await orderModel.create({cartItems,amount,status});
    //console.log(req.body, 'DATA');
   // orderModel.create()
    res.json({
        success:true,
        order
    })
}