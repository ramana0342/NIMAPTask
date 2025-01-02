import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

function ProductList() {
   
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPageNumbers ,settotalPageNumbers] = useState([])
    const [numberOfPages,setnumberOfPages] = useState()
    const [displayData,setDisplayData] = useState([])

  useEffect(()=>{
           axios.get("https://nimaptask.onrender.com/getPaginationData/1").then((res)=>{
              console.log(res)
               settotalPageNumbers(res.data.buttonsArr)
               setnumberOfPages(res.data.lastNumberPage)
               setDisplayData(res.data.diplayData)
           })
  },[])

  const handlePageChange = (page)=>{
                   setCurrentPage(page)
                   axios.get(`https://nimaptask.onrender.com/getPaginationData/${page}`).then((res)=>{
                   console.log(res)
                   settotalPageNumbers(res.data.buttonsArr)
                   setnumberOfPages(res.data.lastNumberPage)
                   setDisplayData(res.data.diplayData)
   })
  }

  return (<>

<div class="row row-cols-1 row-cols-md-2 g-4" style={{width:"100%"}}>
             {displayData.map((item,index)=>{
                      return(<>
                               <div class="col">
    <div class="card" style={{margin:"10px 50px"}}>
      <div class="card-body">
        <h5 class="card-title">Category Name : {item.categoryName}</h5>
        <p class="card-text">category Id : {item.categoryID}</p>
        <h5 class="card-title">Product Name : {item.productName}</h5>
        <p class="card-text">product Id : {item.productID}</p>
      </div>
    </div>
  </div>

                      </>)  
             })}
  </div>



<div className='paginationDiv'>
                <div className='paginationInnerDiv'>
                <button className='paginationButtonsArrows'  onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={{color: currentPage === 1 ? 'gray' : 'black',cursor: currentPage === 1 ? 'not-allowed' : 'pointer' ,backgroundColor: currentPage === 1 ? "blanchedalmond":"aqua"  }}>
               <span style={{display:"flex",alignItems:"center",justifyContent:"center"}}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
  <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1"/>
</svg>Previous</span>
                </button>

                <button className='paginationButtons' onClick={() => handlePageChange(1)} disabled={currentPage === 1} style={{color: currentPage === 1 ? 'gray' : 'black',cursor: currentPage === 1 ? 'not-allowed' : 'pointer' ,backgroundColor: currentPage === 1 ? "blanchedalmond":"aqua"  }}>
                    1
                </button>

                {currentPage > 3 && <span>....</span>}

                {totalPageNumbers.map((pageNumber) => (
                    <button style={{margin:"0px",color: currentPage === pageNumber ? "gray" : "black",cursor: currentPage === pageNumber ? 'not-allowed' : 'pointer',backgroundColor: currentPage === pageNumber ? "blanchedalmond":"aqua" }} className='paginationButtons'
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={pageNumber === currentPage}
                      >
                        {pageNumber}
                    </button>
                ))}
                
                {currentPage < numberOfPages - 2 && <span>....</span>}
                {numberOfPages > 1 && (
                    <button style={{margin:"0px",color: currentPage == numberOfPages ? 'gray' : 'black',cursor: currentPage == numberOfPages ? 'not-allowed' : 'pointer',backgroundColor: currentPage == numberOfPages ? "blanchedalmond":"aqua"  }} className='paginationButtons' onClick={() => handlePageChange(numberOfPages)} disabled={currentPage == numberOfPages}>
                        {numberOfPages}
                    </button>
                )}

                <button className="paginationButtonsArrows" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage == numberOfPages} style={{color: currentPage == numberOfPages ? 'gray' : 'black',cursor: currentPage == numberOfPages ? 'not-allowed' : 'pointer' ,backgroundColor: currentPage == numberOfPages ? "blanchedalmond":"aqua" }}>
                   <span style={{ display: 'flex', alignItems: 'center',justifyContent:"center" }}>Next<svg style={{color:"black"}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
  <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1"/>
</svg></span>
                </button>
            </div>
            </div>


            
  </>)
}

export default ProductList