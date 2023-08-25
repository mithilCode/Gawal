import React from 'react'
import ReactLoading from 'react-loading';
import './Loader.scss'
export const Loader = () => {
  return (
    <>
    <section className="loader_section">
    <ReactLoading type={'spinningBubbles'} color={'#feba35'} height={100} width={100}/>
    </section>
    </>
  )
}
