import { string } from "prop-types";
import React, { useEffect } from "react";
import { useState } from "react";

const user = "angelaruiz93"

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");


  const getTasks =() =>{
    const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch("https://playground.4geeks.com/todo/users/angelaruiz93", requestOptions)
    .then((response) => response.json())
    .then((result) => setTasks(result.todos))
    .catch((error) => console.error(error));
  }
  
  useEffect(() => {
    getTasks()
  },[])
  

  const deleteTodos = (id) => {

const requestOptions = {
  method: "DELETE",
};

fetch(`https://playground.4geeks.com/todo/todos/${id}`, requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
  }


    const handlerKeyDown = (e) => {
      if (e.key === "Enter" && inputValue !== "") {
        createToDo();     
        setInputValue(""); 
      }
    };

    const inputHandler = (e) => {
      setInputValue(e.target.value);
      console.log(e.target.value)
    };

    const createToDo =() => {

      const myHeaders = new Headers();
myHeaders.append("accept", "application/json");
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  label: inputValue,
  is_done: false
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://playground.4geeks.com/todo/todos/angelaruiz93", requestOptions)
  .then((response) => response.json())
  .then((result) => setTasks([...tasks, result]))
  .catch((error) => console.error(error));
    }
    
  const handleDelete = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    deleteTodos(id)
    setTasks(newTasks);
  };



  return (
    <div className="container mt-5">
      <h1 className="display-1 text-center text-black-50">to do's</h1>
      <div className="row justify-content-center mt-4">
        <div className="col-12 col-md-8">
          <div className="shadow p-4 bg-white rounded">
            <div className="input-group mb-4">
              <input
                className="form-control border-light"
                value={inputValue}
                onKeyDown={(e) => handlerKeyDown(e)}
                type="text"
                placeholder="What needs to be done?" 
                onChange={(e) => inputHandler(e)}
              />
            </div>
            <ul className="list-group">
              {tasks.map((task, index) => {
                return(
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {task.label}
                  <button
                    onClick={() => handleDelete(task.id)}
                    type="button"
                    className="btn btn-danger btn-sm"
                  >
                    X
                  </button>
                </li>
 )})}
            </ul>
            <div className="row mt-3">
              <div className="col text-start">
                <div className="item">{tasks.length} items left</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;