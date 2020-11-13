import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
import Detail from '../../components/Detail'
import Layout from '../../components/Layout'
import { Helmet } from "react-helmet";
import { useItem } from '../../context/items/itemState';
import ErrorPage from '../../components/ErrorPage'
import Loading from '../../components/Loader'
import { GetServerSideProps,InferGetServerSidePropsType } from 'next'


const Item = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {


  const { item: { item }, categories: { category: { path_from_root }} } = props;
  const [loading, setLoading] = useState(true);
  const context = useItem();
  const { setItem, setCategories } = context;


  useEffect(() => {
    
    if (item) { setLoading(false); setItem(item); setCategories(path_from_root); }

  }, [item])




  if (loading)  return (<Loading />) 

  return (

    
    
    <>
      
          <Helmet>
            <title>Mercado Libre - {`${item && item.title?item.title:''}`}</title>
            <meta name="description" content={`Item ${item && item.title?item.title:''}`} />
          </Helmet>
          <Layout categories={
              item && path_from_root?
                path_from_root
                :
                []

          }>

                  {item && path_from_root &&
                 
                 
                    <>
                      <Detail item={item}  />
                    
                    </>
                
                   

                  }

          </Layout>
   </>
    
  );
}

export default Item



export const getServerSideProps:GetServerSideProps = async ({query}) => {

      let dataItem = {
        item: {
          category_id: null
        } 
      };
      let dataCategories =  {
        category: {
          path_from_root: null          
        }
      }

      try {

          const resp1 = await fetch(`${process.env.BASE_URL}/api/items/${query.id}`);
          dataItem = await resp1.json()
          
          const resp2 = await fetch(`${process.env.BASE_URL}/api/categories/${dataItem?.item?.category_id}`);
          dataCategories = await resp2.json()



      } catch (error) {
          console.log(error);
      }  

  return {
    props: { 
      item: dataItem,
      categories: dataCategories
    }
  }
}