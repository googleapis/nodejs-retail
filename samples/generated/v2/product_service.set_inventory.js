// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **



'use strict';

function main(inventory) {
  // [START retail_v2_generated_ProductService_SetInventory_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The inventory information to update. The allowable fields to
   *  update are:
   *  * Product.price_info google.cloud.retail.v2.Product.price_info 
   *  * Product.availability google.cloud.retail.v2.Product.availability 
   *  * Product.available_quantity google.cloud.retail.v2.Product.available_quantity 
   *  * Product.fulfillment_info google.cloud.retail.v2.Product.fulfillment_info 
   *  The updated inventory fields must be specified in
   *  SetInventoryRequest.set_mask google.cloud.retail.v2.SetInventoryRequest.set_mask.
   *  If
   *  SetInventoryRequest.inventory.name google.cloud.retail.v2.Product.name 
   *  is empty or invalid, an INVALID_ARGUMENT error is returned.
   *  If the caller does not have permission to update the
   *  Product google.cloud.retail.v2.Product  named in
   *  Product.name google.cloud.retail.v2.Product.name, regardless of whether
   *  or not it exists, a PERMISSION_DENIED error is returned.
   *  If the Product google.cloud.retail.v2.Product  to update does not have
   *  existing inventory information, the provided inventory information will be
   *  inserted.
   *  If the Product google.cloud.retail.v2.Product  to update has existing
   *  inventory information, the provided inventory information will be merged
   *  while respecting the last update time for each inventory field, using the
   *  provided or default value for
   *  SetInventoryRequest.set_time google.cloud.retail.v2.SetInventoryRequest.set_time.
   *  The caller can replace place IDs for a subset of fulfillment types in the
   *  following ways:
   *  * Adds "fulfillment_info" in
   *  SetInventoryRequest.set_mask google.cloud.retail.v2.SetInventoryRequest.set_mask 
   *  * Specifies only the desired fulfillment types and corresponding place IDs
   *  to update in
   *  SetInventoryRequest.inventory.fulfillment_info google.cloud.retail.v2.Product.fulfillment_info 
   *  The caller can clear all place IDs from a subset of fulfillment types in
   *  the following ways:
   *  * Adds "fulfillment_info" in
   *  SetInventoryRequest.set_mask google.cloud.retail.v2.SetInventoryRequest.set_mask 
   *  * Specifies only the desired fulfillment types to clear in
   *  SetInventoryRequest.inventory.fulfillment_info google.cloud.retail.v2.Product.fulfillment_info 
   *  * Checks that only the desired fulfillment info types have empty
   *  SetInventoryRequest.inventory.fulfillment_info.place_ids google.cloud.retail.v2.FulfillmentInfo.place_ids 
   *  The last update time is recorded for the following inventory fields:
   *  * Product.price_info google.cloud.retail.v2.Product.price_info 
   *  * Product.availability google.cloud.retail.v2.Product.availability 
   *  * Product.available_quantity google.cloud.retail.v2.Product.available_quantity 
   *  * Product.fulfillment_info google.cloud.retail.v2.Product.fulfillment_info 
   *  If a full overwrite of inventory information while ignoring timestamps is
   *  needed,
   *  ProductService.UpdateProduct google.cloud.retail.v2.ProductService.UpdateProduct 
   *  should be invoked instead.
   */
  // const inventory = {}
  /**
   *  Indicates which inventory fields in the provided
   *  Product google.cloud.retail.v2.Product  to update.
   *  At least one field must be provided.
   *  If an unsupported or unknown field is provided, an INVALID_ARGUMENT error
   *  is returned and the entire update will be ignored.
   */
  // const setMask = {}
  /**
   *  The time when the request is issued, used to prevent
   *  out-of-order updates on inventory fields with the last update time
   *  recorded. If not provided, the internal system time will be used.
   */
  // const setTime = {}
  /**
   *  If set to true, and the Product google.cloud.retail.v2.Product  with name
   *  Product.name google.cloud.retail.v2.Product.name  is not found, the
   *  inventory update will still be processed and retained for at most 1 day
   *  until the Product google.cloud.retail.v2.Product  is created. If set to
   *  false, a NOT_FOUND error is returned if the
   *  Product google.cloud.retail.v2.Product  is not found.
   */
  // const allowMissing = true

  // Imports the Retail library
  const {ProductServiceClient} = require('@google-cloud/retail').v2;

  // Instantiates a client
  const retailClient = new ProductServiceClient();

  async function callSetInventory() {
    // Construct request
    const request = {
      inventory,
    };

    // Run request
    const [operation] = await retailClient.setInventory(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  callSetInventory();
  // [END retail_v2_generated_ProductService_SetInventory_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
