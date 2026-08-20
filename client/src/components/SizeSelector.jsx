import { useState } from "react";

import "../styles/sizeSelector.css";


const SizeSelector = ({ sizes = [], onSelect }) => {


    const [selected,setSelected] = useState("");



    const handleSelect = (size)=>{


        setSelected(size);


        if(onSelect){

            onSelect(size);

        }


    };




    return (

        <div className="sizeSelector">


            <h3>
                Select Size:
            </h3>



            <div className="sizeList">


            {

                sizes.length > 0 ?

                (

                    sizes.map((size,index)=>(


                        <button

                        key={index}

                        className={
                            selected === size
                            ?
                            "sizeBtn active"
                            :
                            "sizeBtn"
                        }


                        onClick={()=>handleSelect(size)}

                        >

                            {size}

                        </button>


                    ))

                )


                :

                (

                    <p className="noSize">
                        No sizes available
                    </p>

                )

            }


            </div>


        </div>

    );


};


export default SizeSelector;