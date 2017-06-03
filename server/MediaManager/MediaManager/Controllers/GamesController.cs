using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Raven.Client;
using Raven.Client.Document;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Cors;

namespace MediaManager.Controllers
{
    [Serializable]
    public class Game
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Platform { get; set; }
        public string ImageUrl { get; set; }
    }

    [Produces("application/json")]
    [Route("api/Games")]
    public class GamesController : Controller
    {
        public GamesController(IOptions<StorageAccountOptions> optionsAccessor)
        {

        }

        [HttpGet]
        public JsonResult Get()
        {
            List<Game> games = new List<Game>();

            using (IDocumentStore store = new DocumentStore
            {
                Url = "http://localhost:8080/", // server URL
                DefaultDatabase = "MediaManager"   // default database
            })
            {
                store.Initialize(); // initializes document store, by connecting to server and downloading various configurations

                using (IDocumentSession session = store.OpenSession()) // opens a session that will work in context of 'DefaultDatabase'
                {
                    games = session.Query<Game>().ToList();
                }
            }

            return Json(games);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Game game)
        {

            using (IDocumentStore store = new DocumentStore
            {
                Url = "http://localhost:8080/", // server URL
                DefaultDatabase = "MediaManager"   // default database
            })
            {
                store.Initialize(); // initializes document store, by connecting to server and downloading various configurations

                using (IDocumentSession session = store.OpenSession()) // opens a session that will work in context of 'DefaultDatabase'
                {
                    session.Store(game);
                    session.SaveChanges();
                }
            }


            return Json(game);

        }
    }
}