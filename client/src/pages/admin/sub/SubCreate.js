import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import { createSub, getSubs, removeSub } from '../../../functions/sub';
import {Link } from 'react-router-dom';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';

import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const SubCreate = () => {

    const {user} = useSelector(state => ({...state}));

    const [name, setName] = useState('');
    const [loading,setLoading] = useState(false);
    const [categories , setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [subs , setSubs] = useState([]);
   // {/* STEP 1 */}
   const [keyword,setKeyword] = useState('');
    useEffect(()=>{
        loadCategories();
        loadSubs();
    },[]);

    const loadCategories = () => getCategories().then((c) =>setCategories(c.data));
    const loadSubs = () => getSubs().then((s) =>setSubs(s.data));

    const handleSubmit = (e) => {
        e.preventDefault();
 
        console.log(name);
        setLoading(true);
        createSub(({name,parent:category}),user.token)
        .then(res =>{
            console.log(res);
            setLoading(false);
            setName('');
            toast.success(`"${res.data.name}" is created`);
            loadCategories();
            loadSubs();
        })
        .catch(err=>{
            console.log(err)
            setLoading(false);
            if (err.response.status ===400) toast.error(err.response.data);
        })
    }
    const handleRemove = async (slug) =>{
       if (window.confirm(`delete ${slug}?`)){
           setLoading(true);
           removeSub(slug , user.token)
           .then((res)=>{
               setLoading(false);
               toast.error(`${res.data.name} is removed`);
               loadCategories();
               loadSubs();
           })
           .catch((err)=>{
               if (err.response.status ===400) {
                   toast.error(err.response.data)
                }
           });
       }
       //console.log(answer, slug)
    };
    // step4
    const searched =(keyword) =>(c) => c.name.toLowerCase().includes(keyword)

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col md-2">
                        <AdminNav />
                    </div>
                    <div className="col">
                        {loading? (<h4>...loading</h4>):(<h4>Create Sub Category</h4>)}
                        <CategoryForm
                            handleSubmit={handleSubmit}
                            name ={name}
                     
                            setName ={setName}
                           

                        />

                        <div className="form-group">
                            <label> Parent Category</label>
                            <select name ="category"
                                    className="form-control"       
                                    onChange={e=> setCategory(e.target.value)}      
    
                            >
                                <option> Please Select</option>
                                {categories.length> 0 &&
                                    categories.map((c)=>
                                    <option
                                            key={c._id}
                                            value={c._id}
                                            >{c.name}</option>)}
                            </select>
                        </div>
                      {/* step 2 and step 3 */}
                        <LocalSearch
                        keyword={keyword}
                        setKeyword={setKeyword}
                        />
{/* STEP 5*/}
                        {subs.filter(searched(keyword)).map((s)=>(

                        <div
                            key={s._id}
                            className='alert alert-primary'
                            >
                                {s.name}
                                <span
                                    onClick ={()=> handleRemove(s.slug)}
                                    className='btn btn-sm float-end'>
                                        <DeleteOutlined/>
                                </span>
                                <Link to={`/admin/sub/${s.slug}`}>
                                <span
                                        className='btn btn-sm float-end'
                                        >
                                        <EditOutlined/>
                                </span>
                                </Link>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubCreate;