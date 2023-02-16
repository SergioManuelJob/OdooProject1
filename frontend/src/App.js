import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTask from "./components/AddTask";
import Task from "./components/Task";
import TasksList from "./components/TasksList";

import TaskService from "./services/TaskService";
import Projects from "./components/Projects";

function App() {

  useEffect(() => {
    let session_id = localStorage.getItem("session_id");
    if (!session_id) {
      TaskService.initSession().then(response => {
        localStorage.setItem("session_id", response.data.result.session_id.toString())
      })
      return
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/app" className="navbar-brand">
          <div className="task-logo" >
            <img src="https://play-lh.googleusercontent.com/pjUulZ-Vdo7qPKxk3IRhnk8SORPlgSydSyYEjm7fGcoXO8wDyYisWXwQqEjMryZ_sqK2" alt="tasks"/>
          </div>
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/app/projects"} className="nav-link">
              View Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/app/add"} className="nav-link">
              Add tasks
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/app" element={<TasksList />} />
          <Route path="/app/projects" element={<Projects />} />
          <Route path="/app/add" element={<AddTask />} />
          <Route path="/app/tasks/:id" element={<Task />} />
          <Route path="/" element={<Navigate to="/app" />} />
          <Route path="*" element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
