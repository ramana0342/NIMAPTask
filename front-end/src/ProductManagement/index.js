import React, { useEffect, useState } from 'react'
import {BrowserRouter , Routes ,Route, NavLink } from "react-router-dom"


import ProductList from './productList';
import ProductMaster from './productMaster';
import CategoryMaster from './categoryMaster';

import "./index.css"
import axios from 'axios';
import { createContext } from 'react';

export const Store = createContext()
function Index() {

    const[allData,setAllData] = useState([])
    const[apiCall,setApiCall] = useState(false)
    

    useEffect(()=>{
               axios.get("https://nimaptask.onrender.com/getData").then((res)=>{
                    // console.log(res)
                     setAllData(res.data.productsData)
               }).catch((err)=>{
                    // console.log(err)
               })
    },[apiCall])
    console.log(allData)


  return (<>
  <Store.Provider value={{allData,setAllData,apiCall,setApiCall}}>
<BrowserRouter>
     <div className='navBar'>
          
            <NavLink className="navLinks" to="/categoryMaster">CategoryMaster</NavLink>
            <NavLink className="navLinks" to= "/productMaster" >ProductMaster</NavLink>
            <NavLink className="navLinks" to="/"> ProductList</NavLink>
     </div>

  <Routes>
      <Route path="/"  element={<ProductList/>}/>
      <Route path='/productMaster' element={<ProductMaster/>} />
      <Route path="/categoryMaster" element = {<CategoryMaster/>} />
  </Routes>

     </BrowserRouter>  
     </Store.Provider>
  </>
   
  )
}

export default Index;