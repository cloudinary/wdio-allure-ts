import { expect } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';
import { Reporter } from '../../index';

describeCommon('waitForClickable', () => {
  it('not clickable element', () => {
    Reporter.step('not clickable element throws an error');
    expect(() => BrowserUtils.waitForClickable("//*[@id='waitForClickable']//button[@id='not_clickable_button']"))
      .to.throw(Error)
      .with.property('message')
      .contains('Timeout waiting for element ');
  });

  it('clickable element', () => {
    Reporter.step(' clickable element');
    BrowserUtils.waitForClickable("//*[@id='waitForClickable']//button[@id='clickable_button']");
  });
  it('reverse: true', () => {
    Reporter.step(' clickable element - revers true');
    BrowserUtils.waitForClickable("//*[@id='waitForClickable']//button[@id='not_clickable_button']", { reverse: true });
  });

  it('custom options', () => {
    Reporter.step(' clickable element - custom options');
    expect(() =>
      BrowserUtils.waitForClickable("//*[@id='waitForClickable']//button[@id='not_clickable_button']", {
        timeout: 1234,
        timeoutMsg: 'custom message',
        interval: 1000,
      })
    )
      .to.throw(Error)
      .with.property('message')
      .contains('Timeout waiting for element ')
      .contains('custom message');
  });
});
