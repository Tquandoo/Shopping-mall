import React, { useEffect, useState } from "react";
import { MdReadMore } from "react-icons/md";
import { formatCurrency } from "../../../helper/helper";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderListThunkAction } from "../../../redux-toolkit/orderSlice";
import { orderListSelector, orderLoadingSelector } from "../../../store/selectors";

import dayjs from "dayjs";

const OrderList = () => {
  const [ selectOrder, setSelectOrder] = useState(null)
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrderListThunkAction())
  },[])
  const orderList = useSelector(orderListSelector) 
  const loading = useSelector(orderLoadingSelector)

  // console.log('orderList', orderList);
  return (
    <div className="container">
      <div className="row">
          <div className={`${selectOrder ? 'col-md-7' : 'col-md-12'}`}> 
              <h5>Order Management</h5>
              {
                loading === 'loading' ? <p>Loading...</p> : (
                  <table className="table table-striped order-table">
                  <thead>
                    <tr>
                      <th className="text-end align-middle">Order Date</th>
                      <th className="text-end align-middle">Total Product</th>
                      <th className="text-end align-middle">Subtotal</th>
                      <th className="text-end align-middle">Shipping</th>
                      <th className="text-end align-middle">Total amount</th>
                      <th className="text-end align-middle">Status</th>
                      <th className="text-center align-middle">Customer Name</th>
                      <th className="text-end align-middle">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orderList?.map((order) => (
                        <tr key={order.id}>
                            <td className="text-end align-middle">{dayjs(Date(order.cartInfo.orderDate)).format('MMM DD YYYY')}</td>
                            <td className="text-end align-middle">
                              {order.cartDetails.length}
                            </td>
                            <td className="text-end align-middle">
                              {formatCurrency(order?.cartInfo?.subtotal)}
                            </td>
                            <td className="text-end align-middle">
                              {`${order?.cartInfo?.shipping ? order?.cartInfo?.shipping : 'Free'}`}
                            </td>
                            <td className="text-end align-middle">
                            {formatCurrency(order?.cartInfo?.total)}
                            </td>
                            <td className="text-end align-middle">
                              <span className="badge bg-secondary">
                                {order?.cartInfo?.status}
                              </span>
                            </td>
                            <td className="text-center align-middle">
                              {order?.customerInfo?.fullname} 
                            </td>
                            <td className="text-end align-middle">
                              <MdReadMore size={22} color="green" role='button'
                                onClick={() => setSelectOrder(order)}
                              />
                            </td> 
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                )
              }
          </div>
          {
            selectOrder && 
            <div className="col-lg-5 border p-2 rounded">
              <div className="d-flex align-items-center justify-content-between border-bottom">
                <h5>Order details</h5>
                <span role="button" className="btn-close" onClick={() => setSelectOrder(null)}></span>
              </div>
              <div className="my-3 border-bottom">
                <h6>Order Information</h6>
                <div className="d-flex  justify-content-between  mb-2">
                    <span>Subtotal</span>
                    <span className="fw-bolder">{formatCurrency(selectOrder?.cartInfo?.subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shopping</span>
                  <span className="fw-bolder"> 
                    {`${selectOrder?.cartInfo?.shipping ? '$'+ selectOrder?.cartInfo?.shipping : 'Free'} `}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Total</span>
                  <span>
                  <span className="fw-bolder">{formatCurrency(selectOrder?.cartInfo?.total)}</span>
                  </span>
                </div>
              </div>

              <div className="my-4 border-bottom">
              <h6>Customer Information</h6>
                  <div className="d-flex justify-content-between mb-2">
                      <span>Fullname</span>
                      <span className="fw-bolder">
                        {selectOrder?.customerInfo?.fullname}
                      </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                      <span>Email</span>
                      <span className="fw-bolder">
                          {selectOrder?.customerInfo?.email}
                      </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                      <span>Mobile</span>
                      <span className="fw-bolder">
                          {selectOrder?.customerInfo?.mobile}
                      </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                      <span>Address</span>
                      <span className="fw-bolder">
                          {selectOrder?.customerInfo?.address}
                      </span>
                  </div>
              </div>

              <div className="my-4">
                  <h6>Order detail</h6>
                  <table className="table table-striped">
                      <tbody>
                          {
                            selectOrder?.cartDetails?.map((orderItem) => (
                              <tr key={orderItem.id}>
                                    <td style={{width: "250px"}}>
                                          <div className="d-flex align-items-center">
                                              <img style={{width: '50px'}} className="me-2" src={orderItem?.images[0]}/>
                                              {orderItem?.title}
                                          </div>
                                    </td>
                                    <td className="text-end align-middle">{orderItem?.quantity}</td>
                                    <td className="text-end align-middle">{formatCurrency(orderItem?.newPrice)}</td>
                                    <td className="text-end align-middle">{formatCurrency(orderItem?.amount)}</td>
                              </tr>
                            ))
                          }
                      </tbody>
                  </table>
              </div>
            </div>
          }
      </div>
    </div>
  )
}
export default OrderList