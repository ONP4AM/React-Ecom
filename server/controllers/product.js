const User = require('../models/user');
const slugify = require('slugify');
const Product = require('../models/product');
exports.create = async (req,res)=>{
        try{
            console.log(req.body);
            req.body.slug = slugify(req.body.title);

            const newProduct = await new Product(req.body).save();
            res.json(newProduct);
        }catch(err){
            console.log(err);
            //res.status(400).send('Create Product fail')
            res.status(400).json({
                err: err.message,
            });
        }
}; 
exports.listAll =async (req,res) =>{
 res.json(await Product.find({})
    .limit(parseInt(req.params.count))
    .populate('category')
    .populate('subs')
    .sort({createdAt:-1})
    .exec());
},
exports.read =async (req,res)=>{
    let product = await Product.findOne({slug: req.params.slug})
                    .populate('category')
                    .populate('subs')
                    .exec();
    res.json(product);
};
exports.update =async (req,res)=>{
    try{
        if (req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const updated = await Product.findOneAndUpdate
            ({slug:req.params.slug},
            req.body,
            {new: true}
            ).exec();res.json(updated);

    }catch(error){
        console.log('Product update Error ===>',err )
        res.status(400).json({
            err: err.message,
        })
    }
}; 
exports.remove =async (req,res)=>{
    try{
        const deleted = await Product.findOneAndDelete({slug: req.params.slug}).exec();
        res.json(deleted);
    }catch(err){
        res.status(400).send(' Product delete failed');
        console.log(err);
    }
};
// exports.list =async (req,res) =>{
//   try{
//         // createAt/updateAt , desc/asc ,3
//         const {sort,order ,limit} = req.body;
//         const products = await Product.find({})
//             .populate ('category')
//             .populate('subs')
//             .sort([[sort, order ]])
//             .limit(limit)
//             .exec();

//             res.json(products);
//   }catch(err){
//     console.log(err)
//   }
// }

//pagination
exports.list =async (req,res) =>{
    try{
          // createAt/updateAt , desc/asc ,3
          const {sort,order,page} = req.body;
          const currentPage = page || 1;
          const perPage = 3;//3

          const products = await Product.find({})
                .skip((currentPage -1) * perPage)
                .populate ('category')
                .populate('subs')
                .sort([[sort, order ]])
                .limit(perPage)
                .exec();
  
            res.json(products);
    }catch(err){
      console.log(err);
    }
  };

exports.productsCount = async (req,res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);
}

exports.productStar = async (req,res) => {
    const product = await Product.findById(req.params.productId).exec();
    const user = await User.findOne({email: req.user.email}).exec();
    const {value} = req.body;

    let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
    );

    if (existingRatingObject === undefined) {
        let ratingAdded = await Product.findByIdAndUpdate(
            product._id,
            {
                $push: { ratings: {value ,postedBy: user._id}},
            },
            {new :true}
        ).exec();
        console.log("ratingAdded", ratingAdded);
        res.json(ratingAdded);
        
    }else{
        const ratingUpdated = await Product.updateOne(
            {
            ratings: {$elemMatch:existingRatingObject},
            },
        {$set:{"ratings.$.value": value} },
        {new: true}
        ).exec();
        console.log("ratingUpdated", ratingUpdated);
        res.json(ratingUpdated);
    }
};

exports.listRelated = async(req,res) =>{
    const product = await Product.findById(req.params.productId).exec();

    const related = await Product.find({
        _id :{$ne :product._id},
        category: product.category,
    })
    .limit(3)
    .populate ('category')
    .populate('subs')
    .populate('postedBy')
    .exec();

    res.json(related);
};
// search /Filter
const handleQuery = async (req, res, query) => {
    const products = await Product.find({ $text: { $search: query } })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();
  
    res.json(products);
  };
  const handlePrice = async (req, res, price) => {
      try{
          let products = await Product.find({
              price :{
                  $gte: price[0],
                  $lte: price[1],
              },
          })
          .populate("category", "_id name")
          .populate("subs", "_id name")
          .populate("postedBy", "_id name")
          .exec();
          
          res.json(products);
      }catch(err){
          console.log(err);
      }
  };
// exports.searchFilters = async (req,res) =>{
// const {query} = req.body;
//   try{
 
//     if(query){
//         console.log("query",query);
//         await handleQuery(req,res,query);
//     }
//   }catch(err){
//       console.log('err',err)
//   }
// }; 

exports.searchFilters = async (req, res) => {
    const {
        query,
        price,
    //   category,
    //   stars,
    //   sub,
    //   shipping,
    //   color,
    //   brand,
    } = req.body;
  
    if (query) {
      console.log("query --->", query);
      await handleQuery(req, res, query);

  
    }
  
   // price [20, 200]
    if (price !== undefined) {
      console.log("price ---> ", price);
      await handlePrice(req, res, price);
    }
  
    // if (category) {
    //   console.log("category ---> ", category);
    //   await handleCategory(req, res, category);
    // }
  
    // if (stars) {
    //   console.log("stars ---> ", stars);
    //   await handleStar(req, res, stars);
    // }
  
    // if (sub) {
    //   console.log("sub ---> ", sub);
    //   await handleSub(req, res, sub);
    // }
  
    // if (shipping) {
    //   console.log("shipping ---> ", shipping);
    //   await handleShipping(req, res, shipping);
    // }
  
    // if (color) {
    //   console.log("color ---> ", color);
    //   await handleColor(req, res, color);
    // }
  
    // if (brand) {
    //   console.log("brand ---> ", brand);
    //   await handleBrand(req, res, brand);
    // }
  };