const cloudinary = require('cloudinary');
//config
cloudinary.config({
    //cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    cloud_name: 'onp',
    //api_key:process.env.CLOUDINARY_API_KEY,
    api_key:'812475635977469',
    //api_secret: process.env.CLOUDINARY_API_SECRET,
    api_secret:'qzmJzVWqLVwFrPJEzL2w-OOZalY',
});

exports.upload = async (req,res) =>{
    let result = await cloudinary.uploader.upload(req.body.image,{
        public_id:`${Date.now()}`,
        response_type: 'auto',//jpeg ,png
    });
    res.json({
        public_id: result.public_id,
        url: result.secure_url,
    });
};

exports.remove = (req,res) =>{
    let image_id = req.body.public_id

    cloudinary.uploader.destroy(image_id,(err,result)=>{
        if(err) return res.json({success:false , err});
        res.send('ok');
    });
};