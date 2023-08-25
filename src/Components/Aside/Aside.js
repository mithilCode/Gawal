import React from 'react'
import styles from './Aside.module.scss';
import logo from '../../Assets/Images/logo.png'
import { NavLink } from 'react-router-dom';
import { FaListUl } from "react-icons/fa";
import { RiBookmark3Fill } from "react-icons/ri";
import { MdPendingActions } from "react-icons/md";
const Aside = (props) => {
  return (
    <aside className={styles.aside_bar + ' aside_bar ' +  (props.collepse && styles.collespe)}>
      <div className={styles.header_logo}>
        <img src={logo} alt="" />
        <h2>Gawal</h2>
      </div>
      <div className={styles.aside_menubar}>
            <div className={styles.aside_menu}> 
              <NavLink to='/userlist'><FaListUl className={styles.aside_menu_icon}/> <p>User List</p></NavLink>
            </div>
            <div className={styles.aside_menu}> 
              <NavLink to='/booking'><RiBookmark3Fill className={styles.aside_menu_icon}/><p>Booking History</p></NavLink>
            </div>
            <div className={styles.aside_menu}> 
              <NavLink to='/payment'><MdPendingActions  className={styles.aside_menu_icon}/><p>Pending Payment</p></NavLink>
            </div>
      </div>
    </aside>
  )
}

export default Aside