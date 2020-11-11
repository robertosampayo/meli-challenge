import React, { useState, useContext, useEffect } from 'react'
import styles from './products.module.scss'
import Product from './product';
import { useItem } from '../../context/items/itemState';
import { useRouter } from 'next/router'
import Breadcrumb from '../Breadcrumb'


export default function Products() {


    const router = useRouter()
    const { q } = router.query
    // Extrae los Items del State Inicial
    const context = useItem();
    const { items, setItems } = context;



    useEffect(() => {
      if (Object.keys(items).length === 0 && items.constructor === Object && typeof(q) !== 'undefined') {        
        setItems(q);
      }


    }, [q, items])

    return (
      <>
      <Breadcrumb />


      <div className={styles.products}>
        {items && items?.result && Object.keys(items.result).length > 0 ?
          (<>
            {items.result.map((item,k) => (
               <Product key={`prod-${k}`} item={item} />
            ))}
          </>
          ) :
          (   <></>   )
        }
      </div>
      </>
    )
}
