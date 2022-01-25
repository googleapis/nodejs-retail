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
  const {Storage} = require('@google-cloud/storage');
  const projectNumber = process.env['PROJECT_NUMBER'];
  const bucketName = process.env['BUCKET_NAME'];

  const gcsBucket = `gs://${bucketName}`;
  const gcsErrorsBucket = `gs://${bucketName}/error`;
  const gcsProductsObject = 'products.json';

  const parent = `projects/${projectNumber}/locations/global/catalogs/default_catalog/branches/default_branch`;

  const inputConfig = {
    gcsSource: {
      inputUris: [gcsBucket + '/' + gcsProductsObject],
      dataSchema: 'product',
    },
  };

  const errorsConfig = {
    gcsPrefix: gcsErrorsBucket,
  };

  const IResponseParams = {
    IError: 0,
    ISearchResponse: 1,
    ISearchMetadata: 2,
  };

  const retailClient = new ProductServiceClient();

  const isBucketExist = async name => {
    const storage = new Storage();
    const [buckets] = await storage.getBuckets();
    const bucketNames = buckets.map(item => item.name);
    return bucketNames.indexOf(name) !== -1 ? true : false;
  };

  const createBucket = async name => {
    if (await isBucketExist(name)) {
      console.log(`Bucket ${name} alreaty exists`);
      return false;
    } else {
      const storage = new Storage();
      const location = 'us';
      const storageClass = 'STANDARD';
      const createdBucket = await storage.createBucket(name, {
        location,
        [storageClass]: true,
      });
      console.log(`Bucket ${createdBucket[0].name} created.`);
      return createdBucket;
    }
  };

  const uploadFile = async (bucketName, filePath, destFileName) => {
    const storage = new Storage();
    await storage.bucket(bucketName).upload(filePath, {
      destination: destFileName,
    });
    console.log(`File ${destFileName} uploaded to ${bucketName}`);
  };

  const importProducts = async () => {
    // Construct request
    const request = {
      parent,
      inputConfig,
      errorsConfig,
    };
    console.log('Import products request:', request);

    // Run request
    const [operation] = await retailClient.importProducts(request);
    const response = await operation.promise();
    const result = response[IResponseParams.ISearchResponse];
    console.log(
      `Number of successfully imported products: ${result.successCount | 0}`
    );
    console.log(
      `Number of failures during the importing: ${result.failureCount | 0}`
    );
    console.log(`Operation result: ${JSON.stringify(response)}`);
  };

  await createBucket(bucketName);
  await uploadFile(
    bucketName,
    'interactive-tutorials/resources/products.json',
    'products.json'
  );
  await importProducts();
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main();