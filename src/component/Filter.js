import { useState,useEffect,useContext } from "react";
import { themeContext } from "../App";
export default function Filter({todos,setFilter,handleClear,filter}){
    const theme = useContext(themeContext);
    const [noDone,setNoDone] = useState(0);
    useEffect(()=>{
        setNoDone(0)
        todos.map(todo=>{
            if(!todo.complete){
                setNoDone(nodone=>nodone+1);
            }
        })
    },[todos]);
    return(
    <>
     <div className={`filter-container ${theme?"dark-theme":"light-theme"}`}>
        <div className="total">
            <p>{noDone} {noDone>1?"items":"item"} left</p>
        </div>
        <div className="filter" >
            <p className={`${filter == "All" ? "active":""}`} onClick={()=>setFilter("All")}>All</p>
            <p className={`${filter == "Active" ? "active":""}`} onClick={()=>setFilter("Active")}>Active</p>
            <p className={`${filter == "Completed" ? "active":""}`} onClick={()=>setFilter("Completed")}>Completed</p>
        </div>
        <div className="clear">
            <p onClick={()=>handleClear()}>Clear Completed</p>
        </div>
     </div>
     <div className={`filter-outside ${theme?"dark-theme":"light-theme"}`} >
            <p className={`${filter == "All" ? "active":""}`} onClick={()=>setFilter("All")}>All</p>
            <p className={`${filter == "Active" ? "active":""}`} onClick={()=>setFilter("Active")}>Active</p>
            <p className={`${filter == "Completed" ? "active":""}`} onClick={()=>setFilter("Completed")}>Completed</p>
        </div>
    </>
    );
}