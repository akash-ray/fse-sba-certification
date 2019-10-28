using System;
using System.Web.Http.Filters;
using System.Web.Http.Controllers;
using System.Web.Http.Tracing;
using System.Web.Http;
using ProjectManager.Utils;
//using WebApi.Helpers;

namespace ProjectManager.ActionFilters
{
    public class ProjectManagerLogFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext filterContext)
        {
            GlobalConfiguration.Configuration.Services.Replace(typeof(ITraceWriter), new LoggingUtility());
            var trace = GlobalConfiguration.Configuration.Services.GetTraceWriter();
            trace.Info(filterContext.Request, "Controller : " + filterContext.ControllerContext.ControllerDescriptor.ControllerType.FullName + Environment.NewLine + "Action : " + filterContext.ActionDescriptor.ActionName, "JSON", filterContext.ActionArguments);
        }
    }
}