import React from 'react'
import ReactStars from 'react-stars'
import StarRating from "react-star-ratings";
export const showAverage = (p) => {

    if(p && p.ratings){
        let ratingsArray = p && p.ratings;
        let total = [];
        let length = ratingsArray.length;
       // console.log('length',length);
        ratingsArray.map ((r)=> total.push(r.value));
        let totalReduced = total.reduce((p, n)=> p+ n, 0 );
       // console.log('totalReduced',totalReduced);
        let highest = length * 5;
        //console.log('highest',highest);
        let result = (totalReduced *  5)/ highest;
       // console.log('result',result);
        return (
        
            <div className=" d-flex text-center  pt1 pb-1  ">
                <span>
                    <ReactStars
                    color2 ={'#ffd700'}
                    size ={32}
                    edit = {false}
                    value ={result}/>
                   
                </span>
                <span className="pt-3 ps-3">({p.ratings.length})</span>
            </div>

        )
    }
}
 

