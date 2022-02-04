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
  const {ProductServiceClient} = require('@google-cloud/retail').v2;
  const utils = require('../setup/setup_cleanup');

  const projectNumber = process.env['GOOGLE_CLOUD_PROJECT_NUMBER'];

  const productsBucketName = process.env['BUCKET_NAME'];
  const eventsBucketName = process.env['EVENTS_BUCKET_NAME'];

  const productsDataset = 'products';
  const eventsDataset = 'user_events';

  const parent = `projects/${projectNumber}/locations/global/catalogs/default_catalog/branches/default_branch`;

  const retailClient = new ProductServiceClient();

  async function deleteProducts() {
    const listProductsRequest = {
      parent,
    };
    const iterable = await retailClient.listProductsAsync(listProductsRequest);
    let counter = 0;
    for await (const product of iterable) {
      await retailClient.deleteProduct({name: product.name});
      counter++;
    }
    console.log(`${counter} deleted products`);
    const test = await retailClient.listProducts(listProductsRequest);
    console.log(test);
  }

  await utils.deleteBucket(productsBucketName);
  await utils.deleteBucket(eventsBucketName);

  await deleteProducts();

  await utils.deleteBqDataset(productsDataset);
  await utils.deleteBqDataset(eventsDataset);
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main();
