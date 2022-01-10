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

const path = require('path');
const cp = require('child_process');
const { before, describe, it } = require('mocha');
const { SearchServiceClient } = require('@google-cloud/retail');
const { assert, expect } = require('chai');

const execSync = (cmd) => cp.execSync(cmd, { encoding: 'utf-8' });
const cwd = path.join(__dirname, '..');

describe('Search with pagination', () => {
  describe('Search with pagination run sample', () => {
    let stdout;

    before(async () => {
      stdout = execSync(`node search/search_with_pagination.js`, { cwd });
    });

    it('should show that search successfully started', () => {
      assert.match(stdout, /Search start/);
    });

    it('should contain next page token', () => {
      assert.match(stdout, /Next page token/);
    });

    it('should show that search successfully finished', () => {
      assert.match(stdout, /Search end/);
    });
  });

  describe('Search with pagination sample result', () => {
    const apiEndpoint = 'retail.googleapis.com';
    const retailClient = new SearchServiceClient({ apiEndpoint });
    const projectNumber = process.env['PROJECT_NUMBER'];
    const pageSize = 2;
    const offset = 0;
    const pageToken = '';
    const request = {
      placement: `projects/${projectNumber}/locations/global/catalogs/default_catalog/placements/default_search`,
      query: 'Hoodie',
      visitorId: '12345',
      pageSize,
      offset,
      pageToken,
    };
    let response;

    const IResponseParams = {
      ISearchResult: 0,
      ISearchRequest: 1,
      ISearchResponse: 2,
    };

    before(async () => {
      response = await retailClient.search(request, { autoPaginate: false });
    });

    it('should be a valid response', () => {
      expect(response).to.be.an('array');
      expect(response.length).to.equal(3);
      const searchResult = response[IResponseParams.ISearchResult];
      const searchResponse = response[IResponseParams.ISearchResponse];
      if (searchResult.length) {
        expect(searchResponse.totalSize).to.be.above(0);
        searchResult.forEach((resultItem) => {
          expect(resultItem, 'It should be an object').to.be.an('object');
          expect(
            resultItem,
            'The object has no  valid properties'
          ).to.have.all.keys(
            'matchingVariantFields',
            'variantRollupValues',
            'id',
            'product',
            'matchingVariantCount'
          );
        });
      } else {
        expect(searchResult).to.be.an('array').that.is.empty;
        expect(searchResponse.totalSize).to.equal(0);
      }
    });

    it('should contain a fixed number of products', () => {
      const searchResult = response[IResponseParams.ISearchResult];
      if (searchResult.length) {
        expect(searchResult.length).to.equal(pageSize);
      } else {
        expect(searchResult, 'It should be an empty array').to.be.an('array')
          .that.is.empty;
      }
    });

    it('should be a valid search response object', () => {
      const searchResponse = response[IResponseParams.ISearchResponse];
      expect(searchResponse, 'It should be an object').to.be.an('object');
      expect(
        searchResponse,
        'The object has no valid properties'
      ).to.have.all.keys(
        'results',
        'facets',
        'totalSize',
        'correctedQuery',
        'attributionToken',
        'nextPageToken',
        'queryExpansionInfo',
        'redirectUri'
      );
    });
  });
});
