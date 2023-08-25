import React from 'react'
import styles from './Footer.module.scss'
const Footer = (props) => {
  return (
    <footer className={styles.footer  + ' ' +  (props.collepse && styles.collespe)}>© 2023 Gawal - All Rights Reserved</footer>
  )
}

export default Footer