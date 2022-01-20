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

function main(name) {
  // [START retail_v2_generated_ProductService_DeleteProduct_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. Full resource name of Product google.cloud.retail.v2.Product,
   *  such as
   *  `projects/* /locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id`.
   *  If the caller does not have permission to delete the
   *  Product google.cloud.retail.v2.Product, regardless of whether or not it
   *  exists, a PERMISSION_DENIED error is returned.
   *  If the Product google.cloud.retail.v2.Product  to delete does not exist,
   *  a NOT_FOUND error is returned.
   *  The Product google.cloud.retail.v2.Product  to delete can neither be a
   *  Product.Type.COLLECTION google.cloud.retail.v2.Product.Type.COLLECTION 
   *  Product google.cloud.retail.v2.Product  member nor a
   *  Product.Type.PRIMARY google.cloud.retail.v2.Product.Type.PRIMARY 
   *  Product google.cloud.retail.v2.Product  with more than one
   *  variants google.cloud.retail.v2.Product.Type.VARIANT. Otherwise, an
   *  INVALID_ARGUMENT error is returned.
   *  All inventory information for the named
   *  Product google.cloud.retail.v2.Product  will be deleted.
   */
  // const name = 'abc123'

  // Imports the Retail library
  const {ProductServiceClient} = require('@google-cloud/retail').v2;

  // Instantiates a client
  const retailClient = new ProductServiceClient();

  async function callDeleteProduct() {
    // Construct request
    const request = {
      name,
    };

    // Run request
    const response = await retailClient.deleteProduct(request);
    console.log(response);
  }

  callDeleteProduct();
  // [END retail_v2_generated_ProductService_DeleteProduct_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
