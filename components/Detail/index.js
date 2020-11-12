import React from 'react'
import styles from './detail.module.scss'
import ImageDefault from '../Utils/imgDefaultDetail'
import Loading from '../Loader'
import PropTypes from 'prop-types'
import Breadcrumb from '../Breadcrumb'

export default function Detail({item={}}) {



  return (



    
    <>

          
        <Breadcrumb />
        <div className={styles.detail}>
          
            {item.picture ? (

              <>
                <div className={styles.detail__product}>
                    {item.picture?
                      <img src={item.picture}  />
                      :
                      <ImageDefault />
                    }
                    
                    <div className={styles.detail__product__text}>
                        <p>Nuevo - {item.sold_quantity?item.sold_quantity:'0'} vendidos</p>
                        <h2>{item.title? item.title: ''}</h2>

                        <h1>$ {
                          item.price ? 
                            item.price[0].decimals > 0 ?
                              (parseFloat(item.price[0].amount) + parseFloat(item.price[0].decimals)).toFixed(2)
                              : item.price[0].amount
                            : '0'
                        }</h1>

                        <button>Comprar</button>
                    </div>
                </div>
                <div className={styles.detail__description}>
                    <h2>Descripción del producto</h2>
                    <p>{item.description? item.description:'Producto sin Descripción'}</p>
                </div>
              </>

          ):(
              <Loading />
            )
          }
        </div>
  


    </>
  )
}

Detail.propTypes = {
  item: PropTypes.object.isRequired,
}