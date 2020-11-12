

import Loader from 'react-loader-spinner'
import styleLoader from './loader.module.scss'

export default function Loading() {



  return (
    <div className={styleLoader.loader__container}>

        <Loader
            type="TailSpin"
            color="#3483fa"
            height={100}
            width={100}
    
        />

    </div>
  )
}
