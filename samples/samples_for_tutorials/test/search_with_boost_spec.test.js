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

const execSync = cmd => cp.execSync(cmd, { encoding: 'utf-8' });

const cwd = path.join(__dirname, '..');


describe('Search with boost spec', () => {

  describe('Search with boost spec run sample', () => {
    let stdout;

    before(async () => {
      stdout = execSync(`node search/search_with_boost_spec.js`, { cwd });
    });

    it('should show that search successfully started', () => {
      assert.match(stdout, /Search start/);
    });

    it('should show that search successfully finished', () => {
      assert.match(stdout, /Search end/);
    });
  })

  describe('Search with boost spec sample result', () => {
    const retailClient = new SearchServiceClient();
   
    const projectNumber = process.env['PROJECT_NUMBER'];
    const request = {
      placement: `projects/${projectNumber}/locations/global/catalogs/default_catalog/placements/default_search`,
      query: 'Hoodie',
      visitorId: '12345',
      boostSpec: {
        condition: '(colorFamily: ANY("Black"))',
        boost: 0.1
      }
    };
    let filterResult = [];

    before(async () => {
      const iterable = await retailClient.searchAsync(request);
      for await (const response of iterable) {
        filterResult.push(response);
      }
    });

    it('should be a valid array', () => {
      if (filterResult.length) {
        filterResult.forEach((resultItem)  => {
          expect(resultItem, 'It should be an object').to.be.an('object');
          expect(resultItem, 'The object has no  valid properties').to.have.all.keys('matchingVariantFields', 'variantRollupValues', 'id', 'product', 'matchingVariantCount');
        })        
      } else {
        expect(filterResult).to.be.an('array').that.is.empty;
      }
    })
  })


});