import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";


const spinner = ({message=''}) => {
    return (
        <div className='spinner'> 
          <ClipLoader 
              css={css}
              size={180}
              color={"#3483FA"}
          
          />
          <p>{message?message:'Cargando ...'}</p>
        </div>


    )
}



export default spinner