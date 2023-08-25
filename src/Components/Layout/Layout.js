import React, { useState } from 'react'
import styles from './Layout.module.scss'
import Aside from '../Aside/Aside';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = (props) => {
  const[iscolleps,setIscollepse]=useState(false)
  const handleclick=()=>{
    setIscollepse(!iscolleps);
  }
  return (
    <>
    <Header onclick={(e)=>handleclick(e)} collepse={iscolleps}/>
    <Aside collepse={iscolleps}/>
    <div className={styles.main_content + ' ' +  (styles.collespe)}>{props.children}</div>
    <Footer collepse={iscolleps}/>
    </>
  )
}

export default Layout