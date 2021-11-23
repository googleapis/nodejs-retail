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

function main(catalog, query) {
  // [START retail_v2_generated_CompletionService_CompleteQuery_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. Catalog for which the completion is performed.
   *  Full resource name of catalog, such as
   *  `projects/* /locations/global/catalogs/default_catalog`.
   */
  // const catalog = 'abc123'
  /**
   *  Required. The query used to generate suggestions.
   *  The maximum number of allowed characters is 255.
   */
  // const query = 'abc123'
  /**
   *  A unique identifier for tracking visitors. For example, this could be
   *  implemented with an HTTP cookie, which should be able to uniquely identify
   *  a visitor on a single device. This unique identifier should not change if
   *  the visitor logs in or out of the website.
   *  The field must be a UTF-8 encoded string with a length limit of 128
   *  characters. Otherwise, an INVALID_ARGUMENT error is returned.
   */
  // const visitorId = 'abc123'
  /**
   *  The list of languages of the query. This is
   *  the BCP-47 language code, such as "en-US" or "sr-Latn".
   *  For more information, see
   *  Tags for Identifying Languages (https://tools.ietf.org/html/bcp47).
   *  The maximum number of allowed characters is 255.
   *  Only "en-US" is currently supported.
   */
  // const languageCodes = 'abc123'
  /**
   *  The device type context for completion suggestions.
   *  It is useful to apply different suggestions on different device types, e.g.
   *  `DESKTOP`, `MOBILE`. If it is empty, the suggestions are across all device
   *  types.
   *  Supported formats:
   *  * `UNKNOWN_DEVICE_TYPE`
   *  * `DESKTOP`
   *  * `MOBILE`
   *  * A customized string starts with `OTHER_`, e.g. `OTHER_IPHONE`.
   */
  // const deviceType = 'abc123'
  /**
   *  Determines which dataset to use for fetching completion. "user-data" will
   *  use the imported dataset through
   *  CompletionService.ImportCompletionData google.cloud.retail.v2.CompletionService.ImportCompletionData.
   *  "cloud-retail" will use the dataset generated by cloud retail based on user
   *  events. If leave empty, it will use the "user-data".
   *  Current supported values:
   *  * user-data
   *  * cloud-retail
   *    This option requires additional allowlisting. Before using cloud-retail,
   *    contact Cloud Retail support team first.
   */
  // const dataset = 'abc123'
  /**
   *  Completion max suggestions. If left unset or set to 0, then will fallback
   *  to the configured value CompletionConfig.max_suggestions .
   *  The maximum allowed max suggestions is 20. If it is set higher, it will be
   *  capped by 20.
   */
  // const maxSuggestions = 1234

  // Imports the Retail library
  const {CompletionServiceClient} = require('@google-cloud/retail').v2;

  // Instantiates a client
  const retailClient = new CompletionServiceClient();

  async function callCompleteQuery() {
    // Construct request
    const request = {
      catalog,
      query,
    };

    // Run request
    const response = await retailClient.completeQuery(request);
    console.log(response);
  }

  callCompleteQuery();
  // [END retail_v2_generated_CompletionService_CompleteQuery_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
