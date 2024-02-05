import React from "react";
import OrderList from "../components/Dashboard/OrderManagement/OrderList";
import DashboardLayout from "../layouts/DashboardLayout";

const OrderManagementPage = () => {
 
    return (
      <DashboardLayout>
        <OrderList />
      </DashboardLayout>
    )
}
export default OrderManagementPage