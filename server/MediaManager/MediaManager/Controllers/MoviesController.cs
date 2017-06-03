using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Raven.Client;
using Raven.Client.Document;

namespace MediaManager.Controllers
{

    [Serializable]
    public class Movie
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Director { get; set; }
        public string ImageUrl { get; set; }
    }

    [Produces("application/json")]
    [Route("api/Movies")]
    public class MoviesController : Controller
    {
        public MoviesController(IOptions<StorageAccountOptions> optionsAccessor)
        {

        }

        [HttpGet]
        public JsonResult Get()
        {
            List<Movie> movies = new List<Movie>();

            using (IDocumentStore store = new DocumentStore
            {
                Url = "http://localhost:8080/", // server URL
                DefaultDatabase = "MediaManager"   // default database
            })
            {
                store.Initialize(); // initializes document store, by connecting to server and downloading various configurations

                using (IDocumentSession session = store.OpenSession()) // opens a session that will work in context of 'DefaultDatabase'
                {
                    movies = session.Query<Movie>().ToList();
                }
            }

            return Json(movies);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Movie movie)
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
                    session.Store(movie);
                    session.SaveChanges();

                    movie.Id = session.Advanced.GetDocumentId(movie);
                }
            }


            return Json(movie);

        }
    }
}
