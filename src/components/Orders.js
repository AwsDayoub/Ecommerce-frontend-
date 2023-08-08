import React from "react"

export default function Orders({ orders }){
    console.log(orders)
    return (
        <>
            <div class="orders">
            <table>
                <thead>
                <tr>
                    <th>Order </th>
                    <th>Customer Name</th>
                    <th>Customer Address</th>
                    <th>Cost ($)</th>
                    <th>View Details</th>
                </tr>
                </thead>
                <tbody>
                {
                orders.map(order => (
                    <tr>
                        <td>{order.order_num}</td>
                        <td>{order.customer_name}</td>
                        <td>{order.customer_address}</td>
                        <td>${order.cost}</td>
                        <td><button class="view-details-btn">View</button></td>
                    </tr>
                  ))
                }
                </tbody>
            </table>
            </div>
        </>
    )
}