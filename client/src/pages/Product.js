import React,{useEffect,useState} from 'react'
import {getProduct,productStar} from  '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import {getRelated } from '../functions/product';

import ProductCard  from '../components/cards/ProductCard';
const Product =({match})=> {

    const {user } = useSelector((state)=>({...state}));
    const [product, setProduct] = useState([]);
    //const [loading, setLoading] = useState(false);
    const [related ,setRelated] = useState([]);
    const [value ,setValue] = useState(0);
    const {slug} = match.params;

    useEffect(()=>{
        loadSingleProduct();

    },[slug]);
    useEffect(()=>{
    if(product.ratings && user){
        
    let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
    );
    existingRatingObject && setValue(existingRatingObject.value)
    }
})
    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
            setProduct(res.data);
            getRelated(res.data._id).then(res=> setRelated(res.data))
        });

    }
    const onStarClick =(newRating) =>{
    const {_id} = product;
      //console.table(newRating,_id);
        setValue(newRating);
        productStar(_id,newRating,user.token)
            .then((res)=>{
                console.log('rating clicked',res.data);
                loadSingleProduct();
            })
    };
    return (
        <div className="container">
            <div className="row ">
                <SingleProduct  product={product}
                                onStarClick={onStarClick}
                                value={ value}
                />
            </div>
            <div className="row p-5">
                <div className="col text-center pt-5 pb-5"> 
                    <hr/>
                    <h4> Related products</h4>
                    <hr/>
                </div>
                {/* <div className="row pb-5">
                    {related.length?  related.map ((r)=> (
                    <div key={r._id} className="col-md-4"> 
                       <ProductCard 
                          product={r}
                       />
                    </div>)):(
                    <div className text-center col>
                       No product found
                    </div>
                    )} */}
                          <div className="row pb-5">
                    {related.length ? (
                    related.map((r) => (
                        <div key={r._id} className="col-md-4">
                        <ProductCard product={r} />
                        </div>
                    ))
                    ) : (
                    <div className="text-center col">No Products Found</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Product
