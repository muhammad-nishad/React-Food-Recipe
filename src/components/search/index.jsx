import { useEffect } from 'react';
import { useState } from 'react';
import './style.css'

const Search=(props)=>{
    const {searchData,apiCall,setApiCall}=props
    const [inputValue,setInputValue]=useState('')
    const handleSubmit=(event)=>{
        event.preventDefault()
        searchData(inputValue)

    }
    useEffect(()=>{
        if(apiCall){
            setInputValue('')
            setApiCall(false)

        }

    },[apiCall])
    return (
       <form className='search' onSubmit={handleSubmit} >
        <input type='text' value={inputValue} name='search' onChange={(e)=>{
            setInputValue(e.target.value)
        }} placeholder="search Recepies" />
        <button type="submit" >
            submit
        </button>
       </form>
    )
}

export default Search;