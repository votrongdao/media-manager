using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace MediaManager.Controllers
{
    [Produces("application/json")]
    [Route("api/Images")]
    public class ImagesController : Controller
    {
        private BlobUtility _blobUtility = null;

        public ImagesController(IOptions<StorageAccountOptions> options)
        {
            _blobUtility = new BlobUtility(options.Value.StorageAccountNameOption, options.Value.StorageAccountKeyOption);
        }

        // GET: api/Images
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Images/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Images
        [HttpPost]
        public async Task<JsonResult> Post()
        {

            var file = HttpContext.Request.Form.Files.Count > 0 ?
        HttpContext.Request.Form.Files[0] : null;

            if (file != null && file.ContentDisposition.Length > 0)
            {
                await _blobUtility.UploadBlob("fullimages", file, "games", false);
                var url = await _blobUtility.UploadBlob("scaledimages", file, "games", true);
                
                return Json(new { ImageUrl = url });
            }

            return Json(new { ImageUrl = "Error" }); ;
        }
        
        // PUT: api/Images/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
