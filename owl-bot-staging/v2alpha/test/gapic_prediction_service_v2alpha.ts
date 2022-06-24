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
import * as predictionserviceModule from '../src';

import {protobuf} from 'google-gax';

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

describe('v2alpha.PredictionServiceClient', () => {
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

    describe('predict', () => {
        it('invokes predict without error', async () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.retail.v2alpha.PredictRequest());
            request.placement = '';
            const expectedHeaderRequestParams = "placement=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.retail.v2alpha.PredictResponse());
            client.innerApiCalls.predict = stubSimpleCall(expectedResponse);
            const [response] = await client.predict(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.predict as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes predict without error using callback', async () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.retail.v2alpha.PredictRequest());
            request.placement = '';
            const expectedHeaderRequestParams = "placement=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.retail.v2alpha.PredictResponse());
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
            assert((client.innerApiCalls.predict as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes predict with error', async () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.retail.v2alpha.PredictRequest());
            request.placement = '';
            const expectedHeaderRequestParams = "placement=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.predict = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.predict(request), expectedError);
            assert((client.innerApiCalls.predict as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes predict with closed client', async () => {
            const client = new predictionserviceModule.v2alpha.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.retail.v2alpha.PredictRequest());
            request.placement = '';
            const expectedError = new Error('The client has already been closed.');
            client.close();
            await assert.rejects(client.predict(request), expectedError);
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
