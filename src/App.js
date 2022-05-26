import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { AddTodo } from "./MyComponents/AddTodo";
import { Footer } from "./MyComponents/Footer";
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";

const PropsPage = () => {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    console.log("i am ondelete of todo", todo);
    //Deleting this way in React does not work
    // let index = todos.indexof(todo);
    // todos.splice(index, 1);

    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const addTodo = (title, desc) => {
    console.log("I am adding this Todo", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  };

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
    </>
  );
};

function App() {
  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={false} />

        <Routes>
          <Route path="/" element={<PropsPage />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
