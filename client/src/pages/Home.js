import React,{useEffect,useState}from 'react';

import Jumbotron from '../components/cards/Jumbotron';

import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';

import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';
const Home = () => {

    return (
     <>
                <div className="jumbotron h1 font-weight-bold text-center">
                        <Jumbotron className=""
                            text ={['Latest Arrival' , 'New Arrival','Best Seller']}
                        />
                </div>
                <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron"
                > 
                New Arrival
                </h4>
                <NewArrivals
                  
                />
                <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron"
                > 
                Best Seller
                </h4>
                <BestSellers/>
                <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron"
                > 
                Categories
                </h4>
                <CategoryList/>
                <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron"
                > 
                    sub Categories
                </h4>
                <SubList/>
     </>
    );
};

export default Home;