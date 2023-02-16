import React, { useEffect, useState } from "react";
import TaskDataService from "../services/TaskService";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState();
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveProjects()
  }, []);

  const setActiveProject = (project, index) => {
    TaskDataService.getTasksFromProjects(project.id)
      .then(response => {
        (response.data.result.response.description ? response.data.result.response.description
          = response.data.result.response.description.split('>')[1].split('<')[0] : response.data.result.response.description = "")
        setCurrentProject(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
    setCurrentIndex(index);
  };

  const retrieveProjects = () => {
    TaskDataService.getAllProjects()
      .then(response => {
        setProjects(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="list col-md-6">
        <h4>Projects List</h4>
        <ul className="list-tasks ">
          {projects &&
            projects.map((project, index) => (
              <div className={
                "card " + (index === currentIndex ? "active" : "")
              } key={index}>
                <div className="card-body">
                  <h2 className="card-title">{project.name}</h2>
                </div>
                <button className="card-btn" onClick={() => setActiveProject(project, index)}>View tasks</button>
              </div>
            ))}
        </ul>
      </div>
      <div className="details col-md-6">
        {currentProject ? (
          <div>
            <h4>Details</h4>
            {currentProject &&
              currentProject.map((project, index) => (
                <div>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {project.name}
                  </div>
                  <div>
                    <label>
                      <strong>Nº de tareas:</strong>
                    </label>{" "}
                    {project.tasks_count}
                  </div>
                  <div>
                    <label>
                      <strong>Descripción:</strong>
                    </label>{" "}
                    {project.description ? project.description.split('<p>')[1].split('</p>')[0] : "Nothing to see here"}
                  </div>
                </div>
              ))}
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

export default Projects;