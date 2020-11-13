import React, { useEffect } from 'react'
import styles from './products.module.scss'
import Product from './product';
import { useItem } from '../../context/items/itemState';
import { useRouter } from 'next/router'
import Breadcrumb from '../Breadcrumb'
import Loading from '../Loader'
import ErrorPage from '../ErrorPage'
import ItemType from '../../types/item'


const Products  = (props: {items: {items :ItemType['data']['item'][]}})  => {


    // Extrae los Items del State Inicial
    const context = useItem();
    const { setItems } = context;
    const { items : { items } } = props;
    
    useEffect (() => {
      setItems(items);
    }, [])

    return (
      <>
      
      

      <div className={styles.products} data-cy="products">


          {items && Object.keys(items).length > 0 ?
            (<>
              {items.slice(0,4).map((item:ItemType['data']['item'],k:number) => (
                <Product key={`prod-${k}`} item={item} />
              ))}
            </>
            ) :
            (   <Loading />   )
          }


      </div>
      </>
    )
}

export default Products

