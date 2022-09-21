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
import {describe, it} from 'mocha';
import * as predictionserviceModule from '../src';

import {protobuf, LocationProtos} from 'google-gax';

// Dynamically loaded proto JSON is needed to get the type information
// to fill in default values for request objects
const root = protobuf.Root.fromJSON(require('../protos/protos.json')).resolveAll();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTypeDefaultValue(typeName: string, fields: string[]) {
    let type = root.lookupType(typeName) as protobuf.Type;
    for (const field of fields.slice(0, -1)) {
        type = type.fields[field]?.resolvedType as protobuf.Type;
    }
    return type.fields[fields[fields.length - 1]]?.defaultValue;
}

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

function stubAsyncIterationCall<ResponseType>(responses?: ResponseType[], error?: Error) {
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
                }
            };
        }
    };
    return sinon.stub().returns(asyncIterable);
}

describe('v2alpha.PredictionServiceClient', () => {
    describe('Common methods', () => {
        it('has servicePath', () => {
            const servicePath = predictionserviceModule.v2alpha.PredictionServiceClient.servicePath;
            assert(servicePath);
        });

        it('has apiEndpoint', () => {
            const apiEndpoint = predictionserviceModule.v2alpha.PredictionServiceClient.apiEndpoint;
            assert(apiEndpoint);
        });

        it('has port', () => {
            const port = predictionserviceModule.v2alpha.PredictionServiceClient.port;
            assert(port);
            assert(typeof port === 'number');
        });

        it('should create a client with no option', () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient();
            assert(client);
        });

        it('should create a client with gRPC fallback', () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
                fallback: true,
            });
            assert(client);
        });

        it('has initialize method and supports deferred initialization', async () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
            });
            assert.strictEqual(client.predictionServiceStub, undefined);
            await client.initialize();
            assert(client.predictionServiceStub);
        });

        it('has close method for the initialized client', done => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
            });
            client.initialize();
            assert(client.predictionServiceStub);
            client.close().then(() => {
                done();
            });
        });

        it('has close method for the non-initialized client', done => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
            });
            assert.strictEqual(client.predictionServiceStub, undefined);
            client.close().then(() => {
                done();
            });
        });

        it('has getProjectId method', async () => {
            const fakeProjectId = 'fake-project-id';
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
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
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
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
    });

    describe('predict', () => {
        it('invokes predict without error', async () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(
              new protos.google.cloud.retail.v2alpha.PredictRequest()
            );
            const defaultValue1 =
              getTypeDefaultValue('.google.cloud.retail.v2alpha.PredictRequest', ['placement']);
            request.placement = defaultValue1;
            const expectedHeaderRequestParams = `placement=${defaultValue1}`;
            const expectedResponse = generateSampleMessage(
              new protos.google.cloud.retail.v2alpha.PredictResponse()
            );
            client.innerApiCalls.predict = stubSimpleCall(expectedResponse);
            const [response] = await client.predict(request);
            assert.deepStrictEqual(response, expectedResponse);
            const actualRequest = (client.innerApiCalls.predict as SinonStub)
                .getCall(0).args[0];
            assert.deepStrictEqual(actualRequest, request);
            const actualHeaderRequestParams = (client.innerApiCalls.predict as SinonStub)
                .getCall(0).args[1].otherArgs.headers['x-goog-request-params'];
            assert(actualHeaderRequestParams.includes(expectedHeaderRequestParams));
        });

        it('invokes predict without error using callback', async () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(
              new protos.google.cloud.retail.v2alpha.PredictRequest()
            );
            const defaultValue1 =
              getTypeDefaultValue('.google.cloud.retail.v2alpha.PredictRequest', ['placement']);
            request.placement = defaultValue1;
            const expectedHeaderRequestParams = `placement=${defaultValue1}`;
            const expectedResponse = generateSampleMessage(
              new protos.google.cloud.retail.v2alpha.PredictResponse()
            );
            client.innerApiCalls.predict = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.predict(
                    request,
                    (err?: Error|null, result?: protos.google.cloud.retail.v2alpha.IPredictResponse|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            const actualRequest = (client.innerApiCalls.predict as SinonStub)
                .getCall(0).args[0];
            assert.deepStrictEqual(actualRequest, request);
            const actualHeaderRequestParams = (client.innerApiCalls.predict as SinonStub)
                .getCall(0).args[1].otherArgs.headers['x-goog-request-params'];
            assert(actualHeaderRequestParams.includes(expectedHeaderRequestParams));
        });

        it('invokes predict with error', async () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(
              new protos.google.cloud.retail.v2alpha.PredictRequest()
            );
            const defaultValue1 =
              getTypeDefaultValue('.google.cloud.retail.v2alpha.PredictRequest', ['placement']);
            request.placement = defaultValue1;
            const expectedHeaderRequestParams = `placement=${defaultValue1}`;
            const expectedError = new Error('expected');
            client.innerApiCalls.predict = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.predict(request), expectedError);
            const actualRequest = (client.innerApiCalls.predict as SinonStub)
                .getCall(0).args[0];
            assert.deepStrictEqual(actualRequest, request);
            const actualHeaderRequestParams = (client.innerApiCalls.predict as SinonStub)
                .getCall(0).args[1].otherArgs.headers['x-goog-request-params'];
            assert(actualHeaderRequestParams.includes(expectedHeaderRequestParams));
        });

        it('invokes predict with closed client', async () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(
              new protos.google.cloud.retail.v2alpha.PredictRequest()
            );
            const defaultValue1 =
              getTypeDefaultValue('.google.cloud.retail.v2alpha.PredictRequest', ['placement']);
            request.placement = defaultValue1;
            const expectedError = new Error('The client has already been closed.');
            client.close();
            await assert.rejects(client.predict(request), expectedError);
        });
    });
    describe('getLocation', () => {
        it('invokes getLocation without error', async () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(
              new LocationProtos.google.cloud.location.GetLocationRequest()
            );
            request.name = '';
            const expectedHeaderRequestParams = 'name=';
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(
              new LocationProtos.google.cloud.location.Location()
            );
            client.locationsClient.getLocation = stubSimpleCall(expectedResponse);
            const response = await client.getLocation(request, expectedOptions);
            assert.deepStrictEqual(response, [expectedResponse]);
            assert((client.locationsClient.getLocation as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
        it('invokes getLocation without error using callback', async () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(
              new LocationProtos.google.cloud.location.GetLocationRequest()
            );
            request.name = '';
            const expectedHeaderRequestParams = 'name=';
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(
              new LocationProtos.google.cloud.location.Location()
            );
            client.locationsClient.getLocation = sinon.stub().callsArgWith(2, null, expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.getLocation(
                    request,
                    expectedOptions,
                    (
                        err?: Error | null,
                        result?: LocationProtos.google.cloud.location.ILocation | null
                    ) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.locationsClient.getLocation as SinonStub)
                .getCall(0));
        });
        it('invokes getLocation with error', async () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(
              new LocationProtos.google.cloud.location.GetLocationRequest()
            );
            request.name = '';
            const expectedHeaderRequestParams = 'name=';
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.locationsClient.getLocation = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.getLocation(request, expectedOptions), expectedError);
            assert((client.locationsClient.getLocation as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });
    describe('listLocationsAsync', () => {
        it('uses async iteration with listLocations without error', async () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(
                new LocationProtos.google.cloud.location.ListLocationsRequest()
            );
            request.name = '';
            const expectedHeaderRequestParams = 'name=';
            const expectedResponse = [
                generateSampleMessage(
                    new LocationProtos.google.cloud.location.Location()
                ),
                generateSampleMessage(
                    new LocationProtos.google.cloud.location.Location()
                ),
                generateSampleMessage(
                    new LocationProtos.google.cloud.location.Location()
                ),
            ];
            client.locationsClient.descriptors.page.listLocations.asyncIterate = stubAsyncIterationCall(expectedResponse);
            const responses: LocationProtos.google.cloud.location.ILocation[] = [];
            const iterable = client.listLocationsAsync(request);
            for await (const resource of iterable) {
                responses.push(resource!);
            }
            assert.deepStrictEqual(responses, expectedResponse);
            assert.deepStrictEqual(
                (client.locationsClient.descriptors.page.listLocations.asyncIterate as SinonStub)
                    .getCall(0).args[1], request);
            assert(
                (client.locationsClient.descriptors.page.listLocations.asyncIterate as SinonStub)
                    .getCall(0).args[2].otherArgs.headers['x-goog-request-params'].includes(
                        expectedHeaderRequestParams
                    )
            );
        });
        it('uses async iteration with listLocations with error', async () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(
              new LocationProtos.google.cloud.location.ListLocationsRequest()
            );
            request.name = '';
            const expectedHeaderRequestParams = 'name=';
            const expectedError = new Error('expected');
            client.locationsClient.descriptors.page.listLocations.asyncIterate = stubAsyncIterationCall(undefined, expectedError);
            const iterable = client.listLocationsAsync(request);
            await assert.rejects(async () => {
                const responses: LocationProtos.google.cloud.location.ILocation[] = [];
                for await (const resource of iterable) {
                    responses.push(resource!);
                }
            });
            assert.deepStrictEqual(
                (client.locationsClient.descriptors.page.listLocations.asyncIterate as SinonStub)
                    .getCall(0).args[1], request);
            assert(
                (client.locationsClient.descriptors.page.listLocations.asyncIterate as SinonStub)
                    .getCall(0).args[2].otherArgs.headers['x-goog-request-params'].includes(
                        expectedHeaderRequestParams
                    )
            );
        });
    });

    describe('Path templates', () => {

        describe('attributesConfig', () => {
            const fakePath = "/rendered/path/attributesConfig";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                catalog: "catalogValue",
            };
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.attributesConfigPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.attributesConfigPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('attributesConfigPath', () => {
                const result = client.attributesConfigPath("projectValue", "locationValue", "catalogValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.attributesConfigPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromAttributesConfigName', () => {
                const result = client.matchProjectFromAttributesConfigName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.attributesConfigPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromAttributesConfigName', () => {
                const result = client.matchLocationFromAttributesConfigName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.attributesConfigPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchCatalogFromAttributesConfigName', () => {
                const result = client.matchCatalogFromAttributesConfigName(fakePath);
                assert.strictEqual(result, "catalogValue");
                assert((client.pathTemplates.attributesConfigPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });

        describe('catalog', () => {
            const fakePath = "/rendered/path/catalog";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                catalog: "catalogValue",
            };
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
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

        describe('completionConfig', () => {
            const fakePath = "/rendered/path/completionConfig";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                catalog: "catalogValue",
            };
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.completionConfigPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.completionConfigPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('completionConfigPath', () => {
                const result = client.completionConfigPath("projectValue", "locationValue", "catalogValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.completionConfigPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromCompletionConfigName', () => {
                const result = client.matchProjectFromCompletionConfigName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.completionConfigPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromCompletionConfigName', () => {
                const result = client.matchLocationFromCompletionConfigName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.completionConfigPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchCatalogFromCompletionConfigName', () => {
                const result = client.matchCatalogFromCompletionConfigName(fakePath);
                assert.strictEqual(result, "catalogValue");
                assert((client.pathTemplates.completionConfigPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });

        describe('control', () => {
            const fakePath = "/rendered/path/control";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                catalog: "catalogValue",
                control: "controlValue",
            };
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.controlPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.controlPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('controlPath', () => {
                const result = client.controlPath("projectValue", "locationValue", "catalogValue", "controlValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.controlPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromControlName', () => {
                const result = client.matchProjectFromControlName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.controlPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromControlName', () => {
                const result = client.matchLocationFromControlName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.controlPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchCatalogFromControlName', () => {
                const result = client.matchCatalogFromControlName(fakePath);
                assert.strictEqual(result, "catalogValue");
                assert((client.pathTemplates.controlPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchControlFromControlName', () => {
                const result = client.matchControlFromControlName(fakePath);
                assert.strictEqual(result, "controlValue");
                assert((client.pathTemplates.controlPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });

        describe('model', () => {
            const fakePath = "/rendered/path/model";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                catalog: "catalogValue",
                model: "modelValue",
            };
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.modelPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.modelPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('modelPath', () => {
                const result = client.modelPath("projectValue", "locationValue", "catalogValue", "modelValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.modelPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromModelName', () => {
                const result = client.matchProjectFromModelName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.modelPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromModelName', () => {
                const result = client.matchLocationFromModelName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.modelPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchCatalogFromModelName', () => {
                const result = client.matchCatalogFromModelName(fakePath);
                assert.strictEqual(result, "catalogValue");
                assert((client.pathTemplates.modelPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchModelFromModelName', () => {
                const result = client.matchModelFromModelName(fakePath);
                assert.strictEqual(result, "modelValue");
                assert((client.pathTemplates.modelPathTemplate.match as SinonStub)
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
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
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

        describe('servingConfig', () => {
            const fakePath = "/rendered/path/servingConfig";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                catalog: "catalogValue",
                serving_config: "servingConfigValue",
            };
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.servingConfigPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.servingConfigPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('servingConfigPath', () => {
                const result = client.servingConfigPath("projectValue", "locationValue", "catalogValue", "servingConfigValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.servingConfigPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromServingConfigName', () => {
                const result = client.matchProjectFromServingConfigName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.servingConfigPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromServingConfigName', () => {
                const result = client.matchLocationFromServingConfigName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.servingConfigPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchCatalogFromServingConfigName', () => {
                const result = client.matchCatalogFromServingConfigName(fakePath);
                assert.strictEqual(result, "catalogValue");
                assert((client.pathTemplates.servingConfigPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchServingConfigFromServingConfigName', () => {
                const result = client.matchServingConfigFromServingConfigName(fakePath);
                assert.strictEqual(result, "servingConfigValue");
                assert((client.pathTemplates.servingConfigPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });
    });
});
