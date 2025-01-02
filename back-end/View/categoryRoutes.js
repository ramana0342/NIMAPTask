const express = require("express")
const route = express.Router();

const {CategoryData} = require("../Models/categoryShcema")



route.get("/getData", async(req,res)=>{
               try{
                      let productsData = await CategoryData.find({})
                      return res.json({
                        productsData 
                      })
               }catch (error){
                      return res.json({
                            message:"Failed",
                            error
                      })
               }
})



route.post("/createCategory", async (req, res) => {
    //console.log(req.body)
    if (req.body.categoryName) {


        try {
            let CreateNewCategory = new CategoryData(req.body)
            let CreatedCateogry = await CreateNewCategory.save()

            res.json({
                message: "Success",
                CreatedCateogry
            })

        } catch (error) {
            res.json({
                message: "Failed",
                error
            })
        }
    } else {
        return res.json({
            message: "Category name is required"

        })
    }
})


route.put("/editCategory", async(req,res)=>{
                const {categoryID , categoryTitle} = req.body
               // console.log(categoryID,categoryTitle)
               if(categoryID && categoryTitle){
                try{
                    let editedCategoryData = await CategoryData.findByIdAndUpdate(categoryID,{categoryName:categoryTitle})
                    // console.log(editedCategoryData)
                    return res.json({
                            message:"Success",
                            editedCategoryData
                    })

                }catch(error){
                      // console.log(error)
                      return res.json({
                            message:"Failed",
                            error
                      })
                }
            }else{
                   return res.json({
                       message:"Some Data is Missing"
                   })
            }
})

route.delete("/deleteCategory/:id",async(req,res)=>{
             let categoryID = req.params.id
              if(categoryID){
                      try{
                          let categoryData = await CategoryData.findById(categoryID)
                         // console.log(categoryData)
                          
                          if(categoryData.productsUnderCategory.length>0){
                              
                                 let UnCategoryData = await CategoryData.findById("6773946187d3ebce891b032c")
                                // console.log(UnCategoryData)
                                 UnCategoryData. productsUnderCategory.push(...categoryData.productsUnderCategory)
                                 await UnCategoryData.save()
                                 let deletedCategoryData = await CategoryData.findByIdAndDelete(categoryID) 

                                 return res.json({
                                         message:"Success",
                                         deletedCategoryData
                                 })

                                 
                          }else{
                            let deletedCategoryData = await CategoryData.findByIdAndDelete(categoryID) 
                            return res.json({
                                message:"Success",
                                deletedCategoryData
                        })
                          }

                      }catch(error){

                      }
              }
})


module.exports = route