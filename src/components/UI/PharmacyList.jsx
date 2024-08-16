import React from 'react'
import  PharmacyCard  from './PharmacyCard'


const PharmacyList = ({data}) => {
  return (
    <>
    {
      data?.map((item, index)=>(

        < PharmacyCard item={item} key={index} />
      
      ))
    }
      </>
  )
}

export default PharmacyList