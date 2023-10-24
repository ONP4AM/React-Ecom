import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { updateCategory, getCategories, removeCategory ,getCategory} from '../../../functions/category';
import {Link } from 'react-router-dom';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';

import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({history,match}) => {

    const {user} = useSelector(state => ({...state}));

    const [name, setName] = useState('');
    const [loading,setLoading] = useState(false);
   //const [category,setCategory] = useState([]);
    useEffect(()=>{
        loadCategory();
       
    },[]);

    const loadCategory = () => getCategory(match.params.slug).then((c) =>setName(c.data.name));
  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        setLoading(true);
        updateCategory(match.params.slug,{name},user.token)
        .then(res =>{
            console.log(res)
            setLoading(false);
            setName('');
            toast.success(`"${res.data.name}" is updated`);
            history.push('/admin/category');
            //loadCategories();
        })
        .catch(err=>{
            console.log(err)
            setLoading(false);
            if (err.response.status ===400) toast.error(err.response.data);
        })
    }
    const handleRemove = async (slug) =>{
    //    if (window.confirm(`delete ${slug}?`)){
    //        setLoading(true);
    //        removeCategory(slug , user.token)
    //        .then((res)=>{
    //            setLoading(false);
    //            toast.error(`${res.data.name} is removed`);
    //        })
    //        .catch((err)=>{
    //            if (err.response.status ===400) {
    //                toast.error(err.response.data)
    //             }
    //        });
     //  }
       //console.log(answer, slug)
    };
   

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col md-2">
                        <AdminNav />
                    </div>
                    <div className="col">
                        {loading? (<h4>...loading</h4>):(<h4>Create Category</h4>)}
                       
                        <CategoryForm
                            handleSubmit={handleSubmit}
                            name ={name}
                            setName ={setName}
                        />

                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryUpdate;