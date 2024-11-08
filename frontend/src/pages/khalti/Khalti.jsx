import React from 'react'

const Khalti = () => {

    const queryParams = new URLSearchParams(location.search)
    const totalAmount = queryParams.get("totalamount")
    const orderId = queryParams.get("orderid")
    //console.log(totalAmount,orderId)




  return (
    <div>Khalti</div>
  )
}

export default Khalti