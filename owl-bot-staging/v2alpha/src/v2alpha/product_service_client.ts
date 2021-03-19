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
import {Callback, CallOptions, Descriptors, ClientOptions, LROperation} from 'google-gax';
import * as path from 'path';

import * as protos from '../../protos/protos';
/**
 * Client JSON configuration object, loaded from
 * `src/v2alpha/product_service_client_config.json`.
 * This file defines retry strategy and timeouts for all API methods in this library.
 */
import * as gapicConfig from './product_service_client_config.json';
import { operationsProtos } from 'google-gax';
const version = require('../../../package.json').version;

/**
 *  Service for ingesting {@link google.cloud.retail.v2alpha.Product|Product}
 *  information of the customer's website.
 * @class
 * @memberof v2alpha
 */
export class ProductServiceClient {
  private _terminated = false;
  private _opts: ClientOptions;
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
  innerApiCalls: {[name: string]: Function};
  pathTemplates: {[name: string]: gax.PathTemplate};
  operationsClient: gax.OperationsClient;
  productServiceStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of ProductServiceClient.
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
    const staticMembers = this.constructor as typeof ProductServiceClient;
    const servicePath = opts?.servicePath || opts?.apiEndpoint || staticMembers.servicePath;
    const port = opts?.port || staticMembers.port;
    const clientConfig = opts?.clientConfig ?? {};
    const fallback = opts?.fallback ?? (typeof window !== 'undefined' && typeof window?.fetch === 'function');
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
    this.auth = (this._gaxGrpc.auth as gax.GoogleAuth);

    // Set the default scopes in auth client if needed.
    if (servicePath === staticMembers.servicePath) {
      this.auth.defaultScopes = staticMembers.scopes;
    }

    // Determine the client header string.
    const clientHeader = [
      `gax/${this._gaxModule.version}`,
      `gapic/${version}`,
    ];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(__dirname, '..', '..', 'protos', 'protos.json');
    this._protos = this._gaxGrpc.loadProto(
      opts.fallback ?
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("../../protos/protos.json") :
        nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this.pathTemplates = {
      branchPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/catalogs/{catalog}/branches/{branch}'
      ),
      catalogPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/catalogs/{catalog}'
      ),
      productPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/catalogs/{catalog}/branches/{branch}/products/{product}'
      ),
    };

    // This API contains "long-running operations", which return a
    // an Operation object that allows for tracking of the operation,
    // rather than holding a request open.
    const protoFilesRoot = opts.fallback ?
      this._gaxModule.protobuf.Root.fromJSON(
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("../../protos/protos.json")) :
      this._gaxModule.protobuf.loadSync(nodejsProtoPath);

    this.operationsClient = this._gaxModule.lro({
      auth: this.auth,
      grpc: 'grpc' in this._gaxGrpc ? this._gaxGrpc.grpc : undefined
    }).operationsClient(opts);
    const importProductsResponse = protoFilesRoot.lookup(
      '.google.cloud.retail.v2alpha.ImportProductsResponse') as gax.protobuf.Type;
    const importProductsMetadata = protoFilesRoot.lookup(
      '.google.cloud.retail.v2alpha.ImportMetadata') as gax.protobuf.Type;

    this.descriptors.longrunning = {
      importProducts: new this._gaxModule.LongrunningDescriptor(
        this.operationsClient,
        importProductsResponse.decode.bind(importProductsResponse),
        importProductsMetadata.decode.bind(importProductsMetadata))
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
        'google.cloud.retail.v2alpha.ProductService', gapicConfig as gax.ClientConfig,
        opts.clientConfig || {}, {'x-goog-api-client': clientHeader.join(' ')});

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};
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
    if (this.productServiceStub) {
      return this.productServiceStub;
    }

    // Put together the "service stub" for
    // google.cloud.retail.v2alpha.ProductService.
    this.productServiceStub = this._gaxGrpc.createStub(
        this._opts.fallback ?
          (this._protos as protobuf.Root).lookupService('google.cloud.retail.v2alpha.ProductService') :
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.cloud.retail.v2alpha.ProductService,
        this._opts) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const productServiceStubMethods =
        ['createProduct', 'getProduct', 'updateProduct', 'deleteProduct', 'importProducts'];
    for (const methodName of productServiceStubMethods) {
      const callPromise = this.productServiceStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error|null|undefined) => () => {
          throw err;
        });

      const descriptor =
        this.descriptors.longrunning[methodName] ||
        undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.productServiceStub;
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
    return [
      'https://www.googleapis.com/auth/cloud-platform'
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @returns {Promise} A promise that resolves to string containing the project ID.
   */
  getProjectId(callback?: Callback<string, undefined, undefined>):
      Promise<string>|void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  createProduct(
      request: protos.google.cloud.retail.v2alpha.ICreateProductRequest,
      options?: CallOptions):
      Promise<[
        protos.google.cloud.retail.v2alpha.IProduct,
        protos.google.cloud.retail.v2alpha.ICreateProductRequest|undefined, {}|undefined
      ]>;
  createProduct(
      request: protos.google.cloud.retail.v2alpha.ICreateProductRequest,
      options: CallOptions,
      callback: Callback<
          protos.google.cloud.retail.v2alpha.IProduct,
          protos.google.cloud.retail.v2alpha.ICreateProductRequest|null|undefined,
          {}|null|undefined>): void;
  createProduct(
      request: protos.google.cloud.retail.v2alpha.ICreateProductRequest,
      callback: Callback<
          protos.google.cloud.retail.v2alpha.IProduct,
          protos.google.cloud.retail.v2alpha.ICreateProductRequest|null|undefined,
          {}|null|undefined>): void;
/**
 * Creates a {@link google.cloud.retail.v2alpha.Product|Product}.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.parent
 *   Required. The parent catalog resource name, such as
 *   "projects/* /locations/global/catalogs/default_catalog/branches/default_branch".
 * @param {google.cloud.retail.v2alpha.Product} request.product
 *   Required. The {@link google.cloud.retail.v2alpha.Product|Product} to create.
 * @param {string} request.productId
 *   Required. The ID to use for the
 *   {@link google.cloud.retail.v2alpha.Product|Product}, which will become the final
 *   component of the {@link google.cloud.retail.v2alpha.Product.name|Product.name}.
 *
 *   If the caller does not have permission to create the
 *   {@link google.cloud.retail.v2alpha.Product|Product}, regardless of whether or
 *   not it exists, a PERMISSION_DENIED error is returned.
 *
 *   This field must be unique among all
 *   {@link google.cloud.retail.v2alpha.Product|Product}s with the same
 *   {@link google.cloud.retail.v2alpha.CreateProductRequest.parent|parent}.
 *   Otherwise, an ALREADY_EXISTS error is returned.
 *
 *   This field must be a UTF-8 encoded string with a length limit of 128
 *   characters. Otherwise, an INVALID_ARGUMENT error is returned.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Product]{@link google.cloud.retail.v2alpha.Product}.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
 *   for more details and examples.
 * @example
 * const [response] = await client.createProduct(request);
 */
  createProduct(
      request: protos.google.cloud.retail.v2alpha.ICreateProductRequest,
      optionsOrCallback?: CallOptions|Callback<
          protos.google.cloud.retail.v2alpha.IProduct,
          protos.google.cloud.retail.v2alpha.ICreateProductRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.cloud.retail.v2alpha.IProduct,
          protos.google.cloud.retail.v2alpha.ICreateProductRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.cloud.retail.v2alpha.IProduct,
        protos.google.cloud.retail.v2alpha.ICreateProductRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    this.initialize();
    return this.innerApiCalls.createProduct(request, options, callback);
  }
  getProduct(
      request: protos.google.cloud.retail.v2alpha.IGetProductRequest,
      options?: CallOptions):
      Promise<[
        protos.google.cloud.retail.v2alpha.IProduct,
        protos.google.cloud.retail.v2alpha.IGetProductRequest|undefined, {}|undefined
      ]>;
  getProduct(
      request: protos.google.cloud.retail.v2alpha.IGetProductRequest,
      options: CallOptions,
      callback: Callback<
          protos.google.cloud.retail.v2alpha.IProduct,
          protos.google.cloud.retail.v2alpha.IGetProductRequest|null|undefined,
          {}|null|undefined>): void;
  getProduct(
      request: protos.google.cloud.retail.v2alpha.IGetProductRequest,
      callback: Callback<
          protos.google.cloud.retail.v2alpha.IProduct,
          protos.google.cloud.retail.v2alpha.IGetProductRequest|null|undefined,
          {}|null|undefined>): void;
/**
 * Gets a {@link google.cloud.retail.v2alpha.Product|Product}.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.name
 *   Required. Full resource name of
 *   {@link google.cloud.retail.v2alpha.Product|Product}, such as
 *   "projects/* /locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id".
 *
 *   If the caller does not have permission to access the
 *   {@link google.cloud.retail.v2alpha.Product|Product}, regardless of whether or
 *   not it exists, a PERMISSION_DENIED error is returned.
 *
 *   If the requested {@link google.cloud.retail.v2alpha.Product|Product} does not
 *   exist, a NOT_FOUND error is returned.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Product]{@link google.cloud.retail.v2alpha.Product}.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
 *   for more details and examples.
 * @example
 * const [response] = await client.getProduct(request);
 */
  getProduct(
      request: protos.google.cloud.retail.v2alpha.IGetProductRequest,
      optionsOrCallback?: CallOptions|Callback<
          protos.google.cloud.retail.v2alpha.IProduct,
          protos.google.cloud.retail.v2alpha.IGetProductRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.cloud.retail.v2alpha.IProduct,
          protos.google.cloud.retail.v2alpha.IGetProductRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.cloud.retail.v2alpha.IProduct,
        protos.google.cloud.retail.v2alpha.IGetProductRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'name': request.name || '',
    });
    this.initialize();
    return this.innerApiCalls.getProduct(request, options, callback);
  }
  updateProduct(
      request: protos.google.cloud.retail.v2alpha.IUpdateProductRequest,
      options?: CallOptions):
      Promise<[
        protos.google.cloud.retail.v2alpha.IProduct,
        protos.google.cloud.retail.v2alpha.IUpdateProductRequest|undefined, {}|undefined
      ]>;
  updateProduct(
      request: protos.google.cloud.retail.v2alpha.IUpdateProductRequest,
      options: CallOptions,
      callback: Callback<
          protos.google.cloud.retail.v2alpha.IProduct,
          protos.google.cloud.retail.v2alpha.IUpdateProductRequest|null|undefined,
          {}|null|undefined>): void;
  updateProduct(
      request: protos.google.cloud.retail.v2alpha.IUpdateProductRequest,
      callback: Callback<
          protos.google.cloud.retail.v2alpha.IProduct,
          protos.google.cloud.retail.v2alpha.IUpdateProductRequest|null|undefined,
          {}|null|undefined>): void;
/**
 * Updates a {@link google.cloud.retail.v2alpha.Product|Product}.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {google.cloud.retail.v2alpha.Product} request.product
 *   Required. The product to update/create.
 *
 *   If the caller does not have permission to update the
 *   {@link google.cloud.retail.v2alpha.Product|Product}, regardless of whether or
 *   not it exists, a PERMISSION_DENIED error is returned.
 *
 *   If the {@link google.cloud.retail.v2alpha.Product|Product} to update does not
 *   exist, a NOT_FOUND error is returned.
 * @param {google.protobuf.FieldMask} request.updateMask
 *   Indicates which fields in the provided
 *   {@link google.cloud.retail.v2alpha.Product|Product} to update. The immutable and
 *   output only fields are NOT supported. If not set, all supported fields (the
 *   fields that are neither immutable nor output only) are updated.
 *
 *   If an unsupported or unknown field is provided, an INVALID_ARGUMENT error
 *   is returned.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Product]{@link google.cloud.retail.v2alpha.Product}.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
 *   for more details and examples.
 * @example
 * const [response] = await client.updateProduct(request);
 */
  updateProduct(
      request: protos.google.cloud.retail.v2alpha.IUpdateProductRequest,
      optionsOrCallback?: CallOptions|Callback<
          protos.google.cloud.retail.v2alpha.IProduct,
          protos.google.cloud.retail.v2alpha.IUpdateProductRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.cloud.retail.v2alpha.IProduct,
          protos.google.cloud.retail.v2alpha.IUpdateProductRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.cloud.retail.v2alpha.IProduct,
        protos.google.cloud.retail.v2alpha.IUpdateProductRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'product.name': request.product!.name || '',
    });
    this.initialize();
    return this.innerApiCalls.updateProduct(request, options, callback);
  }
  deleteProduct(
      request: protos.google.cloud.retail.v2alpha.IDeleteProductRequest,
      options?: CallOptions):
      Promise<[
        protos.google.protobuf.IEmpty,
        protos.google.cloud.retail.v2alpha.IDeleteProductRequest|undefined, {}|undefined
      ]>;
  deleteProduct(
      request: protos.google.cloud.retail.v2alpha.IDeleteProductRequest,
      options: CallOptions,
      callback: Callback<
          protos.google.protobuf.IEmpty,
          protos.google.cloud.retail.v2alpha.IDeleteProductRequest|null|undefined,
          {}|null|undefined>): void;
  deleteProduct(
      request: protos.google.cloud.retail.v2alpha.IDeleteProductRequest,
      callback: Callback<
          protos.google.protobuf.IEmpty,
          protos.google.cloud.retail.v2alpha.IDeleteProductRequest|null|undefined,
          {}|null|undefined>): void;
/**
 * Deletes a {@link google.cloud.retail.v2alpha.Product|Product}.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.name
 *   Required. Full resource name of
 *   {@link google.cloud.retail.v2alpha.Product|Product}, such as
 *   "projects/* /locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id".
 *
 *   If the caller does not have permission to delete the
 *   {@link google.cloud.retail.v2alpha.Product|Product}, regardless of whether or
 *   not it exists, a PERMISSION_DENIED error is returned.
 *
 *   If the {@link google.cloud.retail.v2alpha.Product|Product} to delete does not
 *   exist, a NOT_FOUND error is returned.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Empty]{@link google.protobuf.Empty}.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
 *   for more details and examples.
 * @example
 * const [response] = await client.deleteProduct(request);
 */
  deleteProduct(
      request: protos.google.cloud.retail.v2alpha.IDeleteProductRequest,
      optionsOrCallback?: CallOptions|Callback<
          protos.google.protobuf.IEmpty,
          protos.google.cloud.retail.v2alpha.IDeleteProductRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.protobuf.IEmpty,
          protos.google.cloud.retail.v2alpha.IDeleteProductRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.protobuf.IEmpty,
        protos.google.cloud.retail.v2alpha.IDeleteProductRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'name': request.name || '',
    });
    this.initialize();
    return this.innerApiCalls.deleteProduct(request, options, callback);
  }

  importProducts(
      request: protos.google.cloud.retail.v2alpha.IImportProductsRequest,
      options?: CallOptions):
      Promise<[
        LROperation<protos.google.cloud.retail.v2alpha.IImportProductsResponse, protos.google.cloud.retail.v2alpha.IImportMetadata>,
        protos.google.longrunning.IOperation|undefined, {}|undefined
      ]>;
  importProducts(
      request: protos.google.cloud.retail.v2alpha.IImportProductsRequest,
      options: CallOptions,
      callback: Callback<
          LROperation<protos.google.cloud.retail.v2alpha.IImportProductsResponse, protos.google.cloud.retail.v2alpha.IImportMetadata>,
          protos.google.longrunning.IOperation|null|undefined,
          {}|null|undefined>): void;
  importProducts(
      request: protos.google.cloud.retail.v2alpha.IImportProductsRequest,
      callback: Callback<
          LROperation<protos.google.cloud.retail.v2alpha.IImportProductsResponse, protos.google.cloud.retail.v2alpha.IImportMetadata>,
          protos.google.longrunning.IOperation|null|undefined,
          {}|null|undefined>): void;
/**
 * Bulk import of multiple {@link google.cloud.retail.v2alpha.Product|Product}s.
 *
 * Request processing may be synchronous. No partial updating is supported.
 * Non-existing items are created.
 *
 * Note that it is possible for a subset of the
 * {@link google.cloud.retail.v2alpha.Product|Product}s to be successfully updated.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.parent
 *   Required.
 *   "projects/1234/locations/global/catalogs/default_catalog/branches/default_branch"
 *
 *   If no updateMask is specified, requires products.create permission.
 *   If updateMask is specified, requires products.update permission.
 * @param {google.cloud.retail.v2alpha.ProductInputConfig} request.inputConfig
 *   Required. The desired input location of the data.
 * @param {google.cloud.retail.v2alpha.ImportErrorsConfig} request.errorsConfig
 *   The desired location of errors incurred during the Import.
 * @param {google.protobuf.FieldMask} request.updateMask
 *   Indicates which fields in the provided imported 'products' to update. If
 *   not set, will by default update all fields.
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
 * const [operation] = await client.importProducts(request);
 * const [response] = await operation.promise();
 */
  importProducts(
      request: protos.google.cloud.retail.v2alpha.IImportProductsRequest,
      optionsOrCallback?: CallOptions|Callback<
          LROperation<protos.google.cloud.retail.v2alpha.IImportProductsResponse, protos.google.cloud.retail.v2alpha.IImportMetadata>,
          protos.google.longrunning.IOperation|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          LROperation<protos.google.cloud.retail.v2alpha.IImportProductsResponse, protos.google.cloud.retail.v2alpha.IImportMetadata>,
          protos.google.longrunning.IOperation|null|undefined,
          {}|null|undefined>):
      Promise<[
        LROperation<protos.google.cloud.retail.v2alpha.IImportProductsResponse, protos.google.cloud.retail.v2alpha.IImportMetadata>,
        protos.google.longrunning.IOperation|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    this.initialize();
    return this.innerApiCalls.importProducts(request, options, callback);
  }
/**
 * Check the status of the long running operation returned by `importProducts()`.
 * @param {String} name
 *   The operation name that will be passed.
 * @returns {Promise} - The promise which resolves to an object.
 *   The decoded operation object has result and metadata field to get information from.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
 *   for more details and examples.
 * @example
 * const decodedOperation = await checkImportProductsProgress(name);
 * console.log(decodedOperation.result);
 * console.log(decodedOperation.done);
 * console.log(decodedOperation.metadata);
 */
  async checkImportProductsProgress(name: string): Promise<LROperation<protos.google.cloud.retail.v2alpha.ImportProductsResponse, protos.google.cloud.retail.v2alpha.ImportMetadata>>{
    const request = new operationsProtos.google.longrunning.GetOperationRequest({name});
    const [operation] = await this.operationsClient.getOperation(request);
    const decodeOperation = new gax.Operation(operation, this.descriptors.longrunning.importProducts, gax.createDefaultBackoffSettings());
    return decodeOperation as LROperation<protos.google.cloud.retail.v2alpha.ImportProductsResponse, protos.google.cloud.retail.v2alpha.ImportMetadata>;
  }
  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified branch resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} catalog
   * @param {string} branch
   * @returns {string} Resource name string.
   */
  branchPath(project:string,location:string,catalog:string,branch:string) {
    return this.pathTemplates.branchPathTemplate.render({
      project: project,
      location: location,
      catalog: catalog,
      branch: branch,
    });
  }

  /**
   * Parse the project from Branch resource.
   *
   * @param {string} branchName
   *   A fully-qualified path representing Branch resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromBranchName(branchName: string) {
    return this.pathTemplates.branchPathTemplate.match(branchName).project;
  }

  /**
   * Parse the location from Branch resource.
   *
   * @param {string} branchName
   *   A fully-qualified path representing Branch resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromBranchName(branchName: string) {
    return this.pathTemplates.branchPathTemplate.match(branchName).location;
  }

  /**
   * Parse the catalog from Branch resource.
   *
   * @param {string} branchName
   *   A fully-qualified path representing Branch resource.
   * @returns {string} A string representing the catalog.
   */
  matchCatalogFromBranchName(branchName: string) {
    return this.pathTemplates.branchPathTemplate.match(branchName).catalog;
  }

  /**
   * Parse the branch from Branch resource.
   *
   * @param {string} branchName
   *   A fully-qualified path representing Branch resource.
   * @returns {string} A string representing the branch.
   */
  matchBranchFromBranchName(branchName: string) {
    return this.pathTemplates.branchPathTemplate.match(branchName).branch;
  }

  /**
   * Return a fully-qualified catalog resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} catalog
   * @returns {string} Resource name string.
   */
  catalogPath(project:string,location:string,catalog:string) {
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
  productPath(project:string,location:string,catalog:string,branch:string,product:string) {
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
      return this.productServiceStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
