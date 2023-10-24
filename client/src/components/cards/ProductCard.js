import React from 'react';
import { Card ,Skeleton} from "antd";
import steelseries from "../../images/steelseries.jpg";
import { Link } from "react-router-dom"
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {showAverage} from "../../functions/rating"
const { Meta } = Card;

const ProductCard = ({ product}) => {

const { title, description, images, slug } = product;
return (
        <>    
    
        {product && product.ratings && product.ratings.length > 0? showAverage(product)
        : <div className=" text-center pt-1 pb-3">
                Be the first one to leave the rating
           </div>}

        <Card 
        cover={
            <img src={images && images.length ? images[0].url : steelseries}

                style={{ height: "150px", objectFit: "cover" }}
                className="p-1"
            />}
            actions={[                  
                        <div 
                                className="d-flex"
                        >
                            <Link to={`/product/${slug}`}>
                                <EyeOutlined
                                        className="text-warning"
                                    /><br/> View Product
                            </Link>
                            <Link>
                                <ShoppingCartOutlined
                                            className="text-danger"
                                            
                                /><br/> Add to Cart
                            </Link>
                      
                        </div>
            ]}
        >
            <Meta title={title}
                description={`${description && description.substring(0, 40)}`} />
        </Card>
    </>
    );
}

export default ProductCard;
