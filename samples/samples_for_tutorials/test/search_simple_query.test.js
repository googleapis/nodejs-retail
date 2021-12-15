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

describe('Search simple query', () => {
  describe('Search simple query run', () => {
    let stdout;

    before(async () => {
      stdout = execSync(`node search/search_simple_query.js`, { cwd });
    });

    it('should show that search successfully started', () => {
      assert.match(stdout, /Search start/);
    });

    it('should show that search successfully finished', () => {
      assert.match(stdout, /Search end/);
    });
  });

  describe('Search simple query sample result', () => {
    const retailClient = new SearchServiceClient();

    const projectNumber = process.env['PROJECT_NUMBER'];
    const request = {
      placement: `projects/${projectNumber}/locations/global/catalogs/default_catalog/placements/default_search`,
      query: 'Hoodie',
      visitorId: '12345',
    };
    const IResponseParams = {
      ISearchResult: 0,
      ISearchRequest: 1,
      ISearchResponse: 2,
    };
    let response = [];

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
  });
});
