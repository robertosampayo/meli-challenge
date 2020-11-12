import React, { useEffect } from 'react'
import styles from './products.module.scss'
import Product from './product';
import { useItem } from '../../context/items/itemState';
import { useRouter } from 'next/router'
import Breadcrumb from '../Breadcrumb'
import Loading from '../Loader'
import ErrorPage from '../ErrorPage'
import ItemType from '../../types/item'


const Products = () => {


    const router = useRouter()
    const { search } = router.query
    // Extrae los Items del State Inicial
    const context = useItem();
    const { items, setItems } = context;



    useEffect(() => {
      if (Object.keys(items).length === 0 && items.constructor === Object && typeof(search) !== 'undefined') {        
        setItems(search);
      }


    }, [search, items])

    return (
      <>
      
      <Breadcrumb />
      

      <div className={styles.products} data-cy="products">

        {items && items.error ? 
          <ErrorPage message={items.error} />
          :
          <>
          {items && items?.result && Object.keys(items.result).length > 0 ?
            (<>
              {items.result.map((item:ItemType['data']['item'],k:number) => (
                <Product key={`prod-${k}`} item={item} />
              ))}
            </>
            ) :
            (   <Loading />   )
          }
          </>
        }

      </div>
      </>
    )
}

export default Products