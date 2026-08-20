function Filters({

category,

setCategory,

brand,

setBrand,

sort,

setSort

}){

return(

<div className="filters">

<h3>Category</h3>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
>

<option value="">All</option>

<option>Mobiles</option>

<option>Laptop</option>

<option>Electronics</option>

<option>Fashion</option>

</select>

<h3>Brand</h3>

<select
value={brand}
onChange={(e)=>setBrand(e.target.value)}
>

<option value="">All</option>

<option>Apple</option>

<option>Samsung</option>

<option>Sony</option>

<option>HP</option>

<option>Dell</option>

</select>

<h3>Sort</h3>

<select
value={sort}
onChange={(e)=>setSort(e.target.value)}
>

<option value="">Newest</option>

<option value="low">Price Low</option>

<option value="high">Price High</option>

<option value="name">Name</option>

</select>

</div>

);

}

export default Filters;