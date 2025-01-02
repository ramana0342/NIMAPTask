const express = require("express")
const route = express.Router();

const {CategoryData} = require("../Models/categoryShcema")


route.post("/createProduct",async(req,res)=>{
        const {categoryID ,productTitle} = req.body
              if(categoryID && productTitle){
                     
                      try{
                          let productCategoryData = await CategoryData.findById(categoryID)
                         // console.log(productCategoryData)
                          if(productCategoryData){
                                   productCategoryData.productsUnderCategory.push({productName:productTitle})
                                   let resultData = await productCategoryData.save()
                                   return res.json({
                                          message:"Success",
                                          resultData
                                   })
                          }
                            

                      }catch(error){
                            return res.json({
                                    message:"Failed",
                                    error
                            })
                      }
                  
                

              }else{
                 return res.json({
                          message:"All Fields Required"
                 })
              }


})


route.delete("/deleteProduct/:categoryID/:productID",async(req,res)=>{
                    let {categoryID,productID} = req.params
                      
                    if(categoryID&&productID){
                        //console.log(categoryID,productID)
                          try{
                            let categoryData = await CategoryData.findById(categoryID)
                                
                            if(categoryData){
                              //  console.log(categoryData)
                                   let productIndex =  categoryData.productsUnderCategory.findIndex((product)=>{
                                                          if(product._id == productID){
                                                                 return true
                                                          }
                                   })
                                    categoryData.productsUnderCategory.splice(productIndex,1)
                                            let result = await categoryData.save()
                                            return res.json({
                                                    message:"Success",
                                                    result
                                            })
                                   
                            }else{
                                  return res.json({
                                       message:"Category Not Found"
                                  })
                            }


                          }catch(error){
                                    return res.json({
                                           message:"Failed",
                                           error
                                    })
                          }
                    }
})

route.put("/editProduct/:currentCategoryID/:currentProductID",async(req,res)=>{
                     const {currentCategoryID,currentProductID} = req.params;
                    // console.log(currentCategoryID,currentProductID)
                   //  console.log(req.body)
                     const {categoryID , productTitle} = req.body
                     if(currentCategoryID == categoryID){
                          let categoryData = await CategoryData.findById(currentCategoryID)
                                    categoryData.productsUnderCategory=categoryData.productsUnderCategory.map((item,index)=>{
                                                  if(item._id == currentProductID){
                                                          return {productName:productTitle}
                                                  }
                                                  return item
                                    })
                                    let result = await categoryData.save()
                                    return res.json({
                                          message:"Success",
                                          result
                                    })
                          
                     }else if(currentCategoryID != categoryID){
                        let categoryData = await CategoryData.findById(categoryID)
                        let presentCategoryData = await CategoryData.findById(currentCategoryID)
                        let productData = presentCategoryData.productsUnderCategory.find((item)=> item._id == currentProductID)

                            categoryData.productsUnderCategory.push({...productData,productName:productTitle})
                            await categoryData.save()
                            presentCategoryData.productsUnderCategory = presentCategoryData.productsUnderCategory.filter(item => item._id.toString() !== currentProductID);
                            await presentCategoryData.save()

                            return res.json({
                                  message:"Success"
                            })
                     }
})


module.exports = route