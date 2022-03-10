import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';
import { Reporter } from '../../index';

describeCommon('waitForClickable', () => {
  it('not clickable element', async () => {
    await Reporter.step('not clickable element throws an error');
    await chai
      .expect(BrowserUtils.waitForClickable("//*[@id='waitForClickable']//button[@id='not_clickable_button']"))
      .to.rejectedWith(Error, 'Timeout waiting for element ');
  });

  it('clickable element', async () => {
    await Reporter.step(' clickable element');
    await BrowserUtils.waitForClickable("//*[@id='waitForClickable']//button[@id='clickable_button']");
  });
  it('reverse: true', async () => {
    await Reporter.step(' clickable element - revers true');
    await BrowserUtils.waitForClickable("//*[@id='waitForClickable']//button[@id='not_clickable_button']", {
      reverse: true,
    });
  });

  it('custom options', async () => {
    await Reporter.step(' clickable element - custom options');
    await chai
      .expect(
        BrowserUtils.waitForClickable("//*[@id='waitForClickable']//button[@id='not_clickable_button']", {
          timeout: 1234,
          timeoutMsg: 'custom message',
          interval: 1000,
        })
      )
      .to.rejectedWith(Error, 'custom message');
  });
});
