// Copyright 2021 Google LLC
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

function main(parent, filter) {
  // [START retail_v2beta_generated_UserEventService_PurgeUserEvents_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The resource name of the catalog under which the events are
   *  created. The format is
   *  `projects/${projectId}/locations/global/catalogs/${catalogId}`
   */
  // const parent = 'abc123'
  /**
   *  Required. The filter string to specify the events to be deleted with a
   *  length limit of 5,000 characters. Empty string filter is not allowed. The
   *  eligible fields for filtering are:
   *  * `eventType`: Double quoted
   *  [UserEvent.event_type][google.cloud.retail.v2beta.UserEvent.event_type]
   *  string.
   *  * `eventTime`: in ISO 8601 "zulu" format.
   *  * `visitorId`: Double quoted string. Specifying this will delete all
   *    events associated with a visitor.
   *  * `userId`: Double quoted string. Specifying this will delete all events
   *    associated with a user.
   *  Examples:
   *  * Deleting all events in a time range:
   *    `eventTime > "2012-04-23T18:25:43.511Z"
   *    eventTime < "2012-04-23T18:30:43.511Z"`
   *  * Deleting specific eventType in time range:
   *    `eventTime > "2012-04-23T18:25:43.511Z" eventType = "detail-page-view"`
   *  * Deleting all events for a specific visitor:
   *    `visitorId = "visitor1024"`
   *  The filtering fields are assumed to have an implicit AND.
   */
  // const filter = 'abc123'
  /**
   *  Actually perform the purge.
   *  If `force` is set to false, the method will return the expected purge count
   *  without deleting any user events.
   */
  // const force = true

  // Imports the Retail library
  const {UserEventServiceClient} = require('@google-cloud/retail').v2beta;

  // Instantiates a client
  const retailClient = new UserEventServiceClient();

  async function purgeUserEvents() {
    // Construct request
    const request = {
      parent,
      filter,
    };

    // Run request
    const [operation] = await retailClient.purgeUserEvents(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  purgeUserEvents();
  // [END retail_v2beta_generated_UserEventService_PurgeUserEvents_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
