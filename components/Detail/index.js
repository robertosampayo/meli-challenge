import React, { useState, useContext, useEffect } from 'react'
import styles from './detail.module.scss'
import { useRouter } from 'next/router'
import clienteAxios from '../../config/axios'
import { useItem } from '../../context/items/itemState';


export default function Detail({item={}, description=''}) {


  // const router = useRouter()
  // const { id } = router.query


  // // Obtenemos el context y el State global
  // const context = useItem();
  // const { item, description, setCurrentItem, setCurrentDescription } = context;


  // const getItemInfo = async (id) => {

  //   setCurrentItem(id);
  //   setCurrentDescription(id);
  // }

  // useEffect(() => {

  //   if (id) { getItemInfo(id); }
    
  // }, [id]);

  return (
    <div className={styles.detail}>
       {item &&
        <>
          <div className={styles.detail__product}>
              <img src={item.pictures? item.pictures[0].url:'/images/tablet.jpg'}  />
              
              <div className={styles.detail__product__text}>
                  <p>Nuevo - {item.sold_quantity?item.sold_quantity:'0'} vendidos</p>
                  <h2>{item.title? item.title: '--'}</h2>

                  <h1>$ {item.price? item.price: '--'}</h1>

                  <button>Comprar</button>
              </div>
          </div>
          <div className={styles.detail__description}>
              <h2>Descripción del producto</h2>
              <p>{description? description:'Producto sin Descripción'}</p>
          </div>
        </>
       }
    </div>
  )
}

