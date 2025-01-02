const express = require("express")
const route = express.Router()

const {CategoryData} = require("../Models/categoryShcema")

route.get("/getPaginationData/:Page",async(req,res)=>{
              let currentPage = req.params.Page
            //  console.log(req.params)
             // console.log(currentPage)
               let CategoryallData = await CategoryData.find({})
              // console.log(allData)
              let productsData=[]
               CategoryallData.map((category)=>{
                                   if(category.productsUnderCategory.length>0){
                                                category.productsUnderCategory.map((product)=>{
                                                    productsData.push({categoryID:category._id,categoryName:category.categoryName,productID:product._id,productName:product.productName})
                                              })
                                   }
               })
               //console.log(productsData.length)
               let dataPerPage = 4;
               let numberOfPages = Math.ceil(productsData.length/dataPerPage)

               var allPageNumbers = []
               let totalButtonsToShow=3
        
        
                let startPage = Math.max(2, currentPage - 1);
                let endPage = Math.min(numberOfPages - 1, currentPage + 1); 
        
               
                if (currentPage == 1) {
                    endPage = Math.min(totalButtonsToShow, numberOfPages - 1);
                } else if (currentPage == numberOfPages) {
                    startPage = Math.max(2, numberOfPages - totalButtonsToShow);
                }
                    
                     for(let i=startPage;i<=endPage;i++){
                           allPageNumbers.push(i)
                     }
                
                     const indexOfLastItem = currentPage*dataPerPage;
                     const indexOfFirstItem = indexOfLastItem-dataPerPage;
                     var curentItems = await productsData.slice(indexOfFirstItem,indexOfLastItem)
                   // console.log(curentItems.length)

                    return res.json({
                              diplayData:curentItems,
                              buttonsArr:allPageNumbers,
                              lastNumberPage:numberOfPages
                    })
                

})


module.exports = route