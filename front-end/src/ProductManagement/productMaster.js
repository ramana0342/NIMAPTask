import React from 'react'
import { useState } from 'react'
import { Store } from '.'
import { useContext } from 'react'
import axios from 'axios'
import ReadProductsData from './productsDataRead'

function ProductMaster() {


    
    const [BtnsStatus ,setBtnsStatus] = useState({productBtnStatus:"",productDeletBtnStatus:"",editProductSymbolStatus:""})
    const [inputProductData,setInputProductData] = useState({categoryID:"",productTitle:""})
    const [id,setId] = useState({currentCategoryID:"",currentProductID:"",currentproductTitle:""})
    

    const {allData,setAllData ,apiCall,setApiCall} = useContext(Store)

  //  console.log(allData)

    function selectCategoryFun(){
            if(allData.length>0){
                       return <select value={inputProductData.categoryID}  class="form-select" onChange={(e)=>{setInputProductData({...inputProductData,categoryID:e.target.value})}} required>
                            <option value="">select Category</option>
                            {allData.map((item,index)=>{
                                    return <option value={item._id}>{item.categoryName}</option>
                            })}
                       </select>
            }
    }


    const handelProductSubmit=(e)=>{
            e.preventDefault()
            setBtnsStatus({...BtnsStatus,productBtnStatus:true})
        if(inputProductData.categoryID && inputProductData.productTitle){
            axios.post("http://localhost:8080/createProduct",inputProductData).then((res)=>{
                      //console.log(res)
                      if(res.data.message == "Success"){
                        setApiCall((prev)=>!prev)
                        setInputProductData({categoryID:"",productTitle:""})
                        setBtnsStatus({...BtnsStatus,productBtnStatus:""})   
                      }
            }).catch((err)=>{
                   console.log(err)
            })
        }else{
              alert("All Fields Required")
              setInputProductData({categoryID:"",productTitle:""})
        }

    }

    const handleEditProductFun=(e)=>{
        e.preventDefault()
                              if(id.currentCategoryID&&id.currentProductID&&inputProductData.categoryID&&inputProductData.productTitle){
                                       if(id.currentCategoryID != inputProductData.categoryID || id.currentproductTitle != inputProductData.productTitle ){
                                        setBtnsStatus({...BtnsStatus,productBtnStatus:true})
                                          axios.put(`http://localhost:8080/editProduct/${id.currentCategoryID}/${id.currentProductID}`,inputProductData).then((res)=>{
                                                  console.log(res)
                                                  if(res.data.message=="Success"){
                                                    setApiCall((prev)=>!prev)
                                                    setInputProductData({categoryID:"",productTitle:""})

                                                    setBtnsStatus({...BtnsStatus,editProductSymbolStatus:"",productBtnStatus:""});
                                                    

                                                  }
                                          })

                                       }

                              }
    }


    const deleteProductFun =(categoryID,productID)=>{
           // console.log(categoryID,productID)
                 if(categoryID&&productID){
                    //   console.log("123")
                         axios.delete(`http://localhost:8080/deleteProduct/${categoryID}/${productID}`).then((res)=>{
                                 // console.log(res)
                                 if(res.data.message=="Success"){
                                       setApiCall((prev)=>!prev)
                                       setBtnsStatus({...BtnsStatus,productDeletBtnStatus:""})
                                 }
                         }).catch((err)=>{
                                console.log(err)
                         })
                 }else{
                      alert("categoryID or Product ID is Missing")
                 }

    }

    function editproductsBtnfun(){
                 if(BtnsStatus.editProductSymbolStatus){
                  {return BtnsStatus.productBtnStatus ? <button class="btn btn-danger" type="button" disabled>  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> <span role="status">Editing...</span></button> 
                    : <button class="btn btn-warning" type='submit'>Edit Product</button>} 
                 }else{
                  {return BtnsStatus.productBtnStatus ? <button class="btn btn-primary" type="button" disabled>  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> <span role="status">Adding...</span></button> 
                    : <button class="btn btn-primary" type='submit'>Add Product</button>} 
                 }
    }

    


    const DisplayProductData = ()=>{
            
          return <ReadProductsData deleteProductFun={deleteProductFun} BtnsStatus={BtnsStatus} setBtnsStatus={setBtnsStatus}  setInputProductData={setInputProductData} setId={setId}/>
              
    }


  return (<>

         <div>
              <div className='categoryFormDiv'>
                <form onSubmit={BtnsStatus.editProductSymbolStatus ? handleEditProductFun : handelProductSubmit} style={{position:"fixed" , zIndex:"1000"}}>
                 {selectCategoryFun()}
                <input value={inputProductData.productTitle} type="text" class="form-control InputFiled" placeholder="Type Product Name"   onChange={(e)=>{setInputProductData({...inputProductData,productTitle:e.target.value})}} required/> 
                   {editproductsBtnfun()}
                </form>
              </div>


           {DisplayProductData()}






        </div>

  </>)
}

export default ProductMaster