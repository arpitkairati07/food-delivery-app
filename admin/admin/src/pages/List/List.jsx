import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const url = "http://localhost:5000";
  const[list,setList]=useState([]);
  const fetchList = async() =>{
    const response =await axios.get(`${url}/api/food/list`);
    // console.log(response.data)
    if(response.data.success){
      setList(response.data.data);
    }else{
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    console.log("Deleting Food ID:", foodId);
  
    if (!foodId) {
      toast.error("Invalid Food ID");
      return;
    }
  
    try {
      const response = await axios.delete(`${url}/api/food/remove/${foodId}`); // ✅ Pass ID in URL
      console.log("Response:", response);
  
      if (response.data.success) {
        toast.success("Food Removed Successfully");
        await fetchList();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Delete Error:", error.response);
      toast.error("Failed to delete food item");
    }
  };
  
  
  useEffect (()=>{
    fetchList();
  },[])


  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={() => {
  console.log("Clicked ID:", item._id);  // Debugging step
  removeFood(item._id);
}}>
  X
</p>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List