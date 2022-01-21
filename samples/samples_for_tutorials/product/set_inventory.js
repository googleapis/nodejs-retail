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

async function main(generatedProductId) {
  // [START retail_set_inventory]

  // Imports the Google Cloud client library.
  const {ProductServiceClient} = require('@google-cloud/retail').v2;
  const utils = require('../setup/setup_cleanup');

  const projectNumber = process.env['PROJECT_NUMBER'];
  const apiEndpoint = 'retail.googleapis.com';

  // Create product
  const createdProduct = await utils.createProduct(
    projectNumber,
    generatedProductId
  );

  // The inventory information to update
  const product = {
    id: createdProduct.id,
    name: createdProduct.name,
    priceInfo: {
      price: 15.0,
      originalPrice: 20.0,
      cost: 8.0,
      currencyCode: 'USD',
    },
    fulfillmentInfo: [
      {
        type: 'same-day-delivery',
        placeIds: ['store3', 'store4'],
      },
    ],
    availableQuantity: {
      value: 2,
    },
    availability: 'IN_STOCK',
  };

  // The time when the request is issued, used to prevent
  // out-of-order updates on inventory fields with the last update time recorded.
  const setTime = {
    seconds: Math.round(Date.now() / 1000),
  };

  // If set to true, and the product with name is not found, the
  // inventory update will still be processed and retained for at most 1 day until the product is created
  const allowMissing = true;

  // Instantiates a client.
  const retailClient = new ProductServiceClient({apiEndpoint});

  const callSetInventory = async () => {
    // Construct request
    const request = {
      inventory: product,
      setTime,
      allowMissing,
    };
    console.log('Set inventory request:', request);

    // Run request
    await retailClient.setInventory(request);
    console.log('Waiting to complete set inventory operation..');
  };

  // Set inventory
  console.log('Start set inventory');
  await callSetInventory();
  await utils.delay(70000);
  console.log('Set inventory finished');

  // Get product
  const changedProduct = await utils.getProduct(createdProduct.name);
  console.log(
    `Updated product ${createdProduct.id}: `,
    JSON.stringify(changedProduct[0])
  );

  // Delete product
  await utils.deleteProduct(createdProduct.name);
  console.log(`Product ${createdProduct.id} deleted`);
  // [END retail_set_inventory]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main(...process.argv.slice(2));
