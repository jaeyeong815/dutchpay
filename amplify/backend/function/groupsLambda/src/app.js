/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require('aws-sdk');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = 'groups';
if (process.env.ENV && process.env.ENV !== 'NONE') {
  tableName = tableName + '-' + process.env.ENV;
}

const partitionKeyName = 'guid';
const path = '/groups';
const hashKeyPath = '/:' + partitionKeyName;

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

/*****************************************
 * HTTP Get method for get group - 그룹 조회 API *
 *****************************************/

app.get(path + hashKeyPath, function (req, res) {
  let getItemParams = {
    TableName: tableName,
    Key: {
      [partitionKeyName]: req.params[partitionKeyName],
    },
  };

  dynamodb.get(getItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: 'Could not load items: ' + err.message });
    } else {
      if (data.Item) {
        res.json({ data: data.Item });
      } else {
        res.statusCode = 404;
        res.json({ error: 'Item not found' });
      }
    }
  });
});

/************************************
 * HTTP put method for adding members to the group - 멤버 추가 API *
 *************************************/

app.put(`${path}${hashKeyPath}/members`, function (req, res) {
  const guid = req.params[partitionKeyName];
  const { members } = req.body;

  if (
    members === null ||
    members === undefined ||
    !Array.isArray(members) ||
    members.length === 0
  ) {
    res.statusCode = 400;
    res.json({ error: 'invalid members' });
    return;
  }

  let updateItemParams = {
    TableName: tableName,
    Key: {
      [partitionKeyName]: guid,
    },
    UpdateExpression: `SET members = :members`,
    ExpressionAttributeValues: {
      ':members': members,
    },
  };

  dynamodb.update(updateItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err });
    } else {
      res.statusCode = 200;
      res.json({ data });
    }
  });
});

/************************************
 * HTTP post method for creating a group - 그룹 생성 API *
 *************************************/

app.post(path, function (req, res) {
  const { groupName } = req.body;
  const guid = uuidv4();

  if (!groupName || groupName.trim().length === 0) {
    res.statusCode = 400;
    res.json({ error: 'invalid group name' });
    return;
  }

  let putItemParams = {
    TableName: tableName,
    Item: {
      groupName,
      guid,
    },
  };

  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err });
    } else {
      res.json({ data: { guid } });
    }
  });
});

/************************************
 * HTTP put method for adding an expense to the group - 비용 추가 API *
 *************************************/

app.put(`${path}${hashKeyPath}/expenses`, function (req, res) {
  const guid = req.params[partitionKeyName];
  const { expense } = req.body;

  if (expense === null || expense === undefined || !expense.payer || !expense.amount) {
    res.statusCode = 400;
    res.json({ error: 'invalid expense object' });
  }

  let updateItemParams = {
    TableName: tableName,
    Key: {
      [partitionKeyName]: guid,
    },
    UpdateExpression: 'SET expenses = list_append(if_not_exists(expenses, :empty_list), :vals)',
    ExpressionAttributeValues: {
      ':empty_list': [],
      ':vals': [expense],
    },
  };

  dynamodb.update(updateItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err });
    } else {
      res.statusCode = 200;
      res.json({ data });
    }
  });
});

app.listen(3000, function () {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
