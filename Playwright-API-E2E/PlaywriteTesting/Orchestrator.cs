using NUnit.Framework;
using System.Reflection;

namespace PlaywriteTesting;

//Questions 
//1. when they say all modules - what exactly they meant
 // - is it like - orchestrate all other module tests into one?
 // - is it something like - they have a user flow and one endpoint's response is used in another endpoints request and such



//Flow as understood
//client posts/queues requests to EventHub with identifiers (in connection string? check CreateEventString method code) 
//event listener service exists which processes the request and builds data and may be stores 
//then with the endpoint invocation you fetch that data and assert

//No need to concentrate on EventHub more if its all about orchestrating

[TestFixture]
public class Orchestrator
{
    //[Test]
    //public async Task RunAllApiTests()
    //{
    //    // Run UsersTests
    //    await _usersTests.TestGetUserEndpoint();

    //    // Run ProductsTests
    //    await _productsTests.TestGetProductEndpoint();

    //    // Add additional test calls here for other modules
    //}

    [Test]
    public async Task RunAllTests()
    {
        Console.WriteLine("Starting test orchestration...");

        // Get all types in the current assembly
        var assembly = Assembly.GetExecutingAssembly();
        var testClasses = assembly.GetTypes()
            .Where(t => t.Namespace != null && t.Namespace.Contains("PlaywriteTesting.Modules")) // Filter for test modules
            .ToList();

        foreach (var testClass in testClasses)
        {
            Console.WriteLine($"Running tests in: {testClass.Name}");

            // Create an instance of the test class
            var instance = Activator.CreateInstance(testClass);

            // Get all public methods in the class
            var testMethods = testClass.GetMethods(BindingFlags.Public | BindingFlags.Instance)
                .Where(m => m.ReturnType == typeof(Task)) // Look for async Task methods
                .ToList();

            foreach (var method in testMethods)
            {
                Console.WriteLine($"Executing test: {method.Name}");

                try
                {
                    // Invoke the test method
                    var task = (Task)method.Invoke(instance, null);
                    await task;

                    Console.WriteLine($"Test {method.Name} passed.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Test {method.Name} failed: {ex.Message}");
                }
            }
        }

        Console.WriteLine("Test orchestration complete.");
    }
}
