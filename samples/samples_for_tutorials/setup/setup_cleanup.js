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
// Imports the Google Cloud client library.
const {ProductServiceClient} = require('@google-cloud/retail').v2;
const {UserEventServiceClient} = require('@google-cloud/retail').v2;
const {Storage} = require('@google-cloud/storage');
const {BigQuery} = require('@google-cloud/bigquery');
const fs = require('fs');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const createProduct = async (
  projectNumber,
  generatedProductId,
  isFullfillment = false
) => {
  // The parent catalog resource name
  const parent = `projects/${projectNumber}/locations/global/catalogs/default_catalog/branches/default_branch`;
  const apiEndpoint = 'retail.googleapis.com';

  // The ID to use for the product
  const productId = generatedProductId
    ? generatedProductId
    : Math.random().toString(36).slice(2).toUpperCase();

  const fulfillmentInfo = isFullfillment
    ? [
        {
          type: 'same-day-delivery',
          placeIds: ['store1', 'store2', 'store3'],
        },
      ]
    : [];

  // The product to create.
  const product = {
    title: 'Nest Mini',
    type: 'PRIMARY',
    categories: ['Speakers and displays'],
    brands: ['Google'],
    fulfillmentInfo,
    priceInfo: {
      price: 30.0,
      originalPrice: 35.5,
      currency_code: 'USD',
    },
    availability: 'IN_STOCK',
  };

  const retailClient = new ProductServiceClient({apiEndpoint});

  // Construct request
  const request = {
    parent,
    product,
    productId,
  };

  // Run request
  const response = await retailClient.createProduct(request);
  console.log(`Product ${response[0].id} created`);
  return response[0];
};

const getProduct = async name => {
  const apiEndpoint = 'retail.googleapis.com';
  const retailClient = new ProductServiceClient({apiEndpoint});

  // Construct request
  const request = {
    name,
  };

  // Run request
  const response = await retailClient.getProduct(request);
  return response;
};

const deleteProduct = async name => {
  const apiEndpoint = 'retail.googleapis.com';
  const retailClient = new ProductServiceClient({apiEndpoint});

  // Construct request
  const request = {
    name,
  };

  // Run request
  const response = await retailClient.deleteProduct(request);
  return response;
};

const deleteProducts = async (projectNumber, ids) => {
  const apiEndpoint = 'retail.googleapis.com';
  const retailClient = new ProductServiceClient({apiEndpoint});

  for (let i = 0; i < ids.length; ++i) {
    const name = `projects/${projectNumber}/locations/global/catalogs/default_catalog/branches/default_branch/products/${ids[i]}`;
    await retailClient.deleteProduct({name});
  }
  return true;
};

const getBucketsList = async () => {
  const storage = new Storage();
  const [buckets] = await storage.getBuckets();
  const bucketNames = buckets.map(item => item.name);
  console.log(bucketNames);
  return buckets;
};

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

const deleteBucket = async bucketName => {
  const storage = new Storage();
  await storage.bucket(bucketName).deleteFiles({force: true});
  await storage.bucket(bucketName).delete();
  console.log(`Bucket ${bucketName} deleted`);
};

const uploadFile = async (bucketName, filePath, destFileName) => {
  const storage = new Storage();
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });
  console.log(`File ${destFileName} uploaded to ${bucketName}`);
};

const listFiles = async bucketName => {
  const storage = new Storage();
  const [files] = await storage.bucket(bucketName).getFiles();

  console.log('Files:');
  files.forEach(file => {
    console.log(file.name);
  });
};

const isDatasetExist = async datasetId => {
  const bigquery = new BigQuery();
  const [datasets] = await bigquery.getDatasets();
  const datasetIds = datasets.map(dataset => dataset.id);
  return datasetIds.indexOf(datasetId) !== -1 ? true : false;
};

const createBqDataset = async datasetId => {
  if (await isDatasetExist(datasetId)) {
    console.log(`Dataset ${datasetId} already exists`);
    return false;
  } else {
    const bigquery = new BigQuery();
    // Specify the geographic location where the dataset should reside
    const options = {
      location: 'US',
    };

    // Create a new dataset
    const [dataset] = await bigquery.createDataset(datasetId, options);
    console.log(`Dataset ${dataset.id} created.`);
    return true;
  }
};

const deleteBqDataset = async datasetId => {
  const bigquery = new BigQuery();
  await bigquery.dataset(datasetId).delete({force: true});
  console.log(`Dataset ${datasetId} deleted.`);
};

const isTableExist = async (datasetId, tableId) => {
  const bigquery = new BigQuery();
  const [tables] = await bigquery.dataset(datasetId).getTables();
  const tableIds = tables.map(table => table.id);
  return tableIds.indexOf(tableId) !== -1 ? true : false;
};

const createBqTable = async (datasetId, tableId, schemaFile) => {
  if (await isTableExist(datasetId, tableId)) {
    console.log(`Table ${tableId} already exists`);
    return false;
  } else {
    const schemaFileData = fs.readFileSync(schemaFile);
    const schema = JSON.parse(schemaFileData);

    const bigquery = new BigQuery();
    const options = {
      schema: schema,
      location: 'US',
    };

    //Create a new table in the dataset
    const [table] = await bigquery
      .dataset(datasetId)
      .createTable(tableId, options);

    console.log(`Table ${table.id} created.`);
    return true;
  }
};

const deleteBqTable = async (datasetId, tableId) => {
  const bigquery = new BigQuery();
  await bigquery.dataset(datasetId).table(tableId).delete({force: true});
  console.log(`Table ${tableId} deleted.`);
};

const uploadDataToBqTable = async (datasetId, tableId, source, schemaFile) => {
  const schemaFileData = fs.readFileSync(schemaFile);
  const schema = {
    fields: JSON.parse(schemaFileData),
  };

  const bigquery = new BigQuery();
  const options = {
    sourceFormat: 'NEWLINE_DELIMITED_JSON',
    schema,
    location: 'US',
  };
  const [job] = await bigquery
    .dataset(datasetId)
    .table(tableId)
    .load(source, options);
  // load() waits for the job to finish
  console.log(`Job ${job.id} completed.`);
};

const writeUserEvent = async visitorId => {
  const apiEndpoint = 'retail.googleapis.com';
  const projectNumber = process.env['PROJECT_NUMBER'];
  const parent = `projects/${projectNumber}/locations/global/catalogs/default_catalog`;
  const retailClient = new UserEventServiceClient({apiEndpoint});

  const userEvent = {
    eventType: 'detail-page-view',
    visitorId,
    eventTime: {
      seconds: Math.round(Date.now() / 1000),
    },
    productDetails: [
      {
        product: {
          id: 'test_id',
        },
        quantity: {
          value: 3,
        },
      },
    ],
  };

  const request = {
    parent,
    userEvent,
  };

  const response = await retailClient.writeUserEvent(request);
  return response[0];
};

const purgeUserEvents = async (parent, visitorId) => {
  const apiEndpoint = 'retail.googleapis.com';
  const retailClient = new UserEventServiceClient({apiEndpoint});
  const request = {
    parent,
    filter: `visitorId="${visitorId}"`,
    force: true,
  };

  const [operation] = await retailClient.purgeUserEvents(request);
  console.log(
    `Purge operation in progress.. Operation name: ${operation.name}`
  );
};

module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
  deleteProducts,
  createBucket,
  deleteBucket,
  getBucketsList,
  uploadFile,
  listFiles,
  createBqDataset,
  deleteBqDataset,
  createBqTable,
  deleteBqTable,
  uploadDataToBqTable,
  writeUserEvent,
  purgeUserEvents,
  delay,
};
