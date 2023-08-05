import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Search() {
    const navigate =  useNavigate()
    const location = useLocation()
    const [keyword,setKeyWord]= useState("")
    const searhHandle = (e)=>{
        e.preventDefault();
        navigate(`/search/${keyword}`)
    }

    const clearKeyword = ()=>{
      setKeyWord("")
    }

    useEffect(()=>{
      if (location.pathname  == '/') {
        clearKeyword()
      }
    },[location])

  return (
    <form onSubmit={searhHandle}>
         <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          value={keyword}
          onChange={(e)=>{setKeyWord(e.target.value)}}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
   
  )
}
