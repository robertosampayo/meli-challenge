
import PropTypes from 'prop-types'
import styleLoader from './error.module.scss'

export default function ErrorPage({message}) {



  return (
    <div className={styleLoader.error} >

        <h2>{message}</h2>

    </div>
  )
}


ErrorPage.propTypes = {
    message: PropTypes.string.isRequired,
}

ErrorPage.defaultProps = {
    message: 'Upss!, ha ocurrido un error.'
};