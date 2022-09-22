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

/* global window */
import type * as gax from 'google-gax';
import type {
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
} from 'google-gax';

import * as protos from '../../protos/protos';
import jsonProtos = require('../../protos/protos.json');
/**
 * Client JSON configuration object, loaded from
 * `src/v2/prediction_service_client_config.json`.
 * This file defines retry strategy and timeouts for all API methods in this library.
 */
import * as gapicConfig from './prediction_service_client_config.json';
const version = require('../../../package.json').version;

/**
 *  Service for making recommendation prediction.
 * @class
 * @memberof v2
 */
export class PredictionServiceClient {
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
  predictionServiceStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of PredictionServiceClient.
   *
   * @param {object} [options] - The configuration object.
   * The options accepted by the constructor are described in detail
   * in [this document](https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#creating-the-client-instance).
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
   * @param {boolean | "rest"} [options.fallback] - Use HTTP fallback mode.
   *     Pass "rest" to use HTTP/1.1 REST API instead of gRPC.
   *     For more information, please check the
   *     {@link https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#http11-rest-api-mode documentation}.
   * @param {gax} [gaxInstance]: loaded instance of `google-gax`. Useful if you
   *     need to avoid loading the default gRPC version and want to use the fallback
   *     HTTP implementation. Load only fallback version and pass it to the constructor:
   *     ```
   *     const gax = require('google-gax/build/src/fallback'); // avoids loading google-gax with gRPC
   *     const client = new PredictionServiceClient({fallback: 'rest'}, gax);
   *     ```
   */
  constructor(
    opts?: ClientOptions,
    gaxInstance?: typeof gax | typeof gax.fallback
  ) {
    // Ensure that options include all the required fields.
    const staticMembers = this.constructor as typeof PredictionServiceClient;
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

    // Load google-gax module synchronously if needed
    if (!gaxInstance) {
      gaxInstance = require('google-gax') as typeof gax;
    }

    // Choose either gRPC or proto-over-HTTP implementation of google-gax.
    this._gaxModule = opts.fallback ? gaxInstance.fallback : gaxInstance;

    // Create a `gaxGrpc` object, with any grpc-specific options sent to the client.
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Set useJWTAccessWithScope on the auth object.
    this.auth.useJWTAccessWithScope = true;

    // Set defaultServicePath on the auth object.
    this.auth.defaultServicePath = staticMembers.servicePath;

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
      attributesConfigPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/catalogs/{catalog}/attributesConfig'
      ),
      catalogPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/catalogs/{catalog}'
      ),
      completionConfigPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/catalogs/{catalog}/completionConfig'
      ),
      controlPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/catalogs/{catalog}/controls/{control}'
      ),
      productPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/catalogs/{catalog}/branches/{branch}/products/{product}'
      ),
      servingConfigPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/catalogs/{catalog}/servingConfigs/{serving_config}'
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.cloud.retail.v2.PredictionService',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};

    // Add a warn function to the client constructor so it can be easily tested.
    this.warn = this._gaxModule.warn;
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
    if (this.predictionServiceStub) {
      return this.predictionServiceStub;
    }

    // Put together the "service stub" for
    // google.cloud.retail.v2.PredictionService.
    this.predictionServiceStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.cloud.retail.v2.PredictionService'
          )
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.cloud.retail.v2.PredictionService,
      this._opts,
      this._providedCustomServicePath
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const predictionServiceStubMethods = ['predict'];
    for (const methodName of predictionServiceStubMethods) {
      const callPromise = this.predictionServiceStub.then(
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

      const descriptor = undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor,
        this._opts.fallback
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.predictionServiceStub;
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
  /**
   * Makes a recommendation prediction.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.placement
   *   Required. Full resource name of the format:
   *   `{placement=projects/* /locations/global/catalogs/default_catalog/servingConfigs/*}`
   *   or
   *   `{placement=projects/* /locations/global/catalogs/default_catalog/placements/*}`.
   *   We recommend using the `servingConfigs` resource. `placements` is a legacy
   *   resource.
   *   The ID of the Recommendations AI serving config or placement.
   *   Before you can request predictions from your model, you must create at
   *   least one serving config or placement for it. For more information, see
   *   [Managing serving configurations]
   *   (https://cloud.google.com/retail/docs/manage-configs).
   *
   *   The full list of available serving configs can be seen at
   *   https://console.cloud.google.com/ai/retail/catalogs/default_catalog/configs
   * @param {google.cloud.retail.v2.UserEvent} request.userEvent
   *   Required. Context about the user, what they are looking at and what action
   *   they took to trigger the predict request. Note that this user event detail
   *   won't be ingested to userEvent logs. Thus, a separate userEvent write
   *   request is required for event logging.
   *
   *   Don't set
   *   {@link google.cloud.retail.v2.UserEvent.visitor_id|UserEvent.visitor_id} or
   *   {@link google.cloud.retail.v2.UserInfo.user_id|UserInfo.user_id} to the same
   *   fixed ID for different users. If you are trying to receive non-personalized
   *   recommendations (not recommended; this can negatively impact model
   *   performance), instead set
   *   {@link google.cloud.retail.v2.UserEvent.visitor_id|UserEvent.visitor_id} to a
   *   random unique ID and leave
   *   {@link google.cloud.retail.v2.UserInfo.user_id|UserInfo.user_id} unset.
   * @param {number} request.pageSize
   *   Maximum number of results to return. Set this property to the number of
   *   prediction results needed. If zero, the service will choose a reasonable
   *   default. The maximum allowed value is 100. Values above 100 will be coerced
   *   to 100.
   * @param {string} request.pageToken
   *   This field is not used; leave it unset.
   * @param {string} request.filter
   *   Filter for restricting prediction results with a length limit of 5,000
   *   characters. Accepts values for tags and the `filterOutOfStockItems` flag.
   *
   *    * Tag expressions. Restricts predictions to products that match all of the
   *      specified tags. Boolean operators `OR` and `NOT` are supported if the
   *      expression is enclosed in parentheses, and must be separated from the
   *      tag values by a space. `-"tagA"` is also supported and is equivalent to
   *      `NOT "tagA"`. Tag values must be double quoted UTF-8 encoded strings
   *      with a size limit of 1,000 characters.
   *
   *      Note: "Recently viewed" models don't support tag filtering at the
   *      moment.
   *
   *    * filterOutOfStockItems. Restricts predictions to products that do not
   *    have a
   *      stockState value of OUT_OF_STOCK.
   *
   *   Examples:
   *
   *    * tag=("Red" OR "Blue") tag="New-Arrival" tag=(NOT "promotional")
   *    * filterOutOfStockItems  tag=(-"promotional")
   *    * filterOutOfStockItems
   *
   *   If your filter blocks all prediction results, the API will return generic
   *   (unfiltered) popular products. If you only want results strictly matching
   *   the filters, set `strictFiltering` to True in `PredictRequest.params` to
   *   receive empty results instead.
   *   Note that the API will never return items with storageStatus of "EXPIRED"
   *   or "DELETED" regardless of filter choices.
   *
   *   If `filterSyntaxV2` is set to true under the `params` field, then
   *   attribute-based expressions are expected instead of the above described
   *   tag-based syntax. Examples:
   *
   *    * (colors: ANY("Red", "Blue")) AND NOT (categories: ANY("Phones"))
   *    * (availability: ANY("IN_STOCK")) AND
   *      (colors: ANY("Red") OR categories: ANY("Phones"))
   * @param {boolean} request.validateOnly
   *   Use validate only mode for this prediction query. If set to true, a
   *   dummy model will be used that returns arbitrary products.
   *   Note that the validate only mode should only be used for testing the API,
   *   or if the model is not ready.
   * @param {number[]} request.params
   *   Additional domain specific parameters for the predictions.
   *
   *   Allowed values:
   *
   *   * `returnProduct`: Boolean. If set to true, the associated product
   *      object will be returned in the `results.metadata` field in the
   *      prediction response.
   *   * `returnScore`: Boolean. If set to true, the prediction 'score'
   *      corresponding to each returned product will be set in the
   *      `results.metadata` field in the prediction response. The given
   *      'score' indicates the probability of an product being clicked/purchased
   *      given the user's context and history.
   *   * `strictFiltering`: Boolean. True by default. If set to false, the service
   *      will return generic (unfiltered) popular products instead of empty if
   *      your filter blocks all prediction results.
   *   * `priceRerankLevel`: String. Default empty. If set to be non-empty, then
   *      it needs to be one of {'no-price-reranking', 'low-price-reranking',
   *      'medium-price-reranking', 'high-price-reranking'}. This gives
   *      request-level control and adjusts prediction results based on product
   *      price.
   *   * `diversityLevel`: String. Default empty. If set to be non-empty, then
   *      it needs to be one of {'no-diversity', 'low-diversity',
   *      'medium-diversity', 'high-diversity', 'auto-diversity'}. This gives
   *      request-level control and adjusts prediction results based on product
   *      category.
   *   * `filterSyntaxV2`: Boolean. False by default. If set to true, the `filter`
   *     field is interpreteted according to the new, attribute-based syntax.
   * @param {number[]} request.labels
   *   The labels applied to a resource must meet the following requirements:
   *
   *   * Each resource can have multiple labels, up to a maximum of 64.
   *   * Each label must be a key-value pair.
   *   * Keys have a minimum length of 1 character and a maximum length of 63
   *     characters and cannot be empty. Values can be empty and have a maximum
   *     length of 63 characters.
   *   * Keys and values can contain only lowercase letters, numeric characters,
   *     underscores, and dashes. All characters must use UTF-8 encoding, and
   *     international characters are allowed.
   *   * The key portion of a label must be unique. However, you can use the same
   *     key with multiple resources.
   *   * Keys must start with a lowercase letter or international character.
   *
   *   See [Google Cloud
   *   Document](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements)
   *   for more details.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [PredictResponse]{@link google.cloud.retail.v2.PredictResponse}.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
   *   for more details and examples.
   * @example <caption>include:samples/generated/v2/prediction_service.predict.js</caption>
   * region_tag:retail_v2_generated_PredictionService_Predict_async
   */
  predict(
    request?: protos.google.cloud.retail.v2.IPredictRequest,
    options?: CallOptions
  ): Promise<
    [
      protos.google.cloud.retail.v2.IPredictResponse,
      protos.google.cloud.retail.v2.IPredictRequest | undefined,
      {} | undefined
    ]
  >;
  predict(
    request: protos.google.cloud.retail.v2.IPredictRequest,
    options: CallOptions,
    callback: Callback<
      protos.google.cloud.retail.v2.IPredictResponse,
      protos.google.cloud.retail.v2.IPredictRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  predict(
    request: protos.google.cloud.retail.v2.IPredictRequest,
    callback: Callback<
      protos.google.cloud.retail.v2.IPredictResponse,
      protos.google.cloud.retail.v2.IPredictRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  predict(
    request?: protos.google.cloud.retail.v2.IPredictRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          protos.google.cloud.retail.v2.IPredictResponse,
          protos.google.cloud.retail.v2.IPredictRequest | null | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.cloud.retail.v2.IPredictResponse,
      protos.google.cloud.retail.v2.IPredictRequest | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.cloud.retail.v2.IPredictResponse,
      protos.google.cloud.retail.v2.IPredictRequest | undefined,
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
      this._gaxModule.routingHeader.fromParams({
        placement: request.placement ?? '',
      });
    this.initialize();
    return this.innerApiCalls.predict(request, options, callback);
  }

  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified attributesConfig resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} catalog
   * @returns {string} Resource name string.
   */
  attributesConfigPath(project: string, location: string, catalog: string) {
    return this.pathTemplates.attributesConfigPathTemplate.render({
      project: project,
      location: location,
      catalog: catalog,
    });
  }

  /**
   * Parse the project from AttributesConfig resource.
   *
   * @param {string} attributesConfigName
   *   A fully-qualified path representing AttributesConfig resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromAttributesConfigName(attributesConfigName: string) {
    return this.pathTemplates.attributesConfigPathTemplate.match(
      attributesConfigName
    ).project;
  }

  /**
   * Parse the location from AttributesConfig resource.
   *
   * @param {string} attributesConfigName
   *   A fully-qualified path representing AttributesConfig resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromAttributesConfigName(attributesConfigName: string) {
    return this.pathTemplates.attributesConfigPathTemplate.match(
      attributesConfigName
    ).location;
  }

  /**
   * Parse the catalog from AttributesConfig resource.
   *
   * @param {string} attributesConfigName
   *   A fully-qualified path representing AttributesConfig resource.
   * @returns {string} A string representing the catalog.
   */
  matchCatalogFromAttributesConfigName(attributesConfigName: string) {
    return this.pathTemplates.attributesConfigPathTemplate.match(
      attributesConfigName
    ).catalog;
  }

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
   * Return a fully-qualified completionConfig resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} catalog
   * @returns {string} Resource name string.
   */
  completionConfigPath(project: string, location: string, catalog: string) {
    return this.pathTemplates.completionConfigPathTemplate.render({
      project: project,
      location: location,
      catalog: catalog,
    });
  }

  /**
   * Parse the project from CompletionConfig resource.
   *
   * @param {string} completionConfigName
   *   A fully-qualified path representing CompletionConfig resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromCompletionConfigName(completionConfigName: string) {
    return this.pathTemplates.completionConfigPathTemplate.match(
      completionConfigName
    ).project;
  }

  /**
   * Parse the location from CompletionConfig resource.
   *
   * @param {string} completionConfigName
   *   A fully-qualified path representing CompletionConfig resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromCompletionConfigName(completionConfigName: string) {
    return this.pathTemplates.completionConfigPathTemplate.match(
      completionConfigName
    ).location;
  }

  /**
   * Parse the catalog from CompletionConfig resource.
   *
   * @param {string} completionConfigName
   *   A fully-qualified path representing CompletionConfig resource.
   * @returns {string} A string representing the catalog.
   */
  matchCatalogFromCompletionConfigName(completionConfigName: string) {
    return this.pathTemplates.completionConfigPathTemplate.match(
      completionConfigName
    ).catalog;
  }

  /**
   * Return a fully-qualified control resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} catalog
   * @param {string} control
   * @returns {string} Resource name string.
   */
  controlPath(
    project: string,
    location: string,
    catalog: string,
    control: string
  ) {
    return this.pathTemplates.controlPathTemplate.render({
      project: project,
      location: location,
      catalog: catalog,
      control: control,
    });
  }

  /**
   * Parse the project from Control resource.
   *
   * @param {string} controlName
   *   A fully-qualified path representing Control resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromControlName(controlName: string) {
    return this.pathTemplates.controlPathTemplate.match(controlName).project;
  }

  /**
   * Parse the location from Control resource.
   *
   * @param {string} controlName
   *   A fully-qualified path representing Control resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromControlName(controlName: string) {
    return this.pathTemplates.controlPathTemplate.match(controlName).location;
  }

  /**
   * Parse the catalog from Control resource.
   *
   * @param {string} controlName
   *   A fully-qualified path representing Control resource.
   * @returns {string} A string representing the catalog.
   */
  matchCatalogFromControlName(controlName: string) {
    return this.pathTemplates.controlPathTemplate.match(controlName).catalog;
  }

  /**
   * Parse the control from Control resource.
   *
   * @param {string} controlName
   *   A fully-qualified path representing Control resource.
   * @returns {string} A string representing the control.
   */
  matchControlFromControlName(controlName: string) {
    return this.pathTemplates.controlPathTemplate.match(controlName).control;
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
   * Return a fully-qualified servingConfig resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} catalog
   * @param {string} serving_config
   * @returns {string} Resource name string.
   */
  servingConfigPath(
    project: string,
    location: string,
    catalog: string,
    servingConfig: string
  ) {
    return this.pathTemplates.servingConfigPathTemplate.render({
      project: project,
      location: location,
      catalog: catalog,
      serving_config: servingConfig,
    });
  }

  /**
   * Parse the project from ServingConfig resource.
   *
   * @param {string} servingConfigName
   *   A fully-qualified path representing ServingConfig resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromServingConfigName(servingConfigName: string) {
    return this.pathTemplates.servingConfigPathTemplate.match(servingConfigName)
      .project;
  }

  /**
   * Parse the location from ServingConfig resource.
   *
   * @param {string} servingConfigName
   *   A fully-qualified path representing ServingConfig resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromServingConfigName(servingConfigName: string) {
    return this.pathTemplates.servingConfigPathTemplate.match(servingConfigName)
      .location;
  }

  /**
   * Parse the catalog from ServingConfig resource.
   *
   * @param {string} servingConfigName
   *   A fully-qualified path representing ServingConfig resource.
   * @returns {string} A string representing the catalog.
   */
  matchCatalogFromServingConfigName(servingConfigName: string) {
    return this.pathTemplates.servingConfigPathTemplate.match(servingConfigName)
      .catalog;
  }

  /**
   * Parse the serving_config from ServingConfig resource.
   *
   * @param {string} servingConfigName
   *   A fully-qualified path representing ServingConfig resource.
   * @returns {string} A string representing the serving_config.
   */
  matchServingConfigFromServingConfigName(servingConfigName: string) {
    return this.pathTemplates.servingConfigPathTemplate.match(servingConfigName)
      .serving_config;
  }

  /**
   * Terminate the gRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   * @returns {Promise} A promise that resolves when the client is closed.
   */
  close(): Promise<void> {
    if (this.predictionServiceStub && !this._terminated) {
      return this.predictionServiceStub.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
