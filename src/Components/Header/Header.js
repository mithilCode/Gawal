import React from 'react'
import styles from './Header.module.scss';
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
const Header = (props) => {
  const navigate=useNavigate()
  const handleclick=()=>{
    sessionStorage.removeItem("productLogin");
    localStorage.removeItem("userdata");
    navigate('/signin')
  }
  return (
    <header className={styles.header + ' ' +  (props.collepse && styles.collespe)}>
        <AiOutlineMenu onClick={(e)=>props.onclick(e)} className={styles.menu_icon}/>
        <button onClick={handleclick} className={styles.logout_btn}>Logout</button>
    </header>
  )
}

export default Header;