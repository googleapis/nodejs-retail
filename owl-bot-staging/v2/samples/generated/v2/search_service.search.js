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

function main(placement, visitorId) {
  // [START retail_v2_generated_SearchService_Search_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The resource name of the search engine placement, such as
   *  `projects/* /locations/global/catalogs/default_catalog/placements/default_search`.
   *  This field is used to identify the serving configuration name and the set
   *  of models that will be used to make the search.
   */
  // const placement = 'abc123'
  /**
   *  The branch resource name, such as
   *  `projects/* /locations/global/catalogs/default_catalog/branches/0`.
   *  Use "default_branch" as the branch ID or leave this field empty, to search
   *  products under the default branch.
   */
  // const branch = 'abc123'
  /**
   *  Raw search query.
   */
  // const query = 'abc123'
  /**
   *  Required. A unique identifier for tracking visitors. For example, this
   *  could be implemented with an HTTP cookie, which should be able to uniquely
   *  identify a visitor on a single device. This unique identifier should not
   *  change if the visitor logs in or out of the website.
   *  The field must be a UTF-8 encoded string with a length limit of 128
   *  characters. Otherwise, an INVALID_ARGUMENT error is returned.
   */
  // const visitorId = 'abc123'
  /**
   *  User information.
   */
  // const userInfo = {}
  /**
   *  Maximum number of Product google.cloud.retail.v2.Product s to return. If
   *  unspecified, defaults to a reasonable value. The maximum allowed value is
   *  120. Values above 120 will be coerced to 120.
   *  If this field is negative, an INVALID_ARGUMENT is returned.
   */
  // const pageSize = 1234
  /**
   *  A page token
   *  SearchResponse.next_page_token google.cloud.retail.v2.SearchResponse.next_page_token,
   *  received from a previous
   *  SearchService.Search google.cloud.retail.v2.SearchService.Search  call.
   *  Provide this to retrieve the subsequent page.
   *  When paginating, all other parameters provided to
   *  SearchService.Search google.cloud.retail.v2.SearchService.Search  must
   *  match the call that provided the page token. Otherwise, an INVALID_ARGUMENT
   *  error is returned.
   */
  // const pageToken = 'abc123'
  /**
   *  A 0-indexed integer that specifies the current offset (that is, starting
   *  result location, amongst the Product google.cloud.retail.v2.Product s
   *  deemed by the API as relevant) in search results. This field is only
   *  considered if page_token google.cloud.retail.v2.SearchRequest.page_token 
   *  is unset.
   *  If this field is negative, an INVALID_ARGUMENT is returned.
   */
  // const offset = 1234
  /**
   *  The filter syntax consists of an expression language for constructing a
   *  predicate from one or more fields of the products being filtered. Filter
   *  expression is case-sensitive. See more details at this user
   *  guide (https://cloud.google.com/retail/docs/filter-and-order#filter).
   *  If this field is unrecognizable, an INVALID_ARGUMENT is returned.
   */
  // const filter = 'abc123'
  /**
   *  The filter applied to every search request when quality improvement such as
   *  query expansion is needed. For example, if a query does not have enough
   *  results, an expanded query with
   *  SearchRequest.canonical_filter google.cloud.retail.v2.SearchRequest.canonical_filter 
   *  will be returned as a supplement of the original query. This field is
   *  strongly recommended to achieve high search quality.
   *  See SearchRequest.filter google.cloud.retail.v2.SearchRequest.filter  for
   *  more details about filter syntax.
   */
  // const canonicalFilter = 'abc123'
  /**
   *  The order in which products are returned. Products can be ordered by
   *  a field in an Product google.cloud.retail.v2.Product  object. Leave it
   *  unset if ordered by relevance. OrderBy expression is case-sensitive. See
   *  more details at this user
   *  guide (https://cloud.google.com/retail/docs/filter-and-order#order).
   *  If this field is unrecognizable, an INVALID_ARGUMENT is returned.
   */
  // const orderBy = 'abc123'
  /**
   *  Facet specifications for faceted search. If empty, no facets are returned.
   *  A maximum of 100 values are allowed. Otherwise, an INVALID_ARGUMENT error
   *  is returned.
   */
  // const facetSpecs = 1234
  /**
   *  The specification for dynamically generated facets. Notice that only
   *  textual facets can be dynamically generated.
   *  This feature requires additional allowlisting. Contact Retail Search
   *  support team if you are interested in using dynamic facet feature.
   */
  // const dynamicFacetSpec = {}
  /**
   *  Boost specification to boost certain products. See more details at this
   *  user guide (https://cloud.google.com/retail/docs/boosting).
   *  Notice that if both ServingConfig.boost_control_ids   and
   *  SearchRequest.boost_spec  are set, the boost conditions from both places
   *  are evaluated. If a search request matches multiple boost conditions,
   *  the final boost score is equal to the sum of the boost scores from all
   *  matched boost conditions.
   */
  // const boostSpec = {}
  /**
   *  The query expansion specification that specifies the conditions under which
   *  query expansion will occur. See more details at this user
   *  guide (https://cloud.google.com/retail/docs/result-size#query_expansion).
   */
  // const queryExpansionSpec = {}
  /**
   *  The keys to fetch and rollup the matching
   *  variant google.cloud.retail.v2.Product.Type.VARIANT 
   *  Product google.cloud.retail.v2.Product s attributes. The attributes from
   *  all the matching variant google.cloud.retail.v2.Product.Type.VARIANT 
   *  Product google.cloud.retail.v2.Product s are merged and de-duplicated.
   *  Notice that rollup variant google.cloud.retail.v2.Product.Type.VARIANT 
   *  Product google.cloud.retail.v2.Product s attributes will lead to extra
   *  query latency. Maximum number of keys is 10.
   *  For FulfillmentInfo google.cloud.retail.v2.FulfillmentInfo, a
   *  fulfillment type and a fulfillment ID must be provided in the format of
   *  "fulfillmentType.fulfillmentId". E.g., in "pickupInStore.store123",
   *  "pickupInStore" is fulfillment type and "store123" is the store ID.
   *  Supported keys are:
   *  * colorFamilies
   *  * price
   *  * originalPrice
   *  * discount
   *  * inventory(place_id,price)
   *  * attributes.key, where key is any key in the
   *    Product.attributes google.cloud.retail.v2.Product.attributes  map.
   *  * pickupInStore.id, where id is any
   *  FulfillmentInfo.place_ids google.cloud.retail.v2.FulfillmentInfo.place_ids 
   *  for FulfillmentInfo.type google.cloud.retail.v2.FulfillmentInfo.type 
   *    "pickup-in-store".
   *  * shipToStore.id, where id is any
   *  FulfillmentInfo.place_ids google.cloud.retail.v2.FulfillmentInfo.place_ids 
   *  for FulfillmentInfo.type google.cloud.retail.v2.FulfillmentInfo.type 
   *    "ship-to-store".
   *  * sameDayDelivery.id, where id is any
   *  FulfillmentInfo.place_ids google.cloud.retail.v2.FulfillmentInfo.place_ids 
   *  for FulfillmentInfo.type google.cloud.retail.v2.FulfillmentInfo.type 
   *    "same-day-delivery".
   *  * nextDayDelivery.id, where id is any
   *  FulfillmentInfo.place_ids google.cloud.retail.v2.FulfillmentInfo.place_ids 
   *  for FulfillmentInfo.type google.cloud.retail.v2.FulfillmentInfo.type 
   *    "next-day-delivery".
   *  * customFulfillment1.id, where id is any
   *  FulfillmentInfo.place_ids google.cloud.retail.v2.FulfillmentInfo.place_ids 
   *  for FulfillmentInfo.type google.cloud.retail.v2.FulfillmentInfo.type 
   *    "custom-type-1".
   *  * customFulfillment2.id, where id is any
   *  FulfillmentInfo.place_ids google.cloud.retail.v2.FulfillmentInfo.place_ids 
   *  for FulfillmentInfo.type google.cloud.retail.v2.FulfillmentInfo.type 
   *    "custom-type-2".
   *  * customFulfillment3.id, where id is any
   *  FulfillmentInfo.place_ids google.cloud.retail.v2.FulfillmentInfo.place_ids 
   *  for FulfillmentInfo.type google.cloud.retail.v2.FulfillmentInfo.type 
   *    "custom-type-3".
   *  * customFulfillment4.id, where id is any
   *  FulfillmentInfo.place_ids google.cloud.retail.v2.FulfillmentInfo.place_ids 
   *  for FulfillmentInfo.type google.cloud.retail.v2.FulfillmentInfo.type 
   *    "custom-type-4".
   *  * customFulfillment5.id, where id is any
   *  FulfillmentInfo.place_ids google.cloud.retail.v2.FulfillmentInfo.place_ids 
   *  for FulfillmentInfo.type google.cloud.retail.v2.FulfillmentInfo.type 
   *    "custom-type-5".
   *  If this field is set to an invalid value other than these, an
   *  INVALID_ARGUMENT error is returned.
   */
  // const variantRollupKeys = 'abc123'
  /**
   *  The categories associated with a category page. Required for category
   *  navigation queries to achieve good search quality. The format should be
   *  the same as
   *  UserEvent.page_categories google.cloud.retail.v2.UserEvent.page_categories;
   *  To represent full path of category, use '>' sign to separate different
   *  hierarchies. If '>' is part of the category name, please replace it with
   *  other character(s).
   *  Category pages include special pages such as sales or promotions. For
   *  instance, a special sale page may have the category hierarchy:
   *  "pageCategories" : "Sales > 2017 Black Friday Deals".
   */
  // const pageCategories = 'abc123'
  /**
   *  The search mode of the search request. If not specified, a single search
   *  request triggers both product search and faceted search.
   */
  // const searchMode = {}

  // Imports the Retail library
  const {SearchServiceClient} = require('@google-cloud/retail').v2;

  // Instantiates a client
  const retailClient = new SearchServiceClient();

  async function callSearch() {
    // Construct request
    const request = {
      placement,
      visitorId,
    };

    // Run request
    const iterable = await retailClient.searchAsync(request);
    for await (const response of iterable) {
        console.log(response);
    }
  }

  callSearch();
  // [END retail_v2_generated_SearchService_Search_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
