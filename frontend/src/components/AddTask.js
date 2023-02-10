import React, { useState } from "react";
import TaskDataService from "../services/TaskService";

const AddTask = () => {
  const initialTaskState = {
    id: null,
    name: "",
    project: "",
    user: "",
    description: ""
  };
  const [Task, setTask] = useState(initialTaskState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTask({ ...Task, [name]: value });
  };

  const saveTask = () => {
    var data = {
      name: Task.name,
      user: Task.user,
      project: Task.project,
      stage: Task.stage,
      status: Task.status,
      description: Task.description
    };

    TaskDataService.create(data)
      .then(response => {
        setTask({
          name: response.data.name,
          user: response.data.user,
          project: response.data.project,
          stage: response.data.stage,
          status: response.data.status,
          description: response.data.description
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTask = () => {
    setTask(initialTaskState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTask}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={Task.name}
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
              value={Task.user}
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
              value={Task.project}
              onChange={handleInputChange}
              name="project"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stage">Stage</label>
            <select className="form-control" name="kanban_state" type="text" onChange={handleInputChange} required>
              <option value="inprogress">In Progress</option>
              <option value="ready">Ready</option>
              <option value="blocked">Blocked</option>
              <option selected value="notassigned">Not Assigned</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>


          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select className="form-control" name="kanban_state" type="text" onChange={handleInputChange} required>
              <option value="inprogress">In Progress</option>
              <option value="ready">Ready</option>
              <option value="blocked">Blocked</option>
              <option selected value="notassigned">Not Assigned</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>


          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={Task.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>


          <div className="form-group">
            <label htmlFor="stage">Stage</label>
            <input
              type="text"
              className="form-control"
              id="stage"
              required
              value={Task.stage}
              onChange={handleInputChange}
              name="stage"
            />
          </div>

          <button onClick={saveTask} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTask;
