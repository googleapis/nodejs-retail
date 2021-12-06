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
const { ProductServiceClient } = require('@google-cloud/retail').v2;
const { Storage } = require('@google-cloud/storage');
const { BigQuery } = require('@google-cloud/bigquery');
const { exec } = require('child_process');
const fs = require('fs');

const createProduct = async (
  projectNumber,
  generatedProductId,
  isFullfillment = false
) => {
  // The parent catalog resource name
  const parent = `projects/${projectNumber}/locations/global/catalogs/default_catalog/branches/default_branch`;

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

  const retailClient = new ProductServiceClient();

  return new Promise(async (resolve, reject) => {
    try {
      // Construct request
      const request = {
        parent,
        product,
        productId,
      };

      // Run request
      const response = await retailClient.createProduct(request);
      console.log(`Product ${response[0].id} created`);
      resolve(response[0]);
    } catch (err) {
      reject(err);
    }
  });
};

const getProduct = (name) => {
  const retailClient = new ProductServiceClient();

  return new Promise(async (resolve, reject) => {
    try {
      // Construct request
      const request = {
        name,
      };

      // Run request
      const response = await retailClient.getProduct(request);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

const deleteProduct = (name) => {
  const retailClient = new ProductServiceClient();

  return new Promise(async (resolve, reject) => {
    try {
      // Construct request
      const request = {
        name,
      };

      // Run request
      const response = await retailClient.deleteProduct(request);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

const deleteProducts = (projectNumber, ids) => {
  const retailClient = new ProductServiceClient();

  return new Promise(async (resolve, reject) => {
    try {
      for (let i = 0; i < ids.length; ++i) {
        const name = `projects/${projectNumber}/locations/global/catalogs/default_catalog/branches/default_branch/products/${ids[i]}`;
        await retailClient.deleteProduct({ name });
      }
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};

const getProjectId = () => {
  return new Promise((resolve, reject) => {
    const command = 'gcloud config get-value project --format json';
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stdout) {
        resolve(JSON.parse(stdout));
      } else if (stderr) {
        reject(stderr);
      }
    });
  });
};

const getBucketsList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const storage = new Storage();
      const [buckets] = await storage.getBuckets();
      const bucketNames = buckets.map((item) => item.name);
      console.log(bucketNames);
      resolve(buckets);
    } catch (error) {
      reject(error);
    }
  });
};

const isBucketExist = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const storage = new Storage();
      const [buckets] = await storage.getBuckets();
      const bucketNames = buckets.map((item) => item.name);
      bucketNames.indexOf(name) !== -1 ? resolve(true) : resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

const createBucket = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (await isBucketExist(name)) {
        console.log(`Bucket ${name} alreaty exists`);
        resolve(false);
      } else {
        const storage = new Storage();
        const location = 'us';
        const storageClass = 'STANDARD';
        const createdBucket = await storage.createBucket(name, {
          location,
          [storageClass]: true,
        });
        console.log(`Bucket ${createdBucket[0].name} created.`);
        resolve(createdBucket);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteBucket = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const storage = new Storage();
      await storage.bucket(name).delete();
      console.log(`Bucket ${name} deleted`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const uploadFile = (bucketName, filePath, destFileName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const storage = new Storage();
      await storage.bucket(bucketName).upload(filePath, {
        destination: destFileName,
      });
      console.log(`File ${destFileName} uploaded to ${bucketName}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const listFiles = (bucketName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const storage = new Storage();
      const [files] = await storage.bucket(bucketName).getFiles();

      console.log('Files:');
      files.forEach((file) => {
        console.log(file.name);
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const isDatasetExist = (datasetId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bigquery = new BigQuery();
      const [datasets] = await bigquery.getDatasets();
      const datasetIds = datasets.map((dataset) => dataset.id);
      datasetIds.indexOf(datasetId) !== -1 ? resolve(true) : resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

const createBqDataset = (datasetId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (await isDatasetExist(datasetId)) {
        console.log(`Dataset ${datasetId} already exists`);
        resolve();
      } else {
        const bigquery = new BigQuery();
        // Specify the geographic location where the dataset should reside
        const options = {
          location: 'US',
        };

        // Create a new dataset
        const [dataset] = await bigquery.createDataset(datasetId, options);
        console.log(`Dataset ${dataset.id} created.`);
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteBqDataset = (datasetId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bigquery = new BigQuery();
      await bigquery.dataset(datasetId).delete({ force: true });
      console.log(`Dataset ${dataset.id} deleted.`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const isTableExist = (datasetId, tableId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bigquery = new BigQuery();
      const [tables] = await bigquery.dataset(datasetId).getTables();
      const tableIds = tables.map((table) => table.id);
      tableIds.indexOf(tableId) !== -1 ? resolve(true) : resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

const createBqTable = (datasetId, tableId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (await isTableExist(datasetId, tableId)) {
        console.log(`Table ${tableId} already exists`);
        resolve();
      } else {
        const productSchemaFile = fs.readFileSync(
          'resources/product_schema.json'
        );
        const schema = JSON.parse(productSchemaFile);

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
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

const uploadDataToBqTable = (datasetId, tableId, source) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productSchemaFile = fs.readFileSync(
        'resources/product_schema.json'
      );
      const schema = {
        fields: JSON.parse(productSchemaFile),
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
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
  deleteProducts,
  getProjectId,
  createBucket,
  deleteBucket,
  getBucketsList,
  uploadFile,
  listFiles,
  createBqDataset,
  deleteBqDataset,
  createBqTable,
  uploadDataToBqTable,
};
