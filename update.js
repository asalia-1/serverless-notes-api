import * as dynamoDB from "./libs/dynamo-lib";
import { success, failure } from "./libs/response-libs";
import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-2" });

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDB.call("update", params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
