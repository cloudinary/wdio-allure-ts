import axios, { AxiosBasicCredentials, AxiosPromise, AxiosRequestConfig } from 'axios';
import { RequestMethod } from '../enums/RequestMethod';

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
   *   Change test 'Automation' field
   *   @param testID test id as appear on testRail site
   *   @param field test field
   *   @param option field option number
   */
  public changeTestField(testID: string, field: IField, option: number): AxiosPromise {
    const data: any = {};
    const fullUrl: string = `${BASE_URL}${ApiMethods.updateCase}${testID}`;
    data[field.fieldName] = option;
    return this.makeRequest(RequestMethod.POST, fullUrl, data);
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
   * Standard api request
   * @param reqMethod request method
   * @param reqUrl request url
   * @param reqData json data
   */
  private makeRequest(reqMethod: RequestMethod, reqUrl: string, reqData?: object): AxiosPromise {
    const requestConfig: AxiosRequestConfig = { method: reqMethod, url: reqUrl, data: reqData, auth: this.basicAuth };

    try {
      return axios(requestConfig);
    } catch (error) {
      throw error;
    }
  }
}

interface IField {
  fieldName: string;
  fieldOptions: object;
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
      applitoolsCandidate: 4,
    },
  };
}
