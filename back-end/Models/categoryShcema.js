const mongoose = require("mongoose")


const categorySchema  = new mongoose.Schema({
       
      categoryName : {
           type:String,
           required:true
      },
      productsUnderCategory : {
            type :[{
                productName:{
                      type:String,
                      required:true
                }
            }],
         required:false    
      }

})



module.exports  = {
    CategoryData : mongoose.model("CategoryData" , categorySchema),
   
}