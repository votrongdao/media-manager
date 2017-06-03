using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Raven.Client;
using Raven.Client.Document;
using Microsoft.Extensions.Options;

namespace MediaManager.Controllers
{
    [Serializable]
    public class Book
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string ImageUrl { get; set; }
    }

    [Produces("application/json")]
    [Route("api/Books")]
    public class BooksController : Controller
    {
        public BooksController(IOptions<StorageAccountOptions> optionsAccessor)
        {

        }

        [HttpGet]
        public JsonResult Get()
        {
            List<Book> books = new List<Book>();

            using (IDocumentStore store = new DocumentStore
            {
                Url = "http://localhost:8080/", // server URL
                DefaultDatabase = "MediaManager"   // default database
            })
            {
                store.Initialize(); // initializes document store, by connecting to server and downloading various configurations

                using (IDocumentSession session = store.OpenSession()) // opens a session that will work in context of 'DefaultDatabase'
                {
                    books = session.Query<Book>().ToList();
                }
            }

            return Json(books);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Book book)
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
                    session.Store(book);
                    session.SaveChanges();

                    book.Id = session.Advanced.GetDocumentId(book);
                }
            }


            return Json(book);

        }
    }
}
