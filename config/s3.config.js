import aws from "aws-sdk";
import config from "./index";

const s3 = new aws.S3({
  accessKeyId: config.S3_ACCESS_KEY,
  secretAccessKey: config.secretAccessKey,
  region: config.S3_REGION,
});

export default s3;
