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

import * as protos from '../protos/protos';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {SinonStub} from 'sinon';
import { describe, it } from 'mocha';
import * as completionserviceModule from '../src';

import {protobuf, LROperation, operationsProtos} from 'google-gax';

function generateSampleMessage<T extends object>(instance: T) {
    const filledObject = (instance.constructor as typeof protobuf.Message)
        .toObject(instance as protobuf.Message<T>, {defaults: true});
    return (instance.constructor as typeof protobuf.Message).fromObject(filledObject) as T;
}

function stubSimpleCall<ResponseType>(response?: ResponseType, error?: Error) {
    return error ? sinon.stub().rejects(error) : sinon.stub().resolves([response]);
}

function stubSimpleCallWithCallback<ResponseType>(response?: ResponseType, error?: Error) {
    return error ? sinon.stub().callsArgWith(2, error) : sinon.stub().callsArgWith(2, null, response);
}

function stubLongRunningCall<ResponseType>(response?: ResponseType, callError?: Error, lroError?: Error) {
    const innerStub = lroError ? sinon.stub().rejects(lroError) : sinon.stub().resolves([response]);
    const mockOperation = {
        promise: innerStub,
    };
    return callError ? sinon.stub().rejects(callError) : sinon.stub().resolves([mockOperation]);
}

function stubLongRunningCallWithCallback<ResponseType>(response?: ResponseType, callError?: Error, lroError?: Error) {
    const innerStub = lroError ? sinon.stub().rejects(lroError) : sinon.stub().resolves([response]);
    const mockOperation = {
        promise: innerStub,
    };
    return callError ? sinon.stub().callsArgWith(2, callError) : sinon.stub().callsArgWith(2, null, mockOperation);
}

describe('v2.CompletionServiceClient', () => {
    it('has servicePath', () => {
        const servicePath = completionserviceModule.v2.CompletionServiceClient.servicePath;
        assert(servicePath);
    });

    it('has apiEndpoint', () => {
        const apiEndpoint = completionserviceModule.v2.CompletionServiceClient.apiEndpoint;
        assert(apiEndpoint);
    });

    it('has port', () => {
        const port = completionserviceModule.v2.CompletionServiceClient.port;
        assert(port);
        assert(typeof port === 'number');
    });

    it('should create a client with no option', () => {
        const client = new completionserviceModule.v2.CompletionServiceClient();
        assert(client);
    });

    it('should create a client with gRPC fallback', () => {
        const client = new completionserviceModule.v2.CompletionServiceClient({
            fallback: true,
        });
        assert(client);
    });

    it('has initialize method and supports deferred initialization', async () => {
        const client = new completionserviceModule.v2.CompletionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        assert.strictEqual(client.completionServiceStub, undefined);
        await client.initialize();
        assert(client.completionServiceStub);
    });

    it('has close method', () => {
        const client = new completionserviceModule.v2.CompletionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        client.close();
    });

    it('has getProjectId method', async () => {
        const fakeProjectId = 'fake-project-id';
        const client = new completionserviceModule.v2.CompletionServiceClient({
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
        const client = new completionserviceModule.v2.CompletionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        client.auth.getProjectId = sinon.stub().callsArgWith(0, null, fakeProjectId);
        const promise = new Promise((resolve, reject) => {
            client.getProjectId((err?: Error|null, projectId?: string|null) => {
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

    describe('completeQuery', () => {
        it('invokes completeQuery without error', async () => {
            const client = new completionserviceModule.v2.CompletionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.retail.v2.CompleteQueryRequest());
            request.catalog = '';
            const expectedHeaderRequestParams = "catalog=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.retail.v2.CompleteQueryResponse());
            client.innerApiCalls.completeQuery = stubSimpleCall(expectedResponse);
            const [response] = await client.completeQuery(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.completeQuery as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes completeQuery without error using callback', async () => {
            const client = new completionserviceModule.v2.CompletionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.retail.v2.CompleteQueryRequest());
            request.catalog = '';
            const expectedHeaderRequestParams = "catalog=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.retail.v2.CompleteQueryResponse());
            client.innerApiCalls.completeQuery = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.completeQuery(
                    request,
                    (err?: Error|null, result?: protos.google.cloud.retail.v2.ICompleteQueryResponse|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.completeQuery as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes completeQuery with error', async () => {
            const client = new completionserviceModule.v2.CompletionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.retail.v2.CompleteQueryRequest());
            request.catalog = '';
            const expectedHeaderRequestParams = "catalog=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.completeQuery = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.completeQuery(request), expectedError);
            assert((client.innerApiCalls.completeQuery as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('importCompletionData', () => {
        it('invokes importCompletionData without error', async () => {
            const client = new completionserviceModule.v2.CompletionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.retail.v2.ImportCompletionDataRequest());
            request.parent = '';
            const expectedHeaderRequestParams = "parent=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.longrunning.Operation());
            client.innerApiCalls.importCompletionData = stubLongRunningCall(expectedResponse);
            const [operation] = await client.importCompletionData(request);
            const [response] = await operation.promise();
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.importCompletionData as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes importCompletionData without error using callback', async () => {
            const client = new completionserviceModule.v2.CompletionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.retail.v2.ImportCompletionDataRequest());
            request.parent = '';
            const expectedHeaderRequestParams = "parent=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.longrunning.Operation());
            client.innerApiCalls.importCompletionData = stubLongRunningCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.importCompletionData(
                    request,
                    (err?: Error|null,
                     result?: LROperation<protos.google.cloud.retail.v2.IImportCompletionDataResponse, protos.google.cloud.retail.v2.IImportMetadata>|null
                    ) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const operation = await promise as LROperation<protos.google.cloud.retail.v2.IImportCompletionDataResponse, protos.google.cloud.retail.v2.IImportMetadata>;
            const [response] = await operation.promise();
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.importCompletionData as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes importCompletionData with call error', async () => {
            const client = new completionserviceModule.v2.CompletionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.retail.v2.ImportCompletionDataRequest());
            request.parent = '';
            const expectedHeaderRequestParams = "parent=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.importCompletionData = stubLongRunningCall(undefined, expectedError);
            await assert.rejects(client.importCompletionData(request), expectedError);
            assert((client.innerApiCalls.importCompletionData as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes importCompletionData with LRO error', async () => {
            const client = new completionserviceModule.v2.CompletionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.retail.v2.ImportCompletionDataRequest());
            request.parent = '';
            const expectedHeaderRequestParams = "parent=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.importCompletionData = stubLongRunningCall(undefined, undefined, expectedError);
            const [operation] = await client.importCompletionData(request);
            await assert.rejects(operation.promise(), expectedError);
            assert((client.innerApiCalls.importCompletionData as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes checkImportCompletionDataProgress without error', async () => {
            const client = new completionserviceModule.v2.CompletionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const expectedResponse = generateSampleMessage(new operationsProtos.google.longrunning.Operation());
            expectedResponse.name = 'test';
            expectedResponse.response = {type_url: 'url', value: Buffer.from('')};
            expectedResponse.metadata = {type_url: 'url', value: Buffer.from('')}

            client.operationsClient.getOperation = stubSimpleCall(expectedResponse);
            const decodedOperation = await client.checkImportCompletionDataProgress(expectedResponse.name);
            assert.deepStrictEqual(decodedOperation.name, expectedResponse.name);
            assert(decodedOperation.metadata);
            assert((client.operationsClient.getOperation as SinonStub).getCall(0));
        });

        it('invokes checkImportCompletionDataProgress with error', async () => {
            const client = new completionserviceModule.v2.CompletionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const expectedError = new Error('expected');

            client.operationsClient.getOperation = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.checkImportCompletionDataProgress(''), expectedError);
            assert((client.operationsClient.getOperation as SinonStub)
                .getCall(0));
        });
    });

    describe('Path templates', () => {

        describe('catalog', () => {
            const fakePath = "/rendered/path/catalog";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                catalog: "catalogValue",
            };
            const client = new completionserviceModule.v2.CompletionServiceClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.catalogPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.catalogPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('catalogPath', () => {
                const result = client.catalogPath("projectValue", "locationValue", "catalogValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.catalogPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromCatalogName', () => {
                const result = client.matchProjectFromCatalogName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.catalogPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromCatalogName', () => {
                const result = client.matchLocationFromCatalogName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.catalogPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchCatalogFromCatalogName', () => {
                const result = client.matchCatalogFromCatalogName(fakePath);
                assert.strictEqual(result, "catalogValue");
                assert((client.pathTemplates.catalogPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });

        describe('product', () => {
            const fakePath = "/rendered/path/product";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                catalog: "catalogValue",
                branch: "branchValue",
                product: "productValue",
            };
            const client = new completionserviceModule.v2.CompletionServiceClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.productPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.productPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('productPath', () => {
                const result = client.productPath("projectValue", "locationValue", "catalogValue", "branchValue", "productValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.productPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromProductName', () => {
                const result = client.matchProjectFromProductName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.productPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromProductName', () => {
                const result = client.matchLocationFromProductName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.productPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchCatalogFromProductName', () => {
                const result = client.matchCatalogFromProductName(fakePath);
                assert.strictEqual(result, "catalogValue");
                assert((client.pathTemplates.productPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchBranchFromProductName', () => {
                const result = client.matchBranchFromProductName(fakePath);
                assert.strictEqual(result, "branchValue");
                assert((client.pathTemplates.productPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchProductFromProductName', () => {
                const result = client.matchProductFromProductName(fakePath);
                assert.strictEqual(result, "productValue");
                assert((client.pathTemplates.productPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });
    });
});
