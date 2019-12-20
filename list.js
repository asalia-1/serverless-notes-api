import * as dynamoDbLib from "./libs/dynamo-lib";
import { success, failure } from "./libs/response-libs";
import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-2" });
export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    return success(result.Items);
  } catch (e) {
    return failure({ status: false });
  }
}
