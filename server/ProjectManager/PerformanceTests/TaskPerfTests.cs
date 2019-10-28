using Microsoft.VisualStudio.TestTools.UnitTesting;
using NBench;
using ProjectManager.Controllers;

namespace PerformanceTests
{
    [TestClass]
    public class TaskPerfTests
    {
        [PerfBenchmark(NumberOfIterations = 1, RunMode = RunMode.Throughput,
        TestMode = TestMode.Test, SkipWarmups = true)]
        [ElapsedTimeAssertion(MaxTimeMilliseconds = 5000)]
        public void PerformanceTests()
        {
            // Set up Prerequisites   
            var controller = new ProjectController();
            // Act on Test  
            var response = controller.RetrieveProjects();
            // Assert the result  
            Assert.IsTrue(response != null);
        }
    }
}
