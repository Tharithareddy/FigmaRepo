const { BlobServiceClient } = require('@azure/storage-blob')

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
)

const uploadToBlob = async (file, containerName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName)
    const blobName = `${Date.now()}-${file.originalname}`
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)
    
    await blockBlobClient.uploadData(file.buffer)
    return blockBlobClient.url
  } catch (error) {
    throw new Error(`Failed to upload to Azure Blob: ${error.message}`)
  }
}

module.exports = { uploadToBlob, blobServiceClient }