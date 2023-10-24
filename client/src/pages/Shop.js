import React, { useEffect, useState } from 'react';
import { getProductsByCount, fetchProductsByFilter } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";

const {SubMenu} = Menu;
const Shop=()=> {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);

      const [categories, setCategories] = useState([]);
      const [categoryIds, setCategoryIds] = useState([]);
      const [star, setStar] = useState("");
      const [subs, setSubs] = useState([]);
      const [sub, setSub] = useState("");

    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const {text} = search;

    useEffect(() => {
        loadAllProducts();
    }, []);
    // load default products by default on page load
    const loadAllProducts = () => {
        getProductsByCount(12).then((p) => {
            setProducts(p.data);
            setLoading(false);
                });
            };
 //2 load products on user search input
    // useEffect(() => {
    //     //console.log('load products on user search input',text);
    //     const delayed = setTimeout(() =>{
    //         fetchProducts({ query: text });
    //     },300);
    //     return () => clearTimeout(delayed)
    // }, [text]);
// 2. load products on user search input
useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  //3 load product based on price 
  useEffect(() => {
    console.log('ok to req');
    fetchProducts({price});
  },[ok]);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
                setProducts(res.data);
            });
    };

   const handleSlider = (value) => {
      dispatch({type:"SEARCH_QUERY",
                payload: {text: ""}
    })    
      setPrice(value);
      setTimeout(()=>{
        setOk(!ok);
      },300);
   };
    return (
        <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 pt-2">
                      <h4>Search /Filters</h4>
                      <hr/>
                      <Menu mode='inline' 
                            defaultOpenKeys={['1','2']}
                      >
                          <SubMenu  key='1' 
                                    title={<span className="h6">
                                                <DollarOutlined/> 
                                                Price
                                                
                                          </span>}>
                              <div>
                                <Slider
                                        className="ml-4 mr-4"
                                        tipFormatter= {(v)=>`$${v}`}
                                        value ={price}
                                        onChange={handleSlider}
                                       max='4999'
                                />
                              </div>
                          </SubMenu>
                      </Menu>

                    </div>
                    <div className="col-md-9 pt-2">
                    {loading ? (
                        <h4 className="text-danger">Loading..</h4>
                    ) : (
                        <h4 className="text-warning">Products</h4>
                    )}
                    {products.length < 1 && <p>No Products found</p>}
                        <div className="row pb-5">
                            {products.map((p) => (

                            <div
                                key={p._id}
                                className="col-md-4 mt-3"
                                >
                                    <ProductCard product={p} />
                            </div>
                            ))}
                        </div>
                    </div> 
                </div>            
        </div>
    )
};

export default Shop;
// import React, { useState, useEffect } from "react";
// import {
//   getProductsByCount,
//   fetchProductsByFilter,
// } from "../functions/product";
// import { getCategories } from "../functions/category";
// import { getSubs } from "../functions/sub";
// import { useSelector, useDispatch } from "react-redux";
// import ProductCard from "../components/cards/ProductCard";
// import { Menu, Slider, Checkbox, Radio } from "antd";
// import {
//   DollarOutlined,
//   DownSquareOutlined,
//   StarOutlined,
// } from "@ant-design/icons";


// const { SubMenu, ItemGroup } = Menu;

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [price, setPrice] = useState([0, 0]);
//   const [ok, setOk] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [categoryIds, setCategoryIds] = useState([]);
//   const [star, setStar] = useState("");
//   const [subs, setSubs] = useState([]);
//   const [sub, setSub] = useState("");
//   const [brands, setBrands] = useState([
//     "Apple",
//     "Samsung",
//     "Microsoft",
//     "Lenovo",
//     "ASUS",
//   ]);
//   const [brand, setBrand] = useState("");
//   const [colors, setColors] = useState([
//     "Black",
//     "Brown",
//     "Silver",
//     "White",
//     "Blue",
//   ]);
//   const [color, setColor] = useState("");
//   const [shipping, setShipping] = useState("");

//   let dispatch = useDispatch();
//   let { search } = useSelector((state) => ({ ...state }));
//   const { text } = search;

//   useEffect(() => {
//     loadAllProducts();
//     // fetch categories
//     // getCategories().then((res) => setCategories(res.data));
//     // // fetch subcategories
//     // getSubs().then((res) => setSubs(res.data));
//   }, []);

//   const fetchProducts = (arg) => {
//     fetchProductsByFilter(arg).then((res) => {
//       setProducts(res.data);
//     });
//   };

//   // 1. load products by default on page load
//   const loadAllProducts = () => {
//     getProductsByCount(12).then((p) => {
//       setProducts(p.data);
//       setLoading(false);
//     });
//   };

//   // 2. load products on user search input
//   useEffect(() => {
//     const delayed = setTimeout(() => {
//       fetchProducts({ query: text });
//       if (!text) {
//         loadAllProducts();
//       }
//     }, 300);
//     return () => clearTimeout(delayed);
//   }, [text]);

  
//   return (
//     <div className="container-fluid">
//       <div className="row">
       
//         <div className="col-md-9 pt-2">
//           {loading ? (
//             <h4 className="text-danger">Loading...</h4>
//           ) : (
//             <h4 className="text-danger">Products</h4>
//           )}

//           {products.length < 1 && <p>No products found</p>}

//           <div className="row pb-5">
//             {products.map((p) => (
//               <div key={p._id} className="col-md-4 mt-3">
//                 <ProductCard product={p} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;