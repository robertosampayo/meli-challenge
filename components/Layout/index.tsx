import React from 'react'
import SearchBar from '../SearchBar'
import Breadcrumb from '../Breadcrumb'


export default function Layout({children} : {children: React.ReactNode}) {


  return (
    <>

        <SearchBar />
        <Breadcrumb />
        {children}
    </>
  )
}
