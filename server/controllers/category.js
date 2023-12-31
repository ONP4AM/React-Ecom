const Category = require('../models/category');
const Sub = require('../models/sub');
const slugify = require('slugify');
const Product = require('../models/product');
exports.create = async (req,res)=>{
        try{
            const {name} = req.body;
            const category = await new Category({name, slug:slugify(name)}).save();
            res.json(category);
        }catch(err){
            res.status(400).send('Create category fail')
        }
}; 
exports.list =async (req,res) =>
    res.json(await Category.find({}).sort({createdAt:-1}).exec());

exports.read =async (req,res)=>{
   try{
    let category = await Category.findOne({slug: req.params.slug}).exec();
    const products = await Product.find({category})
    .populate('category')
    .populate('postedBy','_id name')
    .exec();
    res.json({category,products});
   } catch(err){
    res.status(400).send('load  products,  category fail')
}
};
exports.update =async (req,res)=>{
    const {name} = req.body;
    try{
        const updated = await Category.findOneAndUpdate({slug: req.params.slug},
                                                        {name,slug: slugify(name)},
                                                        {new: true}
                                                        );
        res.json(updated);

    }catch(error){
        res.status(400).send('category Update failed')
    }
}; 
exports.remove =async (req,res)=>{
    try{
        const deleted = await Category.findOneAndDelete({slug: req.params.slug})
        res.json(deleted);
    }catch(err){
        res.status(400).send(' Category delete failed')
    }
};

exports.getSubs =(req, res) => {
    Sub.find({parent: req.params._id}).exec((err,subs)=>{
        if(err)console.log(err);
        res.json(subs);
    });
};