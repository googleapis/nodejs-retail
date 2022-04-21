// Copyright 2022 Google Inc. All Rights Reserved.
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

async function main(generatedProductId) {
  // [START retail_add_remove_fulfillment_places]

  // Imports the Google Cloud client library.
  const {ProductServiceClient} = require('@google-cloud/retail').v2;
  const utils = require('../setup/setup-cleanup');

  // Instantiates a client.
  const retailClient = new ProductServiceClient();

  const projectId = await retailClient.getProjectId();

  // Create product
  const createdProduct = await utils.createProduct(
    projectId,
    generatedProductId
  );

  // Full resource name of Product
  const product = createdProduct.name;

  // The fulfillment type, including commonly used types (such as
  // pickup in store and same day delivery), and custom types.
  const type = 'same-day-delivery';

  // The IDs for this type, such as the store IDs for "pickup-in-store" or the region IDs for
  // "same-day-delivery" to be added for this type.
  const placeIds = ['store1', 'store2', 'store3'];

  // The time when the fulfillment updates are issued, used to prevent
  // out-of-order updates on fulfillment information.
  const addTime = {
    seconds: Math.round(Date.now() / 1000),
  };

  //If set to true, and the product is not found, the fulfillment information will still be processed and retained for
  // at most 1 day and processed once the product is created
  const allowMissing = true;

  const calladdFulfillmentPlaces = async () => {
    // Construct request
    const request = {
      product,
      type,
      placeIds,
      addTime,
      allowMissing,
    };

    console.log('Add fulfillment request:', request);

    // Run request
    const [operation] = await retailClient.addFulfillmentPlaces(request);
    const response = await operation.promise();
    console.log('Wait for the operation to be completed...');
    console.log(response);
  };

  // Add fulfillment places with current time
  console.log('Start add fulfillment');
  await calladdFulfillmentPlaces();
  await utils.delay(60000);
  //Get product
  const response = await utils.getProduct(product);
  console.log(
    'Product with updated fulfillment information: ',
    JSON.stringify(response[0])
  );
  console.log('Add fulfillment finished');

  // Delete product
  await utils.deleteProduct(product);
  console.log(`Product ${createdProduct.id} deleted`);
  // [END retail_add_remove_fulfillment_places]
}

process.on('unhandledRejection', err => {
  console.error('ERROR', err.message);
  process.exitCode = 1;
});

main(...process.argv.slice(2));
