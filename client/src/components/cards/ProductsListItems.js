import React from 'react'
import {Card} from 'antd';
import {Link} from 'react-router-dom';
const ProductsListItems =({product})=> {

    const {description ,sold,quantity, color,subs, category,slug ,price,shipping,brand} = product;
    return (
        <div>
            <ul className="list-group">

                <li className="list-group-item">
                    Price{""}
                    <span className="label label-default label-pill float-end">
                            $ {price}
                    </span>
                </li>
               {category && (
                    <li className="list-group-item">
                    Category{""}
                    <Link  to={`/category/${category.slug}`}
                            key = {category.id}
                            className="label label-default label-pill float-end ">
                        {category.name}
                    </Link>
                </li>
               )}
                  {subs && (
                    <li className="list-group-item">
                    Sub Category{
                        subs.map((s)=>
                            <Link   to={`/sub/${s.slug}`}
                                    key={s.id}
                                    className="label label-default label-pill float-end ms-4">
                                        {s.name}
                            </Link>
                        )}
                    </li>
               )}
               
                <li className="list-group-item">
                    Shipping{""}
                    <span className="label label-default label-pill float-end">
                           {shipping}
                    </span>
                </li>
                <li className="list-group-item">
                    Color{""}
                    <span className="label label-default label-pill float-end">
                            {color}
                    </span>
                </li>
                <li className="list-group-item">
                    Brand{""}
                    <span className="label label-default label-pill float-end">
                             {brand}
                    </span>
                </li>
                <li className="list-group-item">
                    Available{""}
                    <span className="label label-default label-pill float-end">
                             {quantity}
                    </span>
                </li>
                <li className="list-group-item">
                    Sold{""}
                    <span className="label label-default label-pill float-end">
                             {sold}
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default ProductsListItems;
