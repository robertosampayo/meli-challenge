import React, { useState, useContext, useEffect } from 'react'
import styles from './products.module.scss'
import Link from 'next/link'
import ImageDefault from '../Utils/imgDefaultProducts'
import ItemType from '../../types/item'

type ProductProps = {
    item: ItemType['data']['item'],
    key: string
}

const Product:React.FC<ProductProps> = ({item}) => {



  return (

        <div className={styles.product} >
            <Link href={item && item.id? `/items/${item.id}`:'#'}  >
                <a>
                    {item && item.picture ?

                        <img data-testid="product-image" src={item.picture} />
                        :
                        <ImageDefault />
                    }
           
                    <div className={styles.products__details}>
                        <div>
                            <h1>$ {item && item.price ? (item.price[0].amount + item.price[0].decimals).toFixed(2): ''}</h1>
                            {item && item.free_shipping &&
                            <>
                                {item.free_shipping ?

                                    <span><img src='/images/shipping.png' /></span>
                                    :
                                    <></>
                                }
                            
                            </>
                            }
                        </div>
                        <h2>{item && item.title ? item.title: ''}</h2>
                    </div>
                    <div className={styles.products__city}>
                        <span>{item && item.city ? item.city: ''}</span>

                    </div>

                </a>

            </Link>
        </div>
  )
}

export default Product

