import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ProductList from "../components/Dashboard/ProductManagement/ProductList";
const ProductManagementPage = () => {
    return (
      <DashboardLayout>
        <ProductList />
      </DashboardLayout>
    )
}
export default ProductManagementPage