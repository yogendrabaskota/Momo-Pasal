const { default: axios } = require("axios")
const Order = require("../../../model/orderSchema")


exports.initiateKhaltiPayment = async(req,res)=>{
    const { orderId, amount} = req.body
    if(!orderId || !amount){
        return res.status(400).json({
            message : "PLease provide orderId and Amount"
        })
    }
    const data = {
        return_url : "http://localhost:3000/api/payment/success",
        purchase_order_id : orderId,
        amount : amount,
        website_url : "http://localhost:3000/",
        purchase_order_name : "orderName_" + orderId 

    }
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/",data,{
        headers : {
            'Authorization' : 'key 1bede2f3815e47eb98a472675e017104' 
        }
    })
    console.log(response.data)
    let order = await Order.findById(orderId)
    order.paymentDetails.pidx = response.data.pidx
    await order.save()
    res.redirect(response.data.payment_url)
    
}

exports.verifyPidx = async(req,res)=>{
    const pidx = req.query.pidx
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/",{pidx},{
        headers : {
            'Authorization' : 'key 1bede2f3815e47eb98a472675e017104' 
        }

    })
    if(response.data.status == 'Completed'){
        //database modification

        let order = await Order.find({'paymentDetails.pidx' : pidx})
        console.log(order)
        order[0].paymentDetails.method = 'Khalti'
        order[0].paymentDetails.status = 'paid'
        await order[0].save()



        //notify to success frontend
        res.redirect("http://localhost:3000")

    }else{
        //notify error to frontend
        res.redirect("http://localhost:3000/errorPage")

    }
}