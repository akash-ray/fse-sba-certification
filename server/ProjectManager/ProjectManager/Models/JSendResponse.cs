using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjectManager.Models
{
    public class JSendResponse
    {
        public const string STATUS_SUCCESS = "success";
        public const string STATUS_WARNING = "warning";
        public const string STATUS_FAIL = "fail";
        public const string STATUS_ERROR = "error";

        public JSendResponse()
        {
            this.Status = STATUS_SUCCESS;
        }

        public JSendResponse(string status)
        {
            this.Status = status;
        }

        public object Data { get; set; }
        public string Message { get; set; }
        public string Status { get; set; }
    }
}