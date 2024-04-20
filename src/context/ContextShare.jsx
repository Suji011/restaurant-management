import React, { createContext, useState } from 'react'


export const  updateFoodListResponseContext=createContext({})

function ContextShare({children}) {

    const [updateFoodListResponse,setupdateFoodListResponse]=useState([])
  return (
    <>

    <updateFoodListResponseContext.Provider value={{updateFoodListResponse,setupdateFoodListResponse}}>
        {children}
    </updateFoodListResponseContext.Provider>
    </>
  )
}

export default ContextShare