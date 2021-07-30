// Copyright 2021 Google LLC
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

import * as protos from '../protos/protos';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {SinonStub} from 'sinon';
import {describe, it} from 'mocha';
import * as catalogserviceModule from '../src';

import {PassThrough} from 'stream';

import {protobuf} from 'google-gax';

function generateSampleMessage<T extends object>(instance: T) {
  const filledObject = (
    instance.constructor as typeof protobuf.Message
  ).toObject(instance as protobuf.Message<T>, {defaults: true});
  return (instance.constructor as typeof protobuf.Message).fromObject(
    filledObject
  ) as T;
}

function stubSimpleCall<ResponseType>(response?: ResponseType, error?: Error) {
  return error
    ? sinon.stub().rejects(error)
    : sinon.stub().resolves([response]);
}

function stubSimpleCallWithCallback<ResponseType>(
  response?: ResponseType,
  error?: Error
) {
  return error
    ? sinon.stub().callsArgWith(2, error)
    : sinon.stub().callsArgWith(2, null, response);
}

function stubPageStreamingCall<ResponseType>(
  responses?: ResponseType[],
  error?: Error
) {
  const pagingStub = sinon.stub();
  if (responses) {
    for (let i = 0; i < responses.length; ++i) {
      pagingStub.onCall(i).callsArgWith(2, null, responses[i]);
    }
  }
  const transformStub = error
    ? sinon.stub().callsArgWith(2, error)
    : pagingStub;
  const mockStream = new PassThrough({
    objectMode: true,
    transform: transformStub,
  });
  // trigger as many responses as needed
  if (responses) {
    for (let i = 0; i < responses.length; ++i) {
      setImmediate(() => {
        mockStream.write({});
      });
    }
    setImmediate(() => {
      mockStream.end();
    });
  } else {
    setImmediate(() => {
      mockStream.write({});
    });
    setImmediate(() => {
      mockStream.end();
    });
  }
  return sinon.stub().returns(mockStream);
}

function stubAsyncIterationCall<ResponseType>(
  responses?: ResponseType[],
  error?: Error
) {
  let counter = 0;
  const asyncIterable = {
    [Symbol.asyncIterator]() {
      return {
        async next() {
          if (error) {
            return Promise.reject(error);
          }
          if (counter >= responses!.length) {
            return Promise.resolve({done: true, value: undefined});
          }
          return Promise.resolve({done: false, value: responses![counter++]});
        },
      };
    },
  };
  return sinon.stub().returns(asyncIterable);
}

describe('v2beta.CatalogServiceClient', () => {
  it('has servicePath', () => {
    const servicePath =
      catalogserviceModule.v2beta.CatalogServiceClient.servicePath;
    assert(servicePath);
  });

  it('has apiEndpoint', () => {
    const apiEndpoint =
      catalogserviceModule.v2beta.CatalogServiceClient.apiEndpoint;
    assert(apiEndpoint);
  });

  it('has port', () => {
    const port = catalogserviceModule.v2beta.CatalogServiceClient.port;
    assert(port);
    assert(typeof port === 'number');
  });

  it('should create a client with no option', () => {
    const client = new catalogserviceModule.v2beta.CatalogServiceClient();
    assert(client);
  });

  it('should create a client with gRPC fallback', () => {
    const client = new catalogserviceModule.v2beta.CatalogServiceClient({
      fallback: true,
    });
    assert(client);
  });

  it('has initialize method and supports deferred initialization', async () => {
    const client = new catalogserviceModule.v2beta.CatalogServiceClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    assert.strictEqual(client.catalogServiceStub, undefined);
    await client.initialize();
    assert(client.catalogServiceStub);
  });

  it('has close method', () => {
    const client = new catalogserviceModule.v2beta.CatalogServiceClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    client.close();
  });

  it('has getProjectId method', async () => {
    const fakeProjectId = 'fake-project-id';
    const client = new catalogserviceModule.v2beta.CatalogServiceClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    client.auth.getProjectId = sinon.stub().resolves(fakeProjectId);
    const result = await client.getProjectId();
    assert.strictEqual(result, fakeProjectId);
    assert((client.auth.getProjectId as SinonStub).calledWithExactly());
  });

  it('has getProjectId method with callback', async () => {
    const fakeProjectId = 'fake-project-id';
    const client = new catalogserviceModule.v2beta.CatalogServiceClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    client.auth.getProjectId = sinon
      .stub()
      .callsArgWith(0, null, fakeProjectId);
    const promise = new Promise((resolve, reject) => {
      client.getProjectId((err?: Error | null, projectId?: string | null) => {
        if (err) {
          reject(err);
        } else {
          resolve(projectId);
        }
      });
    });
    const result = await promise;
    assert.strictEqual(result, fakeProjectId);
  });

  describe('updateCatalog', () => {
    it('invokes updateCatalog without error', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.UpdateCatalogRequest()
      );
      request.catalog = {};
      request.catalog.name = '';
      const expectedHeaderRequestParams = 'catalog.name=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.Catalog()
      );
      client.innerApiCalls.updateCatalog = stubSimpleCall(expectedResponse);
      const [response] = await client.updateCatalog(request);
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.updateCatalog as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes updateCatalog without error using callback', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.UpdateCatalogRequest()
      );
      request.catalog = {};
      request.catalog.name = '';
      const expectedHeaderRequestParams = 'catalog.name=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.Catalog()
      );
      client.innerApiCalls.updateCatalog =
        stubSimpleCallWithCallback(expectedResponse);
      const promise = new Promise((resolve, reject) => {
        client.updateCatalog(
          request,
          (
            err?: Error | null,
            result?: protos.google.cloud.retail.v2beta.ICatalog | null
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      const response = await promise;
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.updateCatalog as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions /*, callback defined above */)
      );
    });

    it('invokes updateCatalog with error', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.UpdateCatalogRequest()
      );
      request.catalog = {};
      request.catalog.name = '';
      const expectedHeaderRequestParams = 'catalog.name=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedError = new Error('expected');
      client.innerApiCalls.updateCatalog = stubSimpleCall(
        undefined,
        expectedError
      );
      await assert.rejects(client.updateCatalog(request), expectedError);
      assert(
        (client.innerApiCalls.updateCatalog as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });
  });

  describe('setDefaultBranch', () => {
    it('invokes setDefaultBranch without error', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.SetDefaultBranchRequest()
      );
      request.catalog = '';
      const expectedHeaderRequestParams = 'catalog=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.protobuf.Empty()
      );
      client.innerApiCalls.setDefaultBranch = stubSimpleCall(expectedResponse);
      const [response] = await client.setDefaultBranch(request);
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.setDefaultBranch as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes setDefaultBranch without error using callback', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.SetDefaultBranchRequest()
      );
      request.catalog = '';
      const expectedHeaderRequestParams = 'catalog=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.protobuf.Empty()
      );
      client.innerApiCalls.setDefaultBranch =
        stubSimpleCallWithCallback(expectedResponse);
      const promise = new Promise((resolve, reject) => {
        client.setDefaultBranch(
          request,
          (
            err?: Error | null,
            result?: protos.google.protobuf.IEmpty | null
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      const response = await promise;
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.setDefaultBranch as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions /*, callback defined above */)
      );
    });

    it('invokes setDefaultBranch with error', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.SetDefaultBranchRequest()
      );
      request.catalog = '';
      const expectedHeaderRequestParams = 'catalog=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedError = new Error('expected');
      client.innerApiCalls.setDefaultBranch = stubSimpleCall(
        undefined,
        expectedError
      );
      await assert.rejects(client.setDefaultBranch(request), expectedError);
      assert(
        (client.innerApiCalls.setDefaultBranch as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });
  });

  describe('getDefaultBranch', () => {
    it('invokes getDefaultBranch without error', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.GetDefaultBranchRequest()
      );
      request.catalog = '';
      const expectedHeaderRequestParams = 'catalog=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.GetDefaultBranchResponse()
      );
      client.innerApiCalls.getDefaultBranch = stubSimpleCall(expectedResponse);
      const [response] = await client.getDefaultBranch(request);
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.getDefaultBranch as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes getDefaultBranch without error using callback', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.GetDefaultBranchRequest()
      );
      request.catalog = '';
      const expectedHeaderRequestParams = 'catalog=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.GetDefaultBranchResponse()
      );
      client.innerApiCalls.getDefaultBranch =
        stubSimpleCallWithCallback(expectedResponse);
      const promise = new Promise((resolve, reject) => {
        client.getDefaultBranch(
          request,
          (
            err?: Error | null,
            result?: protos.google.cloud.retail.v2beta.IGetDefaultBranchResponse | null
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      const response = await promise;
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.getDefaultBranch as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions /*, callback defined above */)
      );
    });

    it('invokes getDefaultBranch with error', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.GetDefaultBranchRequest()
      );
      request.catalog = '';
      const expectedHeaderRequestParams = 'catalog=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedError = new Error('expected');
      client.innerApiCalls.getDefaultBranch = stubSimpleCall(
        undefined,
        expectedError
      );
      await assert.rejects(client.getDefaultBranch(request), expectedError);
      assert(
        (client.innerApiCalls.getDefaultBranch as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });
  });

  describe('listCatalogs', () => {
    it('invokes listCatalogs without error', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.ListCatalogsRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = [
        generateSampleMessage(new protos.google.cloud.retail.v2beta.Catalog()),
        generateSampleMessage(new protos.google.cloud.retail.v2beta.Catalog()),
        generateSampleMessage(new protos.google.cloud.retail.v2beta.Catalog()),
      ];
      client.innerApiCalls.listCatalogs = stubSimpleCall(expectedResponse);
      const [response] = await client.listCatalogs(request);
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.listCatalogs as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes listCatalogs without error using callback', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.ListCatalogsRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = [
        generateSampleMessage(new protos.google.cloud.retail.v2beta.Catalog()),
        generateSampleMessage(new protos.google.cloud.retail.v2beta.Catalog()),
        generateSampleMessage(new protos.google.cloud.retail.v2beta.Catalog()),
      ];
      client.innerApiCalls.listCatalogs =
        stubSimpleCallWithCallback(expectedResponse);
      const promise = new Promise((resolve, reject) => {
        client.listCatalogs(
          request,
          (
            err?: Error | null,
            result?: protos.google.cloud.retail.v2beta.ICatalog[] | null
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      const response = await promise;
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.listCatalogs as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions /*, callback defined above */)
      );
    });

    it('invokes listCatalogs with error', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.ListCatalogsRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedError = new Error('expected');
      client.innerApiCalls.listCatalogs = stubSimpleCall(
        undefined,
        expectedError
      );
      await assert.rejects(client.listCatalogs(request), expectedError);
      assert(
        (client.innerApiCalls.listCatalogs as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes listCatalogsStream without error', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.ListCatalogsRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedResponse = [
        generateSampleMessage(new protos.google.cloud.retail.v2beta.Catalog()),
        generateSampleMessage(new protos.google.cloud.retail.v2beta.Catalog()),
        generateSampleMessage(new protos.google.cloud.retail.v2beta.Catalog()),
      ];
      client.descriptors.page.listCatalogs.createStream =
        stubPageStreamingCall(expectedResponse);
      const stream = client.listCatalogsStream(request);
      const promise = new Promise((resolve, reject) => {
        const responses: protos.google.cloud.retail.v2beta.Catalog[] = [];
        stream.on(
          'data',
          (response: protos.google.cloud.retail.v2beta.Catalog) => {
            responses.push(response);
          }
        );
        stream.on('end', () => {
          resolve(responses);
        });
        stream.on('error', (err: Error) => {
          reject(err);
        });
      });
      const responses = await promise;
      assert.deepStrictEqual(responses, expectedResponse);
      assert(
        (client.descriptors.page.listCatalogs.createStream as SinonStub)
          .getCall(0)
          .calledWith(client.innerApiCalls.listCatalogs, request)
      );
      assert.strictEqual(
        (
          client.descriptors.page.listCatalogs.createStream as SinonStub
        ).getCall(0).args[2].otherArgs.headers['x-goog-request-params'],
        expectedHeaderRequestParams
      );
    });

    it('invokes listCatalogsStream with error', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.ListCatalogsRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedError = new Error('expected');
      client.descriptors.page.listCatalogs.createStream = stubPageStreamingCall(
        undefined,
        expectedError
      );
      const stream = client.listCatalogsStream(request);
      const promise = new Promise((resolve, reject) => {
        const responses: protos.google.cloud.retail.v2beta.Catalog[] = [];
        stream.on(
          'data',
          (response: protos.google.cloud.retail.v2beta.Catalog) => {
            responses.push(response);
          }
        );
        stream.on('end', () => {
          resolve(responses);
        });
        stream.on('error', (err: Error) => {
          reject(err);
        });
      });
      await assert.rejects(promise, expectedError);
      assert(
        (client.descriptors.page.listCatalogs.createStream as SinonStub)
          .getCall(0)
          .calledWith(client.innerApiCalls.listCatalogs, request)
      );
      assert.strictEqual(
        (
          client.descriptors.page.listCatalogs.createStream as SinonStub
        ).getCall(0).args[2].otherArgs.headers['x-goog-request-params'],
        expectedHeaderRequestParams
      );
    });

    it('uses async iteration with listCatalogs without error', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.ListCatalogsRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedResponse = [
        generateSampleMessage(new protos.google.cloud.retail.v2beta.Catalog()),
        generateSampleMessage(new protos.google.cloud.retail.v2beta.Catalog()),
        generateSampleMessage(new protos.google.cloud.retail.v2beta.Catalog()),
      ];
      client.descriptors.page.listCatalogs.asyncIterate =
        stubAsyncIterationCall(expectedResponse);
      const responses: protos.google.cloud.retail.v2beta.ICatalog[] = [];
      const iterable = client.listCatalogsAsync(request);
      for await (const resource of iterable) {
        responses.push(resource!);
      }
      assert.deepStrictEqual(responses, expectedResponse);
      assert.deepStrictEqual(
        (
          client.descriptors.page.listCatalogs.asyncIterate as SinonStub
        ).getCall(0).args[1],
        request
      );
      assert.strictEqual(
        (
          client.descriptors.page.listCatalogs.asyncIterate as SinonStub
        ).getCall(0).args[2].otherArgs.headers['x-goog-request-params'],
        expectedHeaderRequestParams
      );
    });

    it('uses async iteration with listCatalogs with error', async () => {
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.cloud.retail.v2beta.ListCatalogsRequest()
      );
      request.parent = '';
      const expectedHeaderRequestParams = 'parent=';
      const expectedError = new Error('expected');
      client.descriptors.page.listCatalogs.asyncIterate =
        stubAsyncIterationCall(undefined, expectedError);
      const iterable = client.listCatalogsAsync(request);
      await assert.rejects(async () => {
        const responses: protos.google.cloud.retail.v2beta.ICatalog[] = [];
        for await (const resource of iterable) {
          responses.push(resource!);
        }
      });
      assert.deepStrictEqual(
        (
          client.descriptors.page.listCatalogs.asyncIterate as SinonStub
        ).getCall(0).args[1],
        request
      );
      assert.strictEqual(
        (
          client.descriptors.page.listCatalogs.asyncIterate as SinonStub
        ).getCall(0).args[2].otherArgs.headers['x-goog-request-params'],
        expectedHeaderRequestParams
      );
    });
  });

  describe('Path templates', () => {
    describe('branch', () => {
      const fakePath = '/rendered/path/branch';
      const expectedParameters = {
        project: 'projectValue',
        location: 'locationValue',
        catalog: 'catalogValue',
        branch: 'branchValue',
      };
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      client.pathTemplates.branchPathTemplate.render = sinon
        .stub()
        .returns(fakePath);
      client.pathTemplates.branchPathTemplate.match = sinon
        .stub()
        .returns(expectedParameters);

      it('branchPath', () => {
        const result = client.branchPath(
          'projectValue',
          'locationValue',
          'catalogValue',
          'branchValue'
        );
        assert.strictEqual(result, fakePath);
        assert(
          (client.pathTemplates.branchPathTemplate.render as SinonStub)
            .getCall(-1)
            .calledWith(expectedParameters)
        );
      });

      it('matchProjectFromBranchName', () => {
        const result = client.matchProjectFromBranchName(fakePath);
        assert.strictEqual(result, 'projectValue');
        assert(
          (client.pathTemplates.branchPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });

      it('matchLocationFromBranchName', () => {
        const result = client.matchLocationFromBranchName(fakePath);
        assert.strictEqual(result, 'locationValue');
        assert(
          (client.pathTemplates.branchPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });

      it('matchCatalogFromBranchName', () => {
        const result = client.matchCatalogFromBranchName(fakePath);
        assert.strictEqual(result, 'catalogValue');
        assert(
          (client.pathTemplates.branchPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });

      it('matchBranchFromBranchName', () => {
        const result = client.matchBranchFromBranchName(fakePath);
        assert.strictEqual(result, 'branchValue');
        assert(
          (client.pathTemplates.branchPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });
    });

    describe('catalog', () => {
      const fakePath = '/rendered/path/catalog';
      const expectedParameters = {
        project: 'projectValue',
        location: 'locationValue',
        catalog: 'catalogValue',
      };
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      client.pathTemplates.catalogPathTemplate.render = sinon
        .stub()
        .returns(fakePath);
      client.pathTemplates.catalogPathTemplate.match = sinon
        .stub()
        .returns(expectedParameters);

      it('catalogPath', () => {
        const result = client.catalogPath(
          'projectValue',
          'locationValue',
          'catalogValue'
        );
        assert.strictEqual(result, fakePath);
        assert(
          (client.pathTemplates.catalogPathTemplate.render as SinonStub)
            .getCall(-1)
            .calledWith(expectedParameters)
        );
      });

      it('matchProjectFromCatalogName', () => {
        const result = client.matchProjectFromCatalogName(fakePath);
        assert.strictEqual(result, 'projectValue');
        assert(
          (client.pathTemplates.catalogPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });

      it('matchLocationFromCatalogName', () => {
        const result = client.matchLocationFromCatalogName(fakePath);
        assert.strictEqual(result, 'locationValue');
        assert(
          (client.pathTemplates.catalogPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });

      it('matchCatalogFromCatalogName', () => {
        const result = client.matchCatalogFromCatalogName(fakePath);
        assert.strictEqual(result, 'catalogValue');
        assert(
          (client.pathTemplates.catalogPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });
    });

    describe('location', () => {
      const fakePath = '/rendered/path/location';
      const expectedParameters = {
        project: 'projectValue',
        location: 'locationValue',
      };
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      client.pathTemplates.locationPathTemplate.render = sinon
        .stub()
        .returns(fakePath);
      client.pathTemplates.locationPathTemplate.match = sinon
        .stub()
        .returns(expectedParameters);

      it('locationPath', () => {
        const result = client.locationPath('projectValue', 'locationValue');
        assert.strictEqual(result, fakePath);
        assert(
          (client.pathTemplates.locationPathTemplate.render as SinonStub)
            .getCall(-1)
            .calledWith(expectedParameters)
        );
      });

      it('matchProjectFromLocationName', () => {
        const result = client.matchProjectFromLocationName(fakePath);
        assert.strictEqual(result, 'projectValue');
        assert(
          (client.pathTemplates.locationPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });

      it('matchLocationFromLocationName', () => {
        const result = client.matchLocationFromLocationName(fakePath);
        assert.strictEqual(result, 'locationValue');
        assert(
          (client.pathTemplates.locationPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });
    });

    describe('product', () => {
      const fakePath = '/rendered/path/product';
      const expectedParameters = {
        project: 'projectValue',
        location: 'locationValue',
        catalog: 'catalogValue',
        branch: 'branchValue',
        product: 'productValue',
      };
      const client = new catalogserviceModule.v2beta.CatalogServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      client.pathTemplates.productPathTemplate.render = sinon
        .stub()
        .returns(fakePath);
      client.pathTemplates.productPathTemplate.match = sinon
        .stub()
        .returns(expectedParameters);

      it('productPath', () => {
        const result = client.productPath(
          'projectValue',
          'locationValue',
          'catalogValue',
          'branchValue',
          'productValue'
        );
        assert.strictEqual(result, fakePath);
        assert(
          (client.pathTemplates.productPathTemplate.render as SinonStub)
            .getCall(-1)
            .calledWith(expectedParameters)
        );
      });

      it('matchProjectFromProductName', () => {
        const result = client.matchProjectFromProductName(fakePath);
        assert.strictEqual(result, 'projectValue');
        assert(
          (client.pathTemplates.productPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });

      it('matchLocationFromProductName', () => {
        const result = client.matchLocationFromProductName(fakePath);
        assert.strictEqual(result, 'locationValue');
        assert(
          (client.pathTemplates.productPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });

      it('matchCatalogFromProductName', () => {
        const result = client.matchCatalogFromProductName(fakePath);
        assert.strictEqual(result, 'catalogValue');
        assert(
          (client.pathTemplates.productPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });

      it('matchBranchFromProductName', () => {
        const result = client.matchBranchFromProductName(fakePath);
        assert.strictEqual(result, 'branchValue');
        assert(
          (client.pathTemplates.productPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });

      it('matchProductFromProductName', () => {
        const result = client.matchProductFromProductName(fakePath);
        assert.strictEqual(result, 'productValue');
        assert(
          (client.pathTemplates.productPathTemplate.match as SinonStub)
            .getCall(-1)
            .calledWith(fakePath)
        );
      });
    });
  });
});
