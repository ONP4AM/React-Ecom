import React, { useState } from "react";
import { Menu } from "antd";
import {Link} from "react-router-dom";
import firebase from 'firebase';
import {useDispatch,useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import Search from '../forms/Search';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  Html5Outlined ,
  ShoppingOutlined
} from "@ant-design/icons";

const { SubMenu ,Item} = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let history = useHistory();
  let {user} = useSelector((state)=>({...state}));

  const handleClick = (e) =>{
    setCurrent(e.key);
  }; 

  const logout =() =>{
    firebase.auth().signOut()
  dispatch({
    type:"LOGOUT",
    payload: null,
    }); 
    history.push("/login")  
  };
  return ( 
    <div>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal" 
      >
         <Link to="/">
        <Item key=  "home" icon={<Html5Outlined />}>
          Home
         </Item>
        </Link>
        <Link to="/shop">
        <Item key=  "shop" icon={<ShoppingOutlined />}>
          Shop
         </Item>
        </Link>
     
      {user && (
          <SubMenu className="float-end"
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split('@')[0]} 
        >
           {user && user.role === 'subscriber'&& (
            <Item >
              <Link to="/user/history">
              Dashboard
              </Link>
             </Item>
           )}
             {user && user.role === 'admin'&& (
            <Item >
              <Link to="/admin/dashboard">
              Dashboard
              </Link>
             </Item>
             )}
            {/* <Item key="setting:2">Option 2</Item> */}
            <Item icon ={<LogoutOutlined/>}
                  onClick={logout}
            >Logout</Item>
        </SubMenu>
      )}
      {!user && (
           <Menu.Item key=  "register" icon={<UsergroupAddOutlined />} className="float-right">
           <Link to="/register">Register</Link>
         </Menu.Item>
     
      )}
      {!user && (
            <Item key=  "login" icon={<UserOutlined />} className="float-right">
            <Link to="/login">Login</Link>
          </Item>
      )}

       <span className="float-end">
         <Search/>
       </span>
      </Menu>
    </div>
  );
};

export default Header;
