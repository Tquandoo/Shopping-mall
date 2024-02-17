import React, { useEffect, useState } from "react"
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { addNewProductThunkAction, fetchDataThunkAction } from "../../../redux-toolkit/productsSlice"
import { productsSelector } from "../../../store/selectors"
import { priceAfterDiscount } from "../../../helper/helper"
import GenerateStar from "../../Star/GenerateStar"
import useFetchResource from "../../../custom-hooks/useFetchResource"
import { CATEGORY_API_URL, companyList } from "../../../services/common"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify";


var limit = 16
const schema = yup.object({
  title: yup.string().required(),
  newPrice: yup.number().positive().required().typeError('price is required field'),
  category: yup.string().required(),
  company: yup.string().required(),
  img: yup.string().required()
})

const ProductList = () => {
  
  const [openAddProductArea, setOpenAddProductArea] = useState(false)
  const dispatch = useDispatch()
  const productList =  useSelector(productsSelector)
  useEffect(() => {
    dispatch(fetchDataThunkAction(limit))
  },[])

  const categoryList = useFetchResource(CATEGORY_API_URL)
  const { register, handleSubmit, reset, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  const handleAddNewProduct = (data) => {
    console.log('data', data);
      let newProduct = {
        ...data,
        prevPrice: 0,
        rating: 0,
      }
      dispatch(addNewProductThunkAction(newProduct))
      reset()
      toast.success('Product added success!')
  }
  const handleCloseAddProductArea = () => {
    setOpenAddProductArea(false)
    reset()
  }

  return (
    <div className="container">
        <div className="row product-title">
          <div className="col-lg-12 d-flex align-items-center justify-content-between">
            <h5>Product List Management</h5>
            <button className="btn btn-warning btn-sm d-flex align-items-center"
              onClick={() => setOpenAddProductArea(true)}
            >
              <FaPlus size={15} className="me-2"/>
              Add New Product
            </button>
          </div>
        </div>
        {
          openAddProductArea && (
            <div className="product-form my-1">
            <form onSubmit={handleSubmit(handleAddNewProduct)} className="row">
              <div className="col-md-4">
                  <div className="form-group mb-2">
                      <label className="form-label">Title</label>
                      <input
                       type="text"
                       className={`form-control form-control-sm ${errors?.title?.message ? 'is-invalid' : ''}`}
                       placeholder="Title"
                       {...register('title')}
                      />
                       <span className="invalid-feedback">{errors?.title?.message}</span>
                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label">Price</label>
                        <input
                           type="text"
                           className={`form-control form-control-sm ${errors?.newPrice?.message ? 'is-invalid' : ''}`}
                           placeholder="Price"
                          {...register('newPrice')}
                        />
                     <span className="invalid-feedback">{errors?.newPrice?.message}</span>
                  </div>
                  <div className="form-group mb-2">
                      <div className="d-flex">
                          <button type="submit" className="btn btn-success btn-sm flex-grow-1 me-2 d-flex align-items-center justify-content-center">
                              <FaPlus className="me-2" />
                              Add
                          </button>
                          <button type="button"
                            onClick = {handleCloseAddProductArea}
                            className="btn btn-dark btn-sm flex-grow-1 d-flex align-items-center justify-content-center"
                          >
                            <FaTimes className="me-2" />
                            Close
                          </button>
                      </div>
                  </div>
                </div>
                <div className="col-md-4">
                     <div className="form-group mb-2">
                        <label className="form-label">Category</label>
                            <select 
                              className={`form-control form-control-sm ${errors?.category?.message ? 'is-invalid' : ''}`}
                              defaultValue={''}
                              {...register('category')}
                            >
                              <option value={''} disabled>Please select category</option>
                                  {
                                    categoryList?.map((cat) => (
                                      <option key={cat.id} value={cat}>{cat}</option> 
                                    ))
                                  }
                              </select>
                              <span className="invalid-feedback">{errors?.category?.message}</span>
                          </div>
                          <div className="form-group mb-2">
                            <label className="form-label">Company</label>
                              <select 
                                className={`form-control form-control-sm ${errors?.company?.message ? 'is-invalid' : ''}`}
                                defaultValue={''}
                                {...register('company')}
                              >
                              <option value={''} disabled>Please select company</option>
                                  {
                                    companyList?.map((com) => (
                                      <option key={com.id} value={com.name}>{com.name}</option> 
                                    ))
                                  }
                              </select>
                              <span className="invalid-feedback">{errors?.company?.message}</span>
                          </div>
                      </div>
                      <div className="col-md-4">
                      <div className="form-group mb-2">
                            <label className="form-label">Image</label>
                               <input
                                  type="text"
                                  className={`form-control form-control-sm ${errors?.img?.message ? 'is-invalid' : ''}`}
                                  placeholder="Image"
                                  {...register('img')}
                              />
                               <span className="invalid-feedback">{errors?.img?.message}</span>
                            </div>
                      </div>
            </form>
        </div> 
          )
        }
        
        <div className="row product-list">
              <table className="table table-striped product-table">
                  <thead>
                      <tr>
                        <th className="text-center">Title</th>
                        <th className="text-start">Category</th>
                        <th className="text-start">Company</th>
                        <th className="text-end">Price</th>
                        <th className="text-center">Rate</th>
                        <th className="text-center">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                        productList?.map((product) => (
                          <tr key={product.id}>
                              <td className="text-start align-middle" style={{ minWidth: "250px" }}>
                                  <div>
                                    <img style={{width: "60px", height: "50px", objectFit: "contain"}} src={product?.images[0]} alt="" />
                                    <span className="ms-2">{product.title}</span>
                                  </div>
                              </td>
                              <td className="text-start align-middle">
                                  {product.category}
                              </td>
                              <td className="text-start align-middle">
                                   {product.brand}
                              </td>
                              <td className="text-end align-middle">
                                <div className="d-flex flex-column">
                                    <del>${product.price}</del>
                                    <span className="text-success fw-bolder">${priceAfterDiscount(product.price, product.discountPercentage)}</span>
                                </div>
                              </td>
                              <td className="text-center align-middle">
                                    <GenerateStar star={product?.rating}/>
                              </td>
                              <td className="text-center align-middle">
                                <div className="d-flex align-items-center justify-content-center">
                                  <FaEdit className="text-success me-1" role="button"
                                  
                                  />
                                  <FaTrash className="text-danger" role="button"/>
                                </div>
                              </td>
                          </tr>
                        ))
                      }
                  </tbody>
              </table>
        </div>
    </div>
  )
}
export default ProductList