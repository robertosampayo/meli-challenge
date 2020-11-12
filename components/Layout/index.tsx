import SearchBar from '../SearchBar'
import PropTypes from 'prop-types'


export default function Layout({children}:{children: React.ReactNode}) {
  


  return (
    <>

        <SearchBar />
        {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}