import React, { useState, useContext, useEffect } from 'react'
import styles from './products.module.scss'
import Link from 'next/link'
import imageDefault from '../Utils/imgDefaultProducts'



export default function Product({item}) {



  return (

        <div className={styles.product}>
            <Link href={item.id? `/items/?id=${item.id}`:'#'} as={item.id?`/items/${item.id}`:'#'} >
                <a>
                    <img src={item.picture? item.picture:<imageDefault />} />
                    <div className={styles.products__details}>
                        <h1>$ {item.price ? (parseFloat(item.price[0].amount) + parseFloat(item.price[0].decimals)).toFixed(2): ''}</h1>
                        <h2>{item.title ? item.title: ''}</h2>
                    </div>
                    <div>
                        <span>{ item.address && item.address.city_name ? item.address.city_name: ''}</span>

                    </div>

                </a>

            </Link>
        </div>
  )
}

