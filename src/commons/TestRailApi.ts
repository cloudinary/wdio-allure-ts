import axios, { AxiosBasicCredentials, AxiosPromise, AxiosRequestConfig } from 'axios';

const BASE_URL: string = 'https://cloudinary.testrail.net/index.php?/api/v2/';

enum ApiMethods {
  updateCase = 'update_case/',
}

export enum AutomationFieldOptions {
  automated = 3,
  applitoolsCandidate = 4,
}

/**
 * TestRail api
 */
export class TestRailApi {
  private static instance: TestRailApi;
  private basicAuth: AxiosBasicCredentials;

  public static get Instance(): TestRailApi {
    if (this.instance === undefined) {
      this.instance = new TestRailApi();
    }

    return this.instance;
  }

  /**
   *   Change test 'Automation' field
   *   @param testID test id as appear on testRail site
   *   @param value choose one of AutomationOptions
   */
  public changeTestAutomationField(testID: string, value: AutomationFieldOptions): AxiosPromise {
    const fullUrl: string = `${BASE_URL}${ApiMethods.updateCase}${testID}`;
    return this.makeRequest('POST', fullUrl, { custom_automation: value });
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
  private makeRequest(reqMethod: string, reqUrl: string, reqData?: object): AxiosPromise {
    this.initAuth();
    const requestConfig: AxiosRequestConfig = { method: reqMethod, url: reqUrl, data: reqData, auth: this.basicAuth };

    try {
      return axios(requestConfig);
    } catch (error) {
      throw error;
    }
  }
}
