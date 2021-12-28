import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';

describe('NormalizeUrl', () => {
  it('throw if url is null', () => {
    const url: string = null;
    Reporter.step('normalize illegal url');
    expect(() => BrowserUtils.normalizeUrl(url))
      .to.throw(Error)
      .with.property('message')
      .contains(`Illegal URL: '${url}'`);
  });

  it('throw if url is undefined', () => {
    Reporter.step('throw if url is undefined');
    const url: string = undefined;
    expect(() => BrowserUtils.normalizeUrl(url))
      .to.throw(Error)
      .with.property('message')
      .contains(`Illegal URL: '${url}'`);
  });

  it('expect / removed', () => {
    const url: string = 'someString/';
    Reporter.step("expect '/' removed");
    expect(BrowserUtils.normalizeUrl(url)).to.equal('someString');
  });

  it('expect // removed', () => {
    const url: string = 'someString/';
    Reporter.step("expect '//' removed");
    expect(BrowserUtils.normalizeUrl(url)).to.equal('someString');
  });

  it('empty string', () => {
    const url: string = '';
    Reporter.step('empty string');
    expect(BrowserUtils.normalizeUrl(url)).to.equal('');
  });

  it('//// to be empty', () => {
    Reporter.step('//// to be empty');
    const url: string = '////';
    expect(BrowserUtils.normalizeUrl(url)).to.equal('');
  });
});
