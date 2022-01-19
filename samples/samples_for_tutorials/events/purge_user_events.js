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
  // [START retail_purge_user_events]

  // Imports the Google Cloud client library.
  const {UserEventServiceClient} = require('@google-cloud/retail').v2;
  const utils = require('../setup/setup_cleanup');

  const projectNumber = process.env['PROJECT_NUMBER'];
  const visitorId = 'test_visitor_id';
  const apiEndpoint = 'retail.googleapis.com';

  // Placement
  const parent = `projects/${projectNumber}/locations/global/catalogs/default_catalog`;

  // The filter string to specify the events to be deleted with a
  // length limit of 5,000 characters.
  const filter = `visitorId="${visitorId}"`;

  // Actually perform the purge.
  const force = true;

  // Instantiates a client.
  const retailClient = new UserEventServiceClient({apiEndpoint});

  const callPurgeUserEvents = async () => {
    // Construct request
    const request = {
      parent,
      filter,
      force,
    };

    console.log('Purge request: ', request);

    // Run request
    const [operation] = await retailClient.purgeUserEvents(request);
    console.log(
      `Purge operation in progress.. Operation name: ${operation.name}`
    );
  };

  // Create new event
  const event = await utils.writeUserEvent(visitorId);
  console.log(
    `Created event ${event.eventType} with visitor id ${event.visitorId}`
  );

  // Purge events
  await callPurgeUserEvents();
  // [END retail_purge_user_events]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main();
