import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';

// tslint:disable-next-line:no-http-string
const sampleAppUrl: string = 'http://127.0.0.1:8000/';

/**
 * wdio-allure-ts navigateToUrl action test
 */
describe('GetText of BrowserUtils Tests', () => {
  it('Validate single result ', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);

    assert.equal(
      BrowserUtils.getText("//*[@class='button-print-message']"),
      'Print message'
    );
  });

  it('Validate multiple result ending in err ', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    expect(() =>
      BrowserUtils.getText("//*[@class='button-print-message-duplicate']")
    )
      .to.throw(Error)
      .with.property('message')
      .contains(`Found multiple results matching text or no results`);
  });

  it('Validate no element found ending in err ', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    expect(() => BrowserUtils.getText("//*[@class='OMG']"))
      .to.throw(Error)
      .with.property('message')
      .contains(`Found multiple results matching text or no results`);
  });
});
