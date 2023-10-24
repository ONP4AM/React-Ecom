// import React, { useEffect, useState } from 'react';
// import { getProduct, getProductsByCount, productStar, fetchProductsByFilter } from '../functions/product';
// import SingleProduct from '../components/cards/SingleProduct';
// import { useSelector, useDispatch } from 'react-redux';
// import ProductCard from '../components/cards/ProductCard';
// const Shop =({ match }) =>{
//     const { user } = useSelector((state) => ({ ...state }));
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(false);
//     let { search } = useSelector((state) => ({ ...state }))
//     const { text } = search;
//     useEffect(() => {
//         loadAllProducts();
//     }, []);
//     // 1 load products by default on page load
//     const loadAllProducts = () => {
//         getProductsByCount(12).then((p) => {
//             setProducts(p.data);
//             setLoading(false);
//         });
//     };
//     // 2 load products on user search input
//     useEffect(() => {
//         //console.log('load products on user search input',text)
//         fetchProducts({ query: text });
//     }, [text])
//     const fetchProducts = () => {
//         fetchProductsByFilter(text)
//             .then((res) => {
//                 setProducts(res.data);
//             })
//     };
//     return (
//         // <div className="container-fluid">
//         //     <div className="row">
//         //         <div className="col-md-3">
//         //     search /filter
//         //         </div>
//         //         <div className="col-md-9">
//         //             {loading ? (
//         //                 <h4 className="text-danger">Loading..</h4>
//         //             ) : (
//         //                 <h4 className="text-warning">Products</h4>
//         //             )}
//         //             {products.length < 1 && <p>No Products found</p>}
//         //         <div></div>
//         //             <div className="row pb-5">
//         //                 {products.map((p) => (
//         //                     <div
//         //                         key={p._id}
//         //                         className="col-md-4 mt-3"
//         //                     >
//         //                         <ProductCard product={p} />
//         //                     </div>
//         //                 ))}
//         //             </div>
//         //         </div>
//         //     </div>
//         // </div>
//         <div className="container-fluid">
//             <div className="row"></div>
//         </div>
//     )
// };
// export default Shop;
"use strict";