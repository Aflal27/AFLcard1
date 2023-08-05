import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import {MDBDataTable} from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { userOrders as userOrdersActions } from '../../actions/orderActions'
import { Link } from 'react-router-dom'

export default function UserOrder() {
    const {userOrders = []} = useSelector(state => state.orderState)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(userOrdersActions)
    },[])
    const setOrders = ()=>{
        const data = {
            columns: [
                {
                    label: "Order ID",
                    field: 'id',
                    sort: "asc"
                },
                {
                    label: "Number of Items",
                    field: 'numOfItems',
                    sort: "asc"
                },
                {
                    label: "Amount",
                    field: 'amount',
                    sort: "asc"
                },
                {
                    label: "Status",
                    field: 'status',
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: 'actions',
                    sort: "asc"
                }
            ],
            rows:[]
        }
        userOrders.forEach(userOrder => {
            data.rows.push({
                id:userOrder._id,
                numOfItems:userOrder.orderItems.length,
                amount:`$${userOrder.totalPrice}`,
                status:userOrder.orderStatus && userOrder.orderStatus.includes('Delivered')?
                (<p style={{color:'green'}} > {userOrder.orderStatus} </p>):
                (<p style={{color:'red'}} > {userOrder.orderStatus} </p>),
                actions:<Link to={`/order/${userOrder._id}`} className='btn btn-primary' > 
                    <i className='fa fa-eye' ></i>
                 </Link>
                
            })
        });
        return data;
    }
  return (
    <Fragment>
        <MetaData title={'My Orders'} />
        <h1 className='mt-5' >MyOrders</h1>
        <MDBDataTable
            className='px-3'
            bordered
            striped
            hover
            data={setOrders()}
        />
    </Fragment>
  )
}