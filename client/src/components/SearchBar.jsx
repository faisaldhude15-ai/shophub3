import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

import "../styles/searchBar.css";



const SearchBar = () => {


const [keyword,setKeyword] = useState("");

const navigate = useNavigate();





const handleSearch = (e)=>{


e.preventDefault();



if(keyword.trim()){


navigate(`/shop?search=${keyword}`);


}


};







return (

<form

className="search-bar"

onSubmit={handleSearch}

>




<input

type="text"

placeholder="Search products..."

value={keyword}

onChange={(e)=>setKeyword(e.target.value)}

/>





<button type="submit">


<FaSearch/>


</button>





</form>

);


};



export default SearchBar;