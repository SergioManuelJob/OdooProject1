import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TaskDataService from "../services/TaskService";

const Task = props => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialTaskState = {
    id: null,
    name: "",
    user: "",
    project: "",
    stage: "",
    status: "",
    description: ""
  };
  const [currentTask, setCurrentTask] = useState(initialTaskState);
  const [message, setMessage] = useState("");

  const getTask = id => {
    TaskDataService.get(id)
      .then(response => {
        setCurrentTask(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getTask(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const updateTask = () => {
    TaskDataService.update(currentTask.id, currentTask)
      .then(response => {
        setMessage("The business was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTask = () => {
    TaskDataService.remove(currentTask.id)
      .then(response => {
        navigate("/app");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTask ? (
        <div className="edit-form">
          <h4>Task</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={currentTask.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="user">User</label>
              <input
                type="text"
                className="form-control"
                id="user"
                required
                value={currentTask.user}
                onChange={handleInputChange}
                name="user"
              />
            </div>

            <div className="form-group">
              <label htmlFor="project">Project</label>
              <input
                type="text"
                className="form-control"
                id="project"
                required
                value={currentTask.project}
                onChange={handleInputChange}
                name="project"
              />
            </div>

            <div className="form-group">
              <label htmlFor="stage">Stage</label>
              <input
                type="text"
                className="form-control"
                id="stage"
                required
                value={currentTask.stage}
                onChange={handleInputChange}
                name="stage"
              />
            </div>


            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                className="form-control"
                id="status"
                required
                value={currentTask.status}
                onChange={handleInputChange}
                name="status"
              />
            </div>


            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={currentTask.description ? currentTask.description.split('>')[1].split('<')[0] : "No description added"}
                onChange={handleInputChange}
                name="description"
              />
            </div>
          </form>
          
          <button className="badge badge-danger mr-2" onClick={deleteTask}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTask}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Business...</p>
        </div>
      )}
    </div>
  );
};

export default Task;
