import React, { useState, useEffect } from "react";
import TaskDataService from "../services/TaskService";

const AddTask = () => {
  const initialTaskState = {
    id: null,
    name: "",
    user_id: "",
    project_id: "",
    stage_id: "",
    kanban_state: "",
    description: ""
  };
  const [project, setProject] = useState([]);
  const [task, setTask] = useState(initialTaskState);
  const [submitted, setSubmitted] = useState(false);
  const [users, setUsers] = useState([]);
  const [stages, setStages] = useState([]);
  // const [status, setStatus] = useState([]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleInputChangeOption = event => {
    const { name, value } = event.target;
    console.log(name + " - " + value);
    setTask({ ...task, [name]: +value });
  };
  const handleInputChangeKanban = event => {
    const { name, value } = event.target;
    console.log(name + " - " + value);
    setTask({ ...task, [name]: value });
  };

  const getUsers = () => {
    TaskDataService.getAllUsers().then(response => {
      setUsers(response.data.result.response)
    })
  }

  const getProjects = () => {
    TaskDataService.getAllProjects().then(response => {
      setProject(response.data.result.response)
    })
  }

  const getStages = () => {
    TaskDataService.getAllStages().then(response => {
      setStages(response.data.result.response)
    })
  }

  const saveTask = () => {
    var data = {
      name: task.name,
      user_id: task.user_id,
      project_id: task.project_id,
      stage_id: task.stage_id,
      kanban_state: task.kanban_state,
      description: task.description
    };
    console.log(data);
    TaskDataService.create(data)
      .then(response => {
        setTask({
          name: response.data.name,
          user_id: response.data.user_id,
          project_id: response.data.project_id,
          stage_id: response.data.stage_id,
          kanban_state: response.data.kanban_state,
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

  useEffect(() => {
    getProjects();
    getUsers();
    getStages();
  }, []);

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
              value={task.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="user">User</label>
            <select className="form-control" name="user_id" type="text" onChange={handleInputChangeOption} required>
              <option value="2" selected>...</option>
              {users &&
                users.map((user, index) => (
                  <option value={user.id} key={index}>{user.email}</option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="project">Project</label>
            <select className="form-control" name="project_id" type="text" onChange={handleInputChangeOption} required>
              <option value="3" selected>...</option>
              {project &&
                project.map((project, index) => (
                  <option value={project.id} key={index} >{project.name}</option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="project">Stage</label>
            <select className="form-control" name="stage_id" type="text" onChange={handleInputChangeOption} required>
              <option value="11" selected>...</option>
              {stages &&
                stages.map((stages, index) => (
                  <option value={stages.id} key={index}>{stages.name}</option>
                ))
              }
            </select>
          </div>


          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select className="form-control" name="kanban_state" type="text" onChange={handleInputChangeKanban} required>
              <option value="normal" selected>...</option>
              <option value="normal">In Progress</option>
              <option value="done">Ready</option>
              <option value="unassigned">Unassigned</option>
              <option value="delayed">Delayed</option>
              <option value="blocked" >Blocked</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={task.description}
              onChange={handleInputChange}
              name="description"
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
