using Microsoft.Playwright;
using NUnit.Framework;

namespace PlaywriteTesting.Modules;

[TestFixture]
public class ProductsTests
{
    [Test]
    public async Task TestGetProductEndpoint()
    {
        using var playwright = await Playwright.CreateAsync();
        var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions { Headless = true });
        var context = await browser.NewContextAsync();

        //var response = await context.APIRequest.GetAsync("https://jsonplaceholder.typicode.com/posts/232323");
        var response = await context.APIRequest.GetAsync("https://jsonplaceholder.typicode.com/posts/1");
        Assert.That(200 == response.Status, "Products endpoint did not return 200");

        await browser.CloseAsync();
    }
}