import "../styles/pagination.css";


const Pagination = ({
currentPage,
totalPages,
onPageChange
}) => {



return (

<div className="pagination">


<button

disabled={currentPage===1}

onClick={()=>onPageChange(currentPage-1)}

>

Prev

</button>




{

Array.from(
{
length:totalPages
},
(_,index)=>index+1

)

.map(page=>(


<button

key={page}

className={
currentPage===page
?
"active"
:
""
}


onClick={()=>onPageChange(page)}

>

{page}

</button>


))


}




<button

disabled={currentPage===totalPages}

onClick={()=>onPageChange(currentPage+1)}

>

Next

</button>



</div>

);


};


export default Pagination;