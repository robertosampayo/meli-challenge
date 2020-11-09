import React, {useEffect, useState} from 'react'
import SearchBar from '../SearchBar'
import Breadcrumb from '../Breadcrumb'


export default function Layout({children}) {
  


  return (
    <>

        <SearchBar />
        <Breadcrumb />
        {children}
    </>
  )
}
