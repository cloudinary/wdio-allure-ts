import { expect } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

describeCommon('waitForClickable', () => {
  it('not clickable element', () => {
    expect(() => BrowserUtils.waitForClickable("//*[@id='waitForClickable']//button[@id='not_clickable_button']"))
      .to.throw(Error)
      .with.property('message')
      .contains('Timeout waiting for element ');
  });

  it('clickable element', () => {
    BrowserUtils.waitForClickable("//*[@id='waitForClickable']//button[@id='clickable_button']");
  });
  it('reverse: true', () => {
    BrowserUtils.waitForClickable("//*[@id='waitForClickable']//button[@id='not_clickable_button']", { reverse: true });
  });

  it('custom options', () => {
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
