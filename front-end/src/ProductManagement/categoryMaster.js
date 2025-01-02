import React, { useState } from 'react';
import axios from 'axios';
import { Store } from '.';
import { useContext } from 'react';

function CategoryMaster() {

    const [categoryInput, setCategoryInput] = useState("")
    const [editCategoryInput, setEditCategoryInput] = useState("")
    const [BtnStatus, setBtnStatus] = useState({ addCategoryBtnStatus: "", editCategoryBtnStatus: "", editBtnInsideEditFunStatus: "", deleteCatrgoryBtnStatus: "" })
    const { allData, setAllData, setApiCall } = useContext(Store)


    const handelCategorySubmit = (e) => {
        e.preventDefault()
        setBtnStatus({ ...BtnStatus, addCategoryBtnStatus: true })

        axios.post("http://localhost:8080/createCategory", { categoryName: categoryInput }).then((res) => {
            console.log(res)
            if (res.data.message == "Success") {
                setApiCall((prev) => !prev)
                setCategoryInput("")
                setBtnStatus({ ...BtnStatus, addCategoryBtnStatus: "" })
            }


        }).catch((err) => {
            console.log(err)
        })

    }

    const handelEditCategorySubmit = (e) => {
        e.preventDefault()
        if (editCategoryInput) {
            setBtnStatus({ ...BtnStatus, editBtnInsideEditFunStatus: true })
            axios.put("http://localhost:8080/editCategory", { categoryID: BtnStatus.editCategoryBtnStatus, categoryTitle: editCategoryInput }).then((res) => {
                // console.log(res)
                if (res.data.message == "Success") {
                    setApiCall((prev) => !prev)
                    setBtnStatus({ ...BtnStatus, editBtnInsideEditFunStatus: "" })
                    setBtnStatus({ ...BtnStatus, editCategoryBtnStatus: "" })
                    // setTimeout(()=>{ setBtnStatus({...BtnStatus,editCategoryBtnStatus:""}) },2000)

                }

            }).catch((err) => {
                console.log(err)
            })

        }
    }



    const editFunction = () => {
        return (<form onSubmit={handelEditCategorySubmit} style={{ display: "flex", padding: "0px", margin: "0px" }}>
            <input value={editCategoryInput} type="text" class="form-control editInputFiled" placeholder="Type Category Name" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => { setEditCategoryInput(e.target.value) }} />
            {BtnStatus.editBtnInsideEditFunStatus ? <button class="btn btn-primary" type="button" disabled>  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> <span role="status">Editing...</span></button>
                : <button class="btn btn-primary" type='submit'>Edit</button>}
        </form>)
    }


    const deleteCatrgoryFun = (categoryId) => {
        if (categoryId) {

            let userAgree = window.confirm("Are you sure you want to delete this category? The products under this category will be moved to 'Uncategorized Products'.This action cannot be undone.")
            if (userAgree) {
                setBtnStatus({ ...BtnStatus, deleteCatrgoryBtnStatus: categoryId })
                axios.delete(`http://localhost:8080/deleteCategory/${categoryId}`).then((res) => {
                    console.log(res)
                    if (res.data.message == "Success") {
                        setApiCall((prev) => !prev)
                        setBtnStatus({ ...BtnStatus, deleteCatrgoryBtnStatus: "" })
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }




    return (
        <>

            <div>
                <div className='categoryFormDiv'>
                    <form onSubmit={handelCategorySubmit}>
                        <input value={categoryInput} type="text" class="form-control InputFiled" placeholder="Type Category Name" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => { setCategoryInput(e.target.value) }} />
                        {BtnStatus.addCategoryBtnStatus ? <button class="btn btn-primary" type="button" disabled>  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> <span role="status">Adding...</span></button>
                            : <button class="btn btn-primary" type='submit'>Add Category</button>}
                    </form>
                </div>




                <div className='displayCategoryListDiv' style={{ display: "flex", justifyContent: 'center' }}>
                    <div class="row row-cols-1 row-cols-md-4 g-4" style={{ width: "100%" }}>
                        {allData.map((item, index) => {
                            if (item._id !== "6773946187d3ebce891b032c") {
                                return (<>
                                    <div class="col">
                                        <div class="card" >
                                            <div class="card-body">
                                                <h5 class="card-title">Category Name : {item.categoryName}</h5>
                                                {BtnStatus.editCategoryBtnStatus == item._id ? editFunction() : <button className='cedBTn' onClick={() => { setBtnStatus({ ...BtnStatus, editCategoryBtnStatus: item._id }); setEditCategoryInput(item.categoryName) }}>Edit</button>}<br></br>
                                                {BtnStatus.deleteCatrgoryBtnStatus == item._id ? <button class="btn btn-primary" type="button" disabled>  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> <span role="status">Deleting...</span></button> : <button className="cedBTn" onClick={() => { deleteCatrgoryFun(item._id) }}>Delete</button>}
                                            </div>
                                        </div>
                                    </div>
                                </>)
                            }
                        })}
                    </div>

                </div>


            </div>


        </>


    )
}

export default CategoryMaster;