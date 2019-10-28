using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ProjectManager.Models;
using ProjectManager.BC;
using System.Web.Http;
using ProjectManager.ActionFilters;
using System.Web.Http.Cors;

namespace ProjectManager.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProjectController : ApiController
    {
        ProjectBC projObjBC = null;

        public ProjectController()
        {
            projObjBC = new ProjectBC();
        }

        public ProjectController(ProjectBC projectBc)
        {
            projObjBC = projectBc;
        }

        [HttpGet]
        [ProjectManagerLogFilter]
        [ProjectManagerExceptionFilter]
        [Route("api/project")]
        public JSendResponse RetrieveProjects()
        {
            List<Project> Projects = projObjBC.RetrieveProjects();

            return new JSendResponse()
            {
                Data = Projects
            };

        }

        [HttpPost]
        [ProjectManagerLogFilter]
        [ProjectManagerExceptionFilter]
        [Route("api/project/add")]
        public JSendResponse InsertProjectDetails(Project project)
        {
            if (project == null)
            {
                throw new ArgumentNullException("Project is null");
            }
            if (project.ProjectId < 0)
            {
                throw new ArithmeticException("Project ID cannot be negative");
            }
            if (project.User == null)
            {
                throw new ArgumentNullException("User related to the project cannot be null");
            }
            if (project.User.ProjectId < 0)
            {
                throw new ArithmeticException("User object project Id cannot be negative");
            }
            if (project.NoOfCompletedTasks > project.NoOfTasks)
            {
                throw new ArgumentException("Completed tasks cannot be greater than total tasks");
            }
            return new JSendResponse()
            {
                Data = projObjBC.InsertProjectDetails(project)
            };

        }


        [HttpPost]
        [Route("api/project/update")]
        [ProjectManagerLogFilter]
        [ProjectManagerExceptionFilter]
        public JSendResponse UpdateProjectDetails(Project project)
        {
            if (project == null)
            {
                throw new ArgumentNullException("Project is null");
            }
            if (project.ProjectId < 0)
            {
                throw new ArithmeticException("Project ID cannot be negative");
            }
            if (project.User == null)
            {
                throw new ArgumentNullException("User related to the project cannot be null");
            }
            if (project.User.ProjectId < 0)
            {
                throw new ArithmeticException("User object project Id cannot be negative");
            }
            if (project.NoOfCompletedTasks > project.NoOfTasks)
            {
                throw new ArgumentException("Completed tasks cannot be greater than total tasks");
            }
            return new JSendResponse()
            {
                Data = projObjBC.UpdateProjectDetails(project)
            };
        }

        [HttpPost]
        [Route("api/project/delete")]
        public JSendResponse DeleteProjectDetails(Project project)
        {
            if (project == null)
            {
                throw new ArgumentNullException("Project is null");
            }
            if (project.ProjectId < 0)
            {
                throw new ArithmeticException("Project ID cannot be negative");
            }
            if (project.User == null)
            {
                throw new ArgumentNullException("User related to the project cannot be null");
            }
            if (project.User.ProjectId < 0)
            {
                throw new ArithmeticException("User object project Id cannot be negative");
            }
            if (project.NoOfCompletedTasks > project.NoOfTasks)
            {
                throw new ArgumentException("Completed tasks cannot be greater than total tasks");
            }
            return new JSendResponse()
            {
                Data = projObjBC.DeleteProjectDetails(project)
            };
        }

    }
}