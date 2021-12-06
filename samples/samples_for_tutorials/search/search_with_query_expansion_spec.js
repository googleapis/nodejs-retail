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
  // [START retail_search_for_products_with_query_expansion_specification]

  // Imports the Google Cloud client library.
  const { SearchServiceClient } = require('@google-cloud/retail');

  const projectNumber = process.env['PROJECT_NUMBER'];
  
  // Placement is used to identify the Serving Config name.
  const placement = `projects/${projectNumber}/locations/global/catalogs/default_catalog/placements/default_search`;

  // Raw search query.
  const query = 'Hoodie';

  // A unique identifier for tracking visitors.
  const visitorId = '12345';

  // The query expansion specification that specifies the conditions under which
  // query expansion will occur.
  const queryExpansionSpec = {
    condition: 'AUTO' // TRY OTHER QUERY EXPANSION CONDITIONS HERE
  };
  
  // Instantiates a client.
  const retailClient = new SearchServiceClient();


  const callSearch = async () => {
    console.log('Search start');
    // Construct request
    const request = {
      placement,
      query,
      visitorId,
      queryExpansionSpec
    };

    // Run request
    const iterable = await retailClient.searchAsync(request);
    for await (const response of iterable) {
      console.log(response);
    }
    console.log('Search end');
  }

  callSearch();
  // [END retail_search_for_products_with_query_expansion_specification]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main();
