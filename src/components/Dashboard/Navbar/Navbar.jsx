import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { PiSignOut } from 'react-icons/pi';
import { Link } from "react-router-dom";

const Navbar  = () => {
  return (
    <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
        <div style={{ minWidth: '180px'}} className="d-flex align-items-center"> 
          <Link to={'/cart'} className="logo">
            <FaCartPlus  size={22} className="me-2"/> 
          </Link>
        </div>
        <div className="user-product">
          <Link to='/shoe' className=" text-decoration-none text-dark fs-20">
              Trung Quân <PiSignOut size={15}/>   
          </Link>
        </div>
    </div>
  )

}
export default Navbar