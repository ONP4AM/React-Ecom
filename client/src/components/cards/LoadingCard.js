import React from 'react';
import {Skeleton,Card} from "antd";
import steelseries from "../../images/steelseries.jpg";
import { Link } from "react-router-dom"
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// const { Meta } = Card;

const LoadingCard = ({ count }) => {

// const { title, description, images, slug } = product;

const cards =() =>{

    let totalCards =[];

    for(let i = 0; i < count;i ++){
        totalCards.push(
            <Card className="col md-4">
                <Skeleton active></Skeleton>
            </Card>
        );
    }
    return totalCards;
};
return <div className="row pd-5">{cards()}</div>;
   
       
    
}

export default LoadingCard;
