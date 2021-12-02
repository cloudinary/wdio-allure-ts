import axios, { AxiosBasicCredentials, AxiosPromise, AxiosRequestConfig, Method } from 'axios';

const BASE_URL: string = 'https://cloudinary.testrail.net/index.php?/api/v2/';

enum ApiMethods {
  updateCase = 'update_case/',
}

/**
 * TestRail api
 */
export class TestRailApi {
  private static instance: TestRailApi;
  private basicAuth: AxiosBasicCredentials;

  private constructor() {
    this.initAuth();
  }

  /**
   * Get TestRailApi instance
   */
  public static get Instance(): TestRailApi {
    if (!this.instance) {
      this.instance = new TestRailApi();
    }

    return this.instance;
  }

  /**
   *   Updates an existing test case
   *   @param testID test id as appear on testRail site
   *   @param data fields data to update
   */
  public updateTestCase(testID: string, data: object): AxiosPromise {
    console.log(`update ${testID} with ${JSON.stringify(data)}`);
    const fullUrl: string = `${BASE_URL}${ApiMethods.updateCase}${testID}`;
    return this.postRequest(fullUrl, data);
  }

  /**
   *   Initial authentication
   */
  private initAuth(): void {
    if (!this.basicAuth) {
      this.basicAuth = {
        username: process.env.TESTRAIL_USER,
        password: process.env.TESTRAIL_PASS,
      };
    }
  }

  /**
   * Execute post request call
   * @param url request url
   * @param data request data
   */
  public postRequest(url: string, data?: object): AxiosPromise {
    return this.callApi('POST', url, data);
  }

  /**
   * Execute api request
   * @param reqMethod request method
   * @param reqUrl request url
   * @param reqData json data
   */
  private callApi(reqMethod: Method, reqUrl: string, reqData?: object): AxiosPromise {
    const requestConfig: AxiosRequestConfig = { method: reqMethod, url: reqUrl, data: reqData, auth: this.basicAuth };
    console.log(`TestRail call: ${JSON.stringify(requestConfig)}`);
    try {
      return axios(requestConfig);
    } catch (error) {
      throw error;
    }
  }
}

export interface IField {
  fieldName: string;
  fieldOptions: IFieldOptions;
}

interface IFieldOptions {
  automated?: number;
}

/**
 * TestRaill fields must be type of IField
 */
export namespace TestFields {
  /**
   * Automation Field
   */
  export const Automation: IField = {
    fieldName: 'custom_automation',
    fieldOptions: {
      automated: 3,
    },
  };
}
