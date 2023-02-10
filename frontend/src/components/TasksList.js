import React, { useState, useEffect } from "react";
import TaskDataService from "../services/TaskService";
import { Link } from "react-router-dom";
import "./Tasks.css"

const TasksList = () => {
  const [Tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveTasks();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveTasks = () => {
    TaskDataService.getAll()
      .then(response => {
        setTasks(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTasks();
    setCurrentTask(null);
    setCurrentIndex(-1);
  };

  const setActiveTask = (Task, index) => {
    setCurrentTask(Task);
    setCurrentIndex(index);
  };

  const removeAllTasks = () => {
    TaskDataService.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTask = () => {

    if (searchName === '') {
      refreshList();
      return;
    }

    TaskDataService.findByTask(searchName)
      .then(response => {
        setTasks(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTask}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="list col-md-7">
        <h4>Tasks List</h4>

        <ul className="list-tasks ">
          {Tasks &&
            Tasks.map((Task, index) => (
              <div className={
                "card " + (index === currentIndex ? "active" : "")
              } key={index}>
                <div className="card-body">
                  <h2 className="card-title">{Task.name}</h2>
                  <p className="card-description">Assigned: {Task.user}</p>
                </div>
                <button className="card-btn" onClick={() => setActiveTask(Task, index)}>View details</button>
              </div>
            ))}
        </ul>

        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTasks}
        >
          Remove All
        </button> */}
      </div>
      <div className="col-md-5">
        {currentTask ? (
          <div>
            <h4>Details</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentTask.name}
            </div>
            <div>
              <label>
                <strong>User:</strong>
              </label>{" "}
              {currentTask.user}
            </div>
            <div>
              <label>
                <strong>Project:</strong>
              </label>{" "}
              {currentTask.project}
            </div>
            <div>
              <label>
                <strong>Stage:</strong>
              </label>{" "}
              {currentTask.stage}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTask.status}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTask.description ? currentTask.description.split('>')[1].split('<')[0] : "Nothing to see here."}
            </div>
            <Link
              to={"/app/tasks/" + currentTask.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Details...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksList;
