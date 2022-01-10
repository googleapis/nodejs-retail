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
  const utils = require('./setup_cleanup');

  //Get your project ID
  const projectId = process.env['PROJECT_ID'];

  // The ID of your GCS bucket
  const bucketName = `${projectId}_events_${Math.round(Date.now() / 1000)}`;

  //Creates the new bucket
  await utils.createBucket(bucketName);

  //Upload files
  await utils.uploadFile(
    bucketName,
    'resources/user_events.json',
    'user_events.json'
  );
  await utils.uploadFile(
    bucketName,
    'resources/user_events_some_invalid.json',
    'user_events_some_invalid.json'
  );
}

process.on('unhandledRejection', (err) => {
  console.error(err.message);
  process.exitCode = 1;
});

main();
