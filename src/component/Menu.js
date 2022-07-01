import sun from '../images/icon-sun.svg';
import night from '../images/icon-moon.svg'
import check from '../images/icon-check.svg';
import TodoList from './TodoList.js';
import Filter from './Filter.js';
import { useState,useEffect,useReducer,useRef } from 'react';
export default function Menu({theme,setTheme}){
    const [checked,isCheck] = useState(false);
    const [filter,setFilter] = useState("All");
    
    const task = useRef();
    useEffect(()=>{
        setTimeout(()=>{
            if(checked){
                
                isCheck(false);
            }
            
        },500);
        
    },[checked]);
    const reducer = (state,action)=>{
        switch(action.type){
            case 'add':
                if(task.current.value==""){
                    alert("please write something")
                    return[...state];
                }
                var name = task.current.value;
                var complete = false;
                var taskId =Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5);
                return [...state,{taskId,name,complete}];
            case 'complete':
                return state.map(todo=>{
                    if(todo.taskId==action.id){
                        return { ...todo, complete: !todo.complete };
                    }
                    else{
                        return todo;
                    }
                })
            case 'clear':
                var temp =[...state];
                state.map(todo=>{
                    if(todo.complete){
                        temp.splice(temp.indexOf(todo),1);
                    }
                });
                return temp;
        }
    }
    const handleComplete = (todo)=>{
        dispatch({ type: "complete", id: todo});
    }
    const handleClear = ()=>{
        dispatch({type:"clear"});
        console.log(todo);
    }
    const [todo,dispatch] = useReducer(reducer,[{taskId:"uhu3Z",name:"sleep",complete:true},{taskId:"u2uqZ",name:"eat",complete:false},{taskId:"aaaqZ",name:"code",complete:false}]);
    return(
    <>
        
        <div className='todo-box'>
            <h1>todo</h1>
            <img onClick={()=>setTheme(false)} className={`${theme?"":"hide-icon"}`} src={sun} alt="light theme switch"/>
            <img onClick={()=>setTheme(true)} className={`${theme?"hide-icon":""}`} src={night} alt="dark theme swithch"/>
            <div className='todo-creator'>
                <input className={`task-input ${theme?"dark-theme":"light-theme"}`} ref={task} type="text" placeholder='Create new todos...'/>
                <div className='checker' onClick={()=>{isCheck(true);dispatch({type:"add"})}}>
                    <div className={`checked ${checked ? "" : "hide"}`}>
                        <img src = {check} alt="check"/>
                    </div>
                    
                </div>
            </div>
            
            <TodoList list={todo} handleComplete={handleComplete} filter={filter}/>
            <Filter todos={todo} setFilter={setFilter} filter={filter} handleClear={handleClear} />
        </div>
        <div className='note'>Drag and drop to reorder list</div>
    </>
    );
}