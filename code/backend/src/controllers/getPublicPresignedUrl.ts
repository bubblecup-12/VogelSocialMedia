import { minioClient, minIOUrl, NODE_ENV } from "../server";

export async function getPublicPresignedUrl(
  bucketName: string,
  objectName: string
): Promise<string> {
  const url = await minioClient.presignedGetObject(
    bucketName,
    objectName,
    3600
  );
  let presignedUrl: string = url;
  console.log(NODE_ENV, "Node env");
  if (NODE_ENV === "production") {
    presignedUrl = url.replace(minIOUrl, "/media");
  }
  return presignedUrl;
}
