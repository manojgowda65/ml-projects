using Microsoft.Playwright;
using NUnit.Framework;

namespace PlaywriteTesting.Modules;

[TestFixture]
public class UsersTests
{
    [Test]
    public async Task TestGetUserEndpoint()
    {
        using var playwright = await Playwright.CreateAsync();
        var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions { Headless = true });
        var context = await browser.NewContextAsync();

        var response = await context.APIRequest.GetAsync("https://jsonplaceholder.typicode.com/users/1");
        Assert.That(200 == response.Status, "Users endpoint did not return 200");

        await browser.CloseAsync();
    }
}
