import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';

describe('NormalizeUrl', () => {
  it('throw if url is null', async () => {
    const url: string = null;
    await Reporter.step('normalize illegal url');
    expect(() => BrowserUtils.normalizeUrl(url))
      .to.throw(Error)
      .with.property('message')
      .contains(`Illegal URL: '${url}'`);
  });

  it('throw if url is undefined', async () => {
    await Reporter.step('throw if url is undefined');
    const url: string = undefined;
    expect(() => BrowserUtils.normalizeUrl(url))
      .to.throw(Error)
      .with.property('message')
      .contains(`Illegal URL: '${url}'`);
  });

  it('expect / removed', async () => {
    const url: string = 'someString/';
    await Reporter.step("expect '/' removed");
    expect(BrowserUtils.normalizeUrl(url)).to.equal('someString');
  });

  it('expect // removed', async () => {
    const url: string = 'someString/';
    await Reporter.step("expect '//' removed");
    expect(BrowserUtils.normalizeUrl(url)).to.equal('someString');
  });

  it('empty string', async () => {
    const url: string = '';
    await Reporter.step('empty string');
    expect(BrowserUtils.normalizeUrl(url)).to.equal('');
  });

  it('//// to be empty', async () => {
    await Reporter.step('//// to be empty');
    const url: string = '////';
    expect(BrowserUtils.normalizeUrl(url)).to.equal('');
  });
});
