import React from 'react';
import {Card,Tabs} from 'antd';
import {Link} from 'react-router-dom';
import {HeartOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import steelseries from "../../images/steelseries.jpg";
import ProductsListItems from './ProductsListItems';
import ReactStars from 'react-stars'
import RatingModal from '../modal/RatingModal';
import {showAverage} from '../../functions/rating';
const{Meta} =Card;
const {TabPane}= Tabs;

// this is children component of product page
const SingleProduct = ({product,onStarClick,value}) => {

    const {title , images,description,_id} = product;

    return (
        <>
          
            <div className="col-md-7">
            
            {   images && images.length ?(
                <Carousel showArrows={true}autoPlay infiniteLoop>
                {images && images.map((i)=> 
                    <img    src={i.url} 
                            key={i.public_id}
                    />
                )}
            </Carousel>):(
                <Card
                cover={
                    <img src={images && images.length ? images[0].url : steelseries}
        
              
                        className="mb-3 card-image"
                    />}
                    >
                </Card>
            )}
            <Tabs type='card'>
                <TabPane tab="Description" key="1">
                    {description && description}
                </TabPane> 
                <TabPane   tab="More">
                  Call us on xxxxxxxxxx to learn more about product
                 </TabPane>            
            </Tabs>
            </div>

            <div className="col-md-5">
            <h1 className="bg-info"> {title} </h1>
            {product && product.ratings && product.ratings.length > 0? showAverage(product)
             : <div className=" text-center pt-1 pb-3">
                    No rating yet 
                </div>}

              <Card
                     actions={[
                        <>
    
                            <ShoppingCartOutlined className="text-success"/>
                            Add to Cart
              
                            <Link to="/">
                                <HeartOutlined className="text-info"/>
                                <br/>
                                Add to wishlist
                            </Link>
                            <RatingModal>   
                                <ReactStars
                                        //_id={_id}
                                        //title={title}
                                        count={5}
                                        onChange={onStarClick}
                                        //onChange = {(newRating)=>
                                            //console.log(newRating,_id)
                                        //}
                                        value={value}
                                        //star={star}
                                        size={32}
                                        color2={'#ffd700'} />
                                </RatingModal>
                        </>
                    ]}
              > 
                <ProductsListItems
                    product={product}
                />

                </Card>
            </div>
        </>
    )
}

export default SingleProduct
