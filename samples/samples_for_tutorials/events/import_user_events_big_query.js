// Copyright 2021 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

async function main() {
  // [START retail_import_user_events_big_query]

  // Imports the Google Cloud client library.
  const { UserEventServiceClient } = require('@google-cloud/retail').v2;

  const projectNumber = process.env['PROJECT_NUMBER'];
  const projectId = process.env['PROJECT_ID'];
  const apiEndpoint = 'retail.googleapis.com';

  const datasetId = 'user_events';
  const dataSchema = 'user_event';
  let tableId = 'events';

  // TO CHECK ERROR HANDLING USE THE TABLE OF INVALID USER EVENTS
  //tableId = 'user_events_some_invalid.json';

  // Placement
  const parent = `projects/${projectNumber}/locations/global/catalogs/default_catalog`;

  // The desired input location of the data.
  const inputConfig = {
    bigQuerySource: {
      projectId,
      datasetId,
      tableId,
      dataSchema,
    },
  };

  // Instantiates a client.
  const retailClient = new UserEventServiceClient({ apiEndpoint });

  const IResponseParams = {
    IError: 0,
    ISearchResponse: 1,
    ISearchMetadata: 2,
  };

  const callImportUserEvents = async () => {
    // Construct request
    const request = {
      parent,
      inputConfig,
    };

    console.log('Import request: ', request);

    // Run request
    const [operation] = await retailClient.importUserEvents(request);
    const response = await operation.promise();
    const result = response[IResponseParams.ISearchResponse];
    console.log(
      `Number of successfully imported events: ${result.successCount | 0}`
    );
    console.log(
      `Number of failures during the importing: ${result.failureCount | 0}`
    );
    console.log(`Operation result: ${JSON.stringify(response)}`);
  };

  console.log('Start events import');
  await callImportUserEvents();
  console.log('Events import finished');
  // [END retail_import_user_events_big_query]
}

process.on('unhandledRejection', (err) => {
  console.error(err.message);
  process.exitCode = 1;
});

main();
