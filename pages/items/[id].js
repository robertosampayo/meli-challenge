import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Detail from '../../components/Detail'
import Layout from '../../components/Layout'
import { Helmet } from "react-helmet";
import { useItem } from '../../context/items/itemState';
import useMounted from '../../utils/useMounted'

const Item = () => {
  const router = useRouter();
  const { id } = router.query;

  // Obtenemos el context y el State global
  const context = useItem();
  const { item, setCurrentItem } = context;

  // Obtenemos el ID del item
  useEffect(() => {

    if (id) { getItemInfo(id); }
    
  }, [id, item]);

  // Pasamos el item al State
  const getItemInfo = async (id) => {
    setCurrentItem(id);
  }

  const isMounted = useMounted();

  return (
    <>
      <Helmet>
        <title>Mercado Libre - {`${item.title}`}</title>
        <meta name="description" content={`Item ${item.title}`} />
      </Helmet>
      <Layout>
        {isMounted ? (

          <Detail item={item}  />
        ):(
            <p>Loading ...</p>
          )
        }
      </Layout>
    
    </>
  );
}

export default Item