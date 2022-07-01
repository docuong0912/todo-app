import check from '../images/icon-check.svg';
import {themeContext} from '../App.js';
import { useState,useEffect,useRef,useContext } from 'react';
import Sortable from 'sortablejs'; 
export default function TodoList({list,handleComplete,filter}){
    const [activeList,setActiveList] = useState(list.filter((task)=>!task.complete));
    const [completedList,setCompletedList] = useState(list.filter((task)=>task.complete));
    const task = useRef([]);
    const theme = useContext(themeContext);
    useEffect(()=>{
        setActiveList(list.filter((task)=>!task.complete))
        setCompletedList(list.filter((task)=>task.complete))
    },[list]);
    useEffect(()=>{
        Sortable.create(document.getElementById("sortlist"),{
            animation:150,
            ghostClass: 'blue-background-class'
        });
    },[])
   return(
    <div className={`container ${theme?"dark-theme":"light-theme"}`} id="sortlist">
        {(filter=="Active"? activeList:filter=="Completed"? completedList:list).map((task,key,arr)=>{
            return(
                <div  key = {key}>
                    <div ref={el=>task[key]=el} className={`task ${theme?"dark-theme":"light-theme"} ${task.complete?"completed":""}`}>
                        <p>{task.name}</p>
                        
                        <div className="checker-task" onClick={()=>handleComplete(task.taskId)}>
                            <div className={`checked ${task.complete ? "" : "hide"}`}>
                                <img src = {check} alt="check"/>
                             </div>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
   );
}