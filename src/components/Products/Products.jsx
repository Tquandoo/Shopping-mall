import React, { useEffect } from "react";
import Product from "./Product";
import { useDispatch, useSelector  } from "react-redux";
import filteredProductsSelector from "../../store/selectors";
import { fetchDataThunkAction } from "../../redux-toolkit/productsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
var limit = 8
const Products = () => {

    const dispatch = useDispatch()
    const filteredProducts = useSelector(filteredProductsSelector)
    const totalRows = useSelector(state => state?.products?.totalRows)

    useEffect(() => {
        dispatch(fetchDataThunkAction(limit))
    },[])
    
    const loadMore = () => {
        limit += 8
        dispatch(fetchDataThunkAction(limit))
    }

        

    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5>Products</h5>
            <InfiniteScroll
                dataLength = {filteredProducts.length}
                hasMore = { limit < totalRows}
                loader = {<p>Loading</p>}
                next = {loadMore}
                style={{overflow:"hidden"}}
                endMessage={<p>You have seen it all!</p>}
                pullDownToRefreshThreshold={'100px'}
            >
                <div className="row">
                    {
                        filteredProducts?.map((product) => (
                            <Product key={product.id} product = {product}/>
                        ))
                    }
                   
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default Products;