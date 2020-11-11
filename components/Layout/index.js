import React, {useEffect, useState} from 'react'
import SearchBar from '../SearchBar'
import PropTypes from 'prop-types'


export default function Layout({children}) {
  


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