using Microsoft.AspNetCore.Mvc;

namespace Angular2CLI.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
