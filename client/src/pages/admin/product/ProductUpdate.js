import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { getProduct,updateProduct } from '../../../functions/product';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import { getCategories,getCategory,getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import {LoadingOutlined} from '@ant-design/icons';

const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Mi", "msi","Samsung", "OnePlus", "Google", "Lenovo", "Asus"],
    color: "",
    brand: "",
}
const ProductUpdate = ({match,history}) => {

    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
    const [showSub,setShowSub] = useState(false);
    const [loading,setLoading] = useState(false);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState('');
    const {slug} = match.params;

    useEffect(()=>{
        loadProduct();
        loadCategories();
    },[]);

    const loadProduct = () =>{
        getProduct(slug)
            .then(p=>{

                // 1 load single product
                setValues({...values,...p.data});
                // 2 load single product category subs

              
                getCategorySubs(p.data.category._id)
                .then((res)=>{
                    setSubOptions(res.data); // on first load, show default
                });
                //3 prepare array of sub ids to show as default sub value in antd 
                let arr=[]
                p.data.subs.map(s => {
                    arr.push(s._id);
                });
                console.log("ARR" ,arr);
                setArrayOfSubs((prev)=>arr);
            });
    };
    const loadCategories = () => {

        getCategories().then((c)=>{
            setCategories(c.data);
        });  
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        values.subs = arrayOfSubs;
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug,values, user.token)
        .then((res) =>{
            setLoading(false);
            toast.success(`${res.data.title} is updated`);
            history.push("/admin/products");
        })
        .catch((err)=>{
            console.error("product update  err===>" ,err);
            setLoading(false);
            toast.error(err.response.data.err);
        });
    };
    const handleChange = (e) => {
       setValues({ ...values, [e.target.name]: e.target.value });
        //console.log(e.target.name,'----',e.target.value);
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
       // console.log('CLICKED CATEGORY',e.target.value);
        setValues({ ...values, subs:[]});

            setSelectedCategory(e.target.value);

            getCategorySubs(e.target.value).then((res)=>{
                //console.log('SUB OPTIONS ON CATEGORY CLICKED',res);
                setSubOptions(res.data);
            });
            //if user clicks back to the original category change
            // show its sub categories in default
            if (values.category._id === e.target.value) {
                loadProduct();
            };

            setArrayOfSubs([]);
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {loading? (<LoadingOutlined className="text-danger h1"/>)
                                :(<h4> Update Product </h4>)}
                    <hr />
                    {JSON.stringify(values)}

                    <div className="p-3"> 
                        <FileUpload
                                    values={values}
                                    setValues = {setValues}    
                                    setLoading ={setLoading}                 
                        />
                    </div> 
                    <ProductUpdateForm
                            handleSubmit={handleSubmit}  
                            handleChange={handleChange}
                            handleCategoryChange={handleCategoryChange}
                            setValues={setValues}
                            values={values}
                            subOptions={subOptions}
                            showSub={showSub}
                            categories={categories}
                            setArrayOfSubs={setArrayOfSubs}
                            arrayOfSubs={arrayOfSubs}
                            selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate;