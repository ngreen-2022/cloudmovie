import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: 'Movies',
    KeyConditionExpression: 'genre = :genre',
    ExpressionAttributeValues: {
      ':genre': event.pathParameters.genre
    }
  };

  try {
    const result = await dynamoDbLib.call('query', params);

    return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
