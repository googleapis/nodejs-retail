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

/* global window */
import * as gax from 'google-gax';
import {
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
  LROperation,
} from 'google-gax';

import * as protos from '../../protos/protos';
import jsonProtos = require('../../protos/protos.json');
/**
 * Client JSON configuration object, loaded from
 * `src/v2alpha/completion_service_client_config.json`.
 * This file defines retry strategy and timeouts for all API methods in this library.
 */
import * as gapicConfig from './completion_service_client_config.json';
import {operationsProtos} from 'google-gax';
const version = require('../../../package.json').version;

/**
 *  Auto-completion service for retail.
 *
 *  This feature is only available for users who have Retail Search enabled.
 *  Please submit a form [here](https://cloud.google.com/contact) to contact
 *  cloud sales if you are interested in using Retail Search.
 * @class
 * @memberof v2alpha
 */
export class CompletionServiceClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _providedCustomServicePath: boolean;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  warn: (code: string, message: string, warnType?: string) => void;
  innerApiCalls: {[name: string]: Function};
  pathTemplates: {[name: string]: gax.PathTemplate};
  operationsClient: gax.OperationsClient;
  completionServiceStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of CompletionServiceClient.
   *
   * @param {object} [options] - The configuration object.
   * The options accepted by the constructor are described in detail
   * in [this document](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#creating-the-client-instance).
   * The common options are:
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
   *     Follows the structure of {@link gapicConfig}.
   * @param {boolean} [options.fallback] - Use HTTP fallback mode.
   *     In fallback mode, a special browser-compatible transport implementation is used
   *     instead of gRPC transport. In browser context (if the `window` object is defined)
   *     the fallback mode is enabled automatically; set `options.fallback` to `false`
   *     if you need to override this behavior.
   */
  constructor(opts?: ClientOptions) {
    // Ensure that options include all the required fields.
    const staticMembers = this.constructor as typeof CompletionServiceClient;
    const servicePath =
      opts?.servicePath || opts?.apiEndpoint || staticMembers.servicePath;
    this._providedCustomServicePath = !!(
      opts?.servicePath || opts?.apiEndpoint
    );
    const port = opts?.port || staticMembers.port;
    const clientConfig = opts?.clientConfig ?? {};
    const fallback =
      opts?.fallback ??
      (typeof window !== 'undefined' && typeof window?.fetch === 'function');
    opts = Object.assign({servicePath, port, clientConfig, fallback}, opts);

    // If scopes are unset in options and we're connecting to a non-default endpoint, set scopes just in case.
    if (servicePath !== staticMembers.servicePath && !('scopes' in opts)) {
      opts['scopes'] = staticMembers.scopes;
    }

    // Choose either gRPC or proto-over-HTTP implementation of google-gax.
    this._gaxModule = opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options sent to the client.
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Set the default scopes in auth client if needed.
    if (servicePath === staticMembers.servicePath) {
      this.auth.defaultScopes = staticMembers.scopes;
    }

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    } else if (opts.fallback === 'rest') {
      clientHeader.push(`rest/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    this._protos = this._gaxGrpc.loadProtoJSON(jsonProtos);

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this.pathTemplates = {
      catalogPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/catalogs/{catalog}'
      ),
      productPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/catalogs/{catalog}/branches/{branch}/products/{product}'
      ),
    };

    const protoFilesRoot = this._gaxModule.protobuf.Root.fromJSON(jsonProtos);

    // This API contains "long-running operations", which return a
    // an Operation object that allows for tracking of the operation,
    // rather than holding a request open.

    this.operationsClient = this._gaxModule
      .lro({
        auth: this.auth,
        grpc: 'grpc' in this._gaxGrpc ? this._gaxGrpc.grpc : undefined,
      })
      .operationsClient(opts);
    const importCompletionDataResponse = protoFilesRoot.lookup(
      '.google.cloud.retail.v2alpha.ImportCompletionDataResponse'
    ) as gax.protobuf.Type;
    const importCompletionDataMetadata = protoFilesRoot.lookup(
      '.google.cloud.retail.v2alpha.ImportMetadata'
    ) as gax.protobuf.Type;

    this.descriptors.longrunning = {
      importCompletionData: new this._gaxModule.LongrunningDescriptor(
        this.operationsClient,
        importCompletionDataResponse.decode.bind(importCompletionDataResponse),
        importCompletionDataMetadata.decode.bind(importCompletionDataMetadata)
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.cloud.retail.v2alpha.CompletionService',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};

    // Add a warn function to the client constructor so it can be easily tested.
    this.warn = gax.warn;
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.completionServiceStub) {
      return this.completionServiceStub;
    }

    // Put together the "service stub" for
    // google.cloud.retail.v2alpha.CompletionService.
    this.completionServiceStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.cloud.retail.v2alpha.CompletionService'
          )
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.cloud.retail.v2alpha.CompletionService,
      this._opts,
      this._providedCustomServicePath
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const completionServiceStubMethods = [
      'completeQuery',
      'importCompletionData',
    ];
    for (const methodName of completionServiceStubMethods) {
      const callPromise = this.completionServiceStub.then(
        stub =>
          (...args: Array<{}>) => {
            if (this._terminated) {
              return Promise.reject('The client has already been closed.');
            }
            const func = stub[methodName];
            return func.apply(stub, args);
          },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const descriptor = this.descriptors.longrunning[methodName] || undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.completionServiceStub;
  }

  /**
   * The DNS address for this API service.
   * @returns {string} The DNS address for this service.
   */
  static get servicePath() {
    return 'retail.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   * @returns {string} The DNS address for this service.
   */
  static get apiEndpoint() {
    return 'retail.googleapis.com';
  }

  /**
   * The port for this API service.
   * @returns {number} The default port for this service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   * @returns {string[]} List of default scopes.
   */
  static get scopes() {
    return ['https://www.googleapis.com/auth/cloud-platform'];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @returns {Promise} A promise that resolves to string containing the project ID.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  completeQuery(
    request?: protos.google.cloud.retail.v2alpha.ICompleteQueryRequest,
    options?: CallOptions
  ): Promise<
    [
      protos.google.cloud.retail.v2alpha.ICompleteQueryResponse,
      protos.google.cloud.retail.v2alpha.ICompleteQueryRequest | undefined,
      {} | undefined
    ]
  >;
  completeQuery(
    request: protos.google.cloud.retail.v2alpha.ICompleteQueryRequest,
    options: CallOptions,
    callback: Callback<
      protos.google.cloud.retail.v2alpha.ICompleteQueryResponse,
      | protos.google.cloud.retail.v2alpha.ICompleteQueryRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): void;
  completeQuery(
    request: protos.google.cloud.retail.v2alpha.ICompleteQueryRequest,
    callback: Callback<
      protos.google.cloud.retail.v2alpha.ICompleteQueryResponse,
      | protos.google.cloud.retail.v2alpha.ICompleteQueryRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Completes the specified prefix with keyword suggestions.
   *
   * This feature is only available for users who have Retail Search enabled.
   * Please submit a form [here](https://cloud.google.com/contact) to contact
   * cloud sales if you are interested in using Retail Search.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.catalog
   *   Required. Catalog for which the completion is performed.
   *
   *   Full resource name of catalog, such as
   *   `projects/* /locations/global/catalogs/default_catalog`.
   * @param {string} request.query
   *   Required. The query used to generate suggestions.
   *
   *   The maximum number of allowed characters is 255.
   * @param {string} request.visitorId
   *   A unique identifier for tracking visitors. For example, this could be
   *   implemented with an HTTP cookie, which should be able to uniquely identify
   *   a visitor on a single device. This unique identifier should not change if
   *   the visitor logs in or out of the website.
   *
   *   The field must be a UTF-8 encoded string with a length limit of 128
   *   characters. Otherwise, an INVALID_ARGUMENT error is returned.
   * @param {string[]} request.languageCodes
   *   The list of languages of the query. This is
   *   the BCP-47 language code, such as "en-US" or "sr-Latn".
   *   For more information, see
   *   [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47).
   *
   *   The maximum number of allowed characters is 255.
   *   Only "en-US" is currently supported.
   * @param {string} request.deviceType
   *   The device type context for completion suggestions.
   *   It is useful to apply different suggestions on different device types, e.g.
   *   DESKTOP, MOBILE. If it is empty, the suggestions are across all device
   *   types.
   *
   *   Supported formats:
   *
   *   * UNKNOWN_DEVICE_TYPE
   *
   *   * DESKTOP
   *
   *   * MOBILE
   *
   *   * A customized string starts with OTHER_, e.g. OTHER_IPHONE.
   * @param {string} request.dataset
   *   Determines which dataset to use for fetching completion. "user-data" will
   *   use the imported dataset through
   *   {@link google.cloud.retail.v2alpha.CompletionService.ImportCompletionData|CompletionService.ImportCompletionData}.
   *   "cloud-retail" will use the dataset generated by cloud retail based on user
   *   events. If leave empty, it will use the "user-data".
   *
   *   Current supported values:
   *
   *   * user-data
   *
   *   * cloud-retail
   *     This option requires additional allowlisting. Before using cloud-retail,
   *     contact Cloud Retail support team first.
   * @param {number} request.maxSuggestions
   *   Completion max suggestions. If left unset or set to 0, then will fallback
   *   to the configured value
   *   {@link google.cloud.retail.v2alpha.CompletionConfig.max_suggestions|CompletionConfig.max_suggestions}.
   *
   *   The maximum allowed max suggestions is 20. If it is set higher, it will be
   *   capped by 20.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [CompleteQueryResponse]{@link google.cloud.retail.v2alpha.CompleteQueryResponse}.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
   *   for more details and examples.
   * @example
   * const [response] = await client.completeQuery(request);
   */
  completeQuery(
    request?: protos.google.cloud.retail.v2alpha.ICompleteQueryRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          protos.google.cloud.retail.v2alpha.ICompleteQueryResponse,
          | protos.google.cloud.retail.v2alpha.ICompleteQueryRequest
          | null
          | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.cloud.retail.v2alpha.ICompleteQueryResponse,
      | protos.google.cloud.retail.v2alpha.ICompleteQueryRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.cloud.retail.v2alpha.ICompleteQueryResponse,
      protos.google.cloud.retail.v2alpha.ICompleteQueryRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers['x-goog-request-params'] =
      gax.routingHeader.fromParams({
        catalog: request.catalog || '',
      });
    this.initialize();
    return this.innerApiCalls.completeQuery(request, options, callback);
  }

  importCompletionData(
    request?: protos.google.cloud.retail.v2alpha.IImportCompletionDataRequest,
    options?: CallOptions
  ): Promise<
    [
      LROperation<
        protos.google.cloud.retail.v2alpha.IImportCompletionDataResponse,
        protos.google.cloud.retail.v2alpha.IImportMetadata
      >,
      protos.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  >;
  importCompletionData(
    request: protos.google.cloud.retail.v2alpha.IImportCompletionDataRequest,
    options: CallOptions,
    callback: Callback<
      LROperation<
        protos.google.cloud.retail.v2alpha.IImportCompletionDataResponse,
        protos.google.cloud.retail.v2alpha.IImportMetadata
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): void;
  importCompletionData(
    request: protos.google.cloud.retail.v2alpha.IImportCompletionDataRequest,
    callback: Callback<
      LROperation<
        protos.google.cloud.retail.v2alpha.IImportCompletionDataResponse,
        protos.google.cloud.retail.v2alpha.IImportMetadata
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Bulk import of processed completion dataset.
   *
   * Request processing may be synchronous. Partial updating is not supported.
   *
   * This feature is only available for users who have Retail Search enabled.
   * Please submit a form [here](https://cloud.google.com/contact) to contact
   * cloud sales if you are interested in using Retail Search.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The catalog which the suggestions dataset belongs to.
   *
   *   Format: `projects/1234/locations/global/catalogs/default_catalog`.
   * @param {google.cloud.retail.v2alpha.CompletionDataInputConfig} request.inputConfig
   *   Required. The desired input location of the data.
   * @param {string} request.notificationPubsubTopic
   *   Pub/Sub topic for receiving notification. If this field is set,
   *   when the import is finished, a notification will be sent to
   *   specified Pub/Sub topic. The message data will be JSON string of a
   *   {@link google.longrunning.Operation|Operation}.
   *   Format of the Pub/Sub topic is `projects/{project}/topics/{topic}`.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing
   *   a long running operation. Its `promise()` method returns a promise
   *   you can `await` for.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
   *   for more details and examples.
   * @example
   * const [operation] = await client.importCompletionData(request);
   * const [response] = await operation.promise();
   */
  importCompletionData(
    request?: protos.google.cloud.retail.v2alpha.IImportCompletionDataRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          LROperation<
            protos.google.cloud.retail.v2alpha.IImportCompletionDataResponse,
            protos.google.cloud.retail.v2alpha.IImportMetadata
          >,
          protos.google.longrunning.IOperation | null | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      LROperation<
        protos.google.cloud.retail.v2alpha.IImportCompletionDataResponse,
        protos.google.cloud.retail.v2alpha.IImportMetadata
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      LROperation<
        protos.google.cloud.retail.v2alpha.IImportCompletionDataResponse,
        protos.google.cloud.retail.v2alpha.IImportMetadata
      >,
      protos.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers['x-goog-request-params'] =
      gax.routingHeader.fromParams({
        parent: request.parent || '',
      });
    this.initialize();
    return this.innerApiCalls.importCompletionData(request, options, callback);
  }
  /**
   * Check the status of the long running operation returned by `importCompletionData()`.
   * @param {String} name
   *   The operation name that will be passed.
   * @returns {Promise} - The promise which resolves to an object.
   *   The decoded operation object has result and metadata field to get information from.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
   *   for more details and examples.
   * @example
   * const decodedOperation = await checkImportCompletionDataProgress(name);
   * console.log(decodedOperation.result);
   * console.log(decodedOperation.done);
   * console.log(decodedOperation.metadata);
   */
  async checkImportCompletionDataProgress(
    name: string
  ): Promise<
    LROperation<
      protos.google.cloud.retail.v2alpha.ImportCompletionDataResponse,
      protos.google.cloud.retail.v2alpha.ImportMetadata
    >
  > {
    const request = new operationsProtos.google.longrunning.GetOperationRequest(
      {name}
    );
    const [operation] = await this.operationsClient.getOperation(request);
    const decodeOperation = new gax.Operation(
      operation,
      this.descriptors.longrunning.importCompletionData,
      gax.createDefaultBackoffSettings()
    );
    return decodeOperation as LROperation<
      protos.google.cloud.retail.v2alpha.ImportCompletionDataResponse,
      protos.google.cloud.retail.v2alpha.ImportMetadata
    >;
  }
  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified catalog resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} catalog
   * @returns {string} Resource name string.
   */
  catalogPath(project: string, location: string, catalog: string) {
    return this.pathTemplates.catalogPathTemplate.render({
      project: project,
      location: location,
      catalog: catalog,
    });
  }

  /**
   * Parse the project from Catalog resource.
   *
   * @param {string} catalogName
   *   A fully-qualified path representing Catalog resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromCatalogName(catalogName: string) {
    return this.pathTemplates.catalogPathTemplate.match(catalogName).project;
  }

  /**
   * Parse the location from Catalog resource.
   *
   * @param {string} catalogName
   *   A fully-qualified path representing Catalog resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromCatalogName(catalogName: string) {
    return this.pathTemplates.catalogPathTemplate.match(catalogName).location;
  }

  /**
   * Parse the catalog from Catalog resource.
   *
   * @param {string} catalogName
   *   A fully-qualified path representing Catalog resource.
   * @returns {string} A string representing the catalog.
   */
  matchCatalogFromCatalogName(catalogName: string) {
    return this.pathTemplates.catalogPathTemplate.match(catalogName).catalog;
  }

  /**
   * Return a fully-qualified product resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} catalog
   * @param {string} branch
   * @param {string} product
   * @returns {string} Resource name string.
   */
  productPath(
    project: string,
    location: string,
    catalog: string,
    branch: string,
    product: string
  ) {
    return this.pathTemplates.productPathTemplate.render({
      project: project,
      location: location,
      catalog: catalog,
      branch: branch,
      product: product,
    });
  }

  /**
   * Parse the project from Product resource.
   *
   * @param {string} productName
   *   A fully-qualified path representing Product resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProductName(productName: string) {
    return this.pathTemplates.productPathTemplate.match(productName).project;
  }

  /**
   * Parse the location from Product resource.
   *
   * @param {string} productName
   *   A fully-qualified path representing Product resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromProductName(productName: string) {
    return this.pathTemplates.productPathTemplate.match(productName).location;
  }

  /**
   * Parse the catalog from Product resource.
   *
   * @param {string} productName
   *   A fully-qualified path representing Product resource.
   * @returns {string} A string representing the catalog.
   */
  matchCatalogFromProductName(productName: string) {
    return this.pathTemplates.productPathTemplate.match(productName).catalog;
  }

  /**
   * Parse the branch from Product resource.
   *
   * @param {string} productName
   *   A fully-qualified path representing Product resource.
   * @returns {string} A string representing the branch.
   */
  matchBranchFromProductName(productName: string) {
    return this.pathTemplates.productPathTemplate.match(productName).branch;
  }

  /**
   * Parse the product from Product resource.
   *
   * @param {string} productName
   *   A fully-qualified path representing Product resource.
   * @returns {string} A string representing the product.
   */
  matchProductFromProductName(productName: string) {
    return this.pathTemplates.productPathTemplate.match(productName).product;
  }

  /**
   * Terminate the gRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   * @returns {Promise} A promise that resolves when the client is closed.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.completionServiceStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
