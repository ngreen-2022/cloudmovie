import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: 'Movies',
    IndexName: 'id-index',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': event.pathParameters.id
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
