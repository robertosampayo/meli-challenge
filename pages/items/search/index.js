import { useRouter } from 'next/router'
import Detail from '../../../components/Detail'
import Layout from '../../../components/Layout'
import Products from '../../../components/Products'
import { Helmet } from "react-helmet";

const Item = () => {

  return (
    <>
      <Helmet>
        <title>Mercado Libre - Productos</title>

      </Helmet>
      <Layout>
        <Products />   
      </Layout>
    
    </>
  );
}

export default Item