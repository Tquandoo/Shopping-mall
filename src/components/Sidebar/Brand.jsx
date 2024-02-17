import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filtersSelector } from "../../store/selectors";
import filtersSlice from "../../redux-toolkit/filtersSlice";
import { companyList } from "../../services/common";

function Brand() {
    const [collapse, setCollapse] = useState(false)
    const dispatch = useDispatch()
    const { brand } = useSelector(filtersSelector)
    return (
        <div className="accordion-item py-2 d-flex flex-column">
            <h5 className="accordion-header">
                <span role="button" className={`accordion-button ${collapse ? 'collapsed' : ''}`}
                    onClick={() => setCollapse(!collapse)}>
                    Brand
                </span>
            </h5>
            {
                collapse && (
                    <div className="form-group">
                        {
                            companyList.map(item => (
                                <button key={item.value}
                                    className={`btn btn-sm btn-outline-secondary me-1 mb-1 ${item.value === brand ? 'active' : ''}`}
                                    type="button"
                                    onClick={() => dispatch(filtersSlice.actions.setSearchBrand(item.value))}
                                >
                                    {item.name}
                                </button>
                            ))
                        }

                    </div>
                )
            }
        </div>
    )
}

export default Brand;