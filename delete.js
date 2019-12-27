import * as dynamodBLib from "./libs/dynamo-lib";
import { success, failure } from "./libs/response-libs";
import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-2" });
export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    await dynamodBLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
