import React, { useState, useContext, useEffect } from 'react'
import styles from './products.module.scss'
import Link from 'next/link'
import imageDefault from '../Utils/imgDefaultProducts'
import PropTypes from 'prop-types'


export default function Product({item}) {



  return (

        <div className={styles.product} >
            <Link href={item && item.id? `/items/${item.id}`:'#'}  >
                <a>
                    <img data-testid="product-image" src={item && item.picture? item.picture:<imageDefault />} />
                    <div className={styles.products__details}>
                        <h1>$ {item && item.price ? (parseFloat(item.price[0].amount) + parseFloat(item.price[0].decimals)).toFixed(2): ''}</h1>
                        <h2>{item && item.title ? item.title: ''}</h2>
                    </div>
                    <div>
                        <span>{item && item.city ? item.city: ''}</span>

                    </div>

                </a>

            </Link>
        </div>
  )
}

Product.propTypes = {
    item: PropTypes.object.isRequired,
  }