import SearchBar from '../SearchBar'
import PropTypes from 'prop-types'
import Breadcrumb from '../Breadcrumb'

type LayautProps = {
  categories: [],
  children: React.ReactNode
}

export default function Layout(props: LayautProps) {
  


  return (
    <>

        <SearchBar />
        {props.categories &&
          <Breadcrumb categories={props.categories} />
        }
        {props.children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}