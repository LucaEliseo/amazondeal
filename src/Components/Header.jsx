import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined,  HeartOutlined,  UserOutlined } from '@ant-design/icons';


const Header = () => {
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className='navbar' >
      <Menu.Item key="home" icon={<HomeOutlined/>}>
        Home
      </Menu.Item>
       <Menu.Item key="Preferiti" icon={<HeartOutlined/>}>
        Preferiti
      </Menu.Item>
      <Menu.Item key="Profilo" icon={<UserOutlined/>}>
        Profilo
      </Menu.Item>
    </Menu>
  );
};

export default Header;
