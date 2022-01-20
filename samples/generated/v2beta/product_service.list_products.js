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

function main(parent) {
  // [START retail_v2beta_generated_ProductService_ListProducts_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The parent branch resource name, such as
   *  `projects/* /locations/global/catalogs/default_catalog/branches/0`. Use
   *  `default_branch` as the branch ID, to list products under the default
   *  branch.
   *  If the caller does not have permission to list
   *  Product google.cloud.retail.v2beta.Product s under this branch,
   *  regardless of whether or not this branch exists, a PERMISSION_DENIED error
   *  is returned.
   */
  // const parent = 'abc123'
  /**
   *  Maximum number of Product google.cloud.retail.v2beta.Product s to return.
   *  If unspecified, defaults to 100. The maximum allowed value is 1000. Values
   *  above 1000 will be coerced to 1000.
   *  If this field is negative, an INVALID_ARGUMENT error is returned.
   */
  // const pageSize = 1234
  /**
   *  A page token
   *  ListProductsResponse.next_page_token google.cloud.retail.v2beta.ListProductsResponse.next_page_token,
   *  received from a previous
   *  ProductService.ListProducts google.cloud.retail.v2beta.ProductService.ListProducts 
   *  call. Provide this to retrieve the subsequent page.
   *  When paginating, all other parameters provided to
   *  ProductService.ListProducts google.cloud.retail.v2beta.ProductService.ListProducts 
   *  must match the call that provided the page token. Otherwise, an
   *  INVALID_ARGUMENT error is returned.
   */
  // const pageToken = 'abc123'
  /**
   *  A filter to apply on the list results. Supported features:
   *  * List all the products under the parent branch if
   *  filter google.cloud.retail.v2beta.ListProductsRequest.filter  is unset.
   *  * List
   *  Product.Type.VARIANT google.cloud.retail.v2beta.Product.Type.VARIANT 
   *  Product google.cloud.retail.v2beta.Product s sharing the same
   *    Product.Type.PRIMARY google.cloud.retail.v2beta.Product.Type.PRIMARY 
   *    Product google.cloud.retail.v2beta.Product. For example:
   *      `primary_product_id = "some_product_id"`
   *  * List Product google.cloud.retail.v2beta.Product s bundled in a
   *  Product.Type.COLLECTION google.cloud.retail.v2beta.Product.Type.COLLECTION 
   *  Product google.cloud.retail.v2beta.Product.
   *    For example:
   *      `collection_product_id = "some_product_id"`
   *  * List Product google.cloud.retail.v2beta.Product s with a partibular
   *  type. For example:
   *      `type = "PRIMARY"`
   *      `type = "VARIANT"`
   *      `type = "COLLECTION"`
   *  If the field is unrecognizable, an INVALID_ARGUMENT error is returned.
   *  If the specified
   *  Product.Type.PRIMARY google.cloud.retail.v2beta.Product.Type.PRIMARY 
   *  Product google.cloud.retail.v2beta.Product  or
   *  Product.Type.COLLECTION google.cloud.retail.v2beta.Product.Type.COLLECTION 
   *  Product google.cloud.retail.v2beta.Product  does not exist, a NOT_FOUND
   *  error is returned.
   */
  // const filter = 'abc123'
  /**
   *  The fields of Product google.cloud.retail.v2beta.Product  to return in
   *  the responses. If not set or empty, the following fields are returned:
   *  * Product.name google.cloud.retail.v2beta.Product.name 
   *  * Product.id google.cloud.retail.v2beta.Product.id 
   *  * Product.title google.cloud.retail.v2beta.Product.title 
   *  * Product.uri google.cloud.retail.v2beta.Product.uri 
   *  * Product.images google.cloud.retail.v2beta.Product.images 
   *  * Product.price_info google.cloud.retail.v2beta.Product.price_info 
   *  * Product.brands google.cloud.retail.v2beta.Product.brands 
   *  If "*" is provided, all fields are returned.
   *  Product.name google.cloud.retail.v2beta.Product.name  is always returned
   *  no matter what mask is set.
   *  If an unsupported or unknown field is provided, an INVALID_ARGUMENT error
   *  is returned.
   */
  // const readMask = {}

  // Imports the Retail library
  const {ProductServiceClient} = require('@google-cloud/retail').v2beta;

  // Instantiates a client
  const retailClient = new ProductServiceClient();

  async function callListProducts() {
    // Construct request
    const request = {
      parent,
    };

    // Run request
    const iterable = await retailClient.listProductsAsync(request);
    for await (const response of iterable) {
        console.log(response);
    }
  }

  callListProducts();
  // [END retail_v2beta_generated_ProductService_ListProducts_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
