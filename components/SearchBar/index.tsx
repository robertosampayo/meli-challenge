import React, { useState} from 'react'
import styles from './search-bar.module.scss'
import { CgSearch } from 'react-icons/cg';
import { useItem } from '../../context/items/itemState';
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function SearchBar() {

    const [product, searchProduct] = useState('');
    const router = useRouter();
    
    // Extrae el context de la aplicacion
    const context = useItem();
    const { setItems } = context;


    //  Lee los valores del formulario
    const handleChange: React.ChangeEventHandler<HTMLInputElement>  = e => {
        searchProduct(e.target.value);
    }



    const onSubmit = (e: React.SyntheticEvent): void =>  {
        e.preventDefault();
        // Inserta los productos de la busqueda en el state
        if (product) {
            
            setItems(product);
            router.push(`/items?search=${product}`);
        }
    }
  

  return (
    <div className={styles.nav} data-testid='search' data-cy="search">
        <div className={styles.search__bar__container}>
            <Link href='/'>
            
                <a>
                    <img src='/images/logo.png' />

                </a>
            </Link>
            <form
            onSubmit={onSubmit}>
                <input 
                    type='text'
                    placeholder='Nunca dejes de buscar'
                    name='search'
                    value={product}
                    onChange={handleChange}
                    
                />

                <button 
                    type='submit'   
                    data-testid='search-submit'    
                    data-cy="search-submit"             
                >
                    <CgSearch />
                </button>
        
            </form>

        </div>
    </div>
  )
}

