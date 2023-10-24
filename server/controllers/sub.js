const Sub = require('../models/sub');
const slugify = require('slugify');
const Product = require('../models/product');
exports.create = async (req,res)=>{
        try{
        
            const {name,parent} = req.body;

            const sub = await new Sub(  {
                                       
                                        name,
                                        slug:slugify(name),
                                        parent}).save();
            res.json(sub);
        }catch(err){
            console.log("Sub create Err ======>",err);
            res.status(400).send('Create Sub fail')
        }
}; 
exports.list =async (req,res) =>
    res.json(await Sub.find({}).sort({createdAt:-1}).exec());

exports.read =async (req,res)=>{
   try{
    let sub = await Sub.findOne({slug: req.params.slug}).exec();
    const products = await Product.find({subs:sub})
    .populate('category')
    .populate('postedBy','_id name')
    .exec();
    res.json({sub,products});
    
   }catch(err){
    res.status(400).send('load  products,  sub fail')
}
};
exports.update =async (req,res)=>{
    const {name,parent} = req.body;
    try{
        const updated = await Sub.findOneAndUpdate(     {slug: req.params.slug},
                                                        {name,parent,slug: slugify(name)},
                                                        {new: true}
                                                        
                                                        );
        res.json(updated);

    }catch(error){
        res.status(400).send('Sub Update failed')
    }

}; 
exports.remove =async (req,res)=>{
    try{
        const deleted = await Sub.findOneAndDelete({slug: req.params.slug})
        res.json(deleted);
    }catch(err){
        res.status(400).send(' Sub delete failed')
    }
//
};