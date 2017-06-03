using ImageMagick;
using Microsoft.AspNetCore.Http;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MediaManager
{
    public class BlobUtility
    {
        CloudBlobClient _client = null;

        public BlobUtility(string accountName, string accountKey)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=" + accountName + ";AccountKey=" + accountKey + ";EndpointSuffix=core.windows.net");

            _client = storageAccount.CreateCloudBlobClient();
        }

        public async Task<string> UploadBlob(string blobContainer, IFormFile file, string directoryName, bool isThumbnail)
        {
            int fileNameStartLocation = file.FileName.LastIndexOf("\\") + 1;
            string fileName = file.FileName.Substring(fileNameStartLocation);

            CloudBlobContainer container = _client.GetContainerReference(blobContainer);
            await container.CreateIfNotExistsAsync();

            await container.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });

            CloudBlockBlob blockBlob = container.GetBlockBlobReference(directoryName + @"\" + fileName);

            System.IO.MemoryStream memoryStream = new System.IO.MemoryStream();

            MagickImage image = new MagickImage(file.OpenReadStream());
            image.AutoOrient();

            if(isThumbnail)
            {
                if (image.Width > image.Height)
                {
                    image.Resize((new MagickGeometry() { Height = 200, Width = 340, FillArea = true }));
                }
                else
                {
                    image.Extent(new MagickGeometry() { Height = 200, Width = 340, FillArea = false, Greater = true, Less = true }, Gravity.Center);
                }


                //image.AdaptiveResize(new MagickGeometry() { Width = 340, Height = 200, FillArea = true });
                image.Crop(340, 200, Gravity.Center);
            }

            await memoryStream.WriteAsync(image.ToByteArray(), 0, image.ToByteArray().Count());

            memoryStream.Position = 0;
            await blockBlob.UploadFromStreamAsync(memoryStream);

            return blockBlob.Uri.AbsoluteUri;
        }

        public async Task<List<IListBlobItem>> GetBlobs(string blobContainer)
        {
            CloudBlobContainer container = _client.GetContainerReference(blobContainer);
            await container.CreateIfNotExistsAsync();

            await container.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });

            BlobContinuationToken continuationToken = null;
            List<IListBlobItem> blobItems = new List<IListBlobItem>();

            do
            {
                var response = await container.ListBlobsSegmentedAsync(continuationToken);
                continuationToken = response.ContinuationToken;
                blobItems.AddRange(response.Results);
            } while (continuationToken != null);

            //blobItem.GetType() == typeOf(CloudBlobDirectory) // CloudBlockBlob
            //CloudBlobDirectory directory = container.GetDirectoryReference(directoryName);

            return blobItems;
        }
    }
}
