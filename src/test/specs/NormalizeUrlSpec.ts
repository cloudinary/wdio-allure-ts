import { expect } from 'chai';
import { BrowserUtils } from '../..';

describe('NormalizeUrl', () => {
  it('throw if url is null', () => {
    const url: string = null;
    expect(() => BrowserUtils.normalizeUrl(url))
      .to.throw(Error)
      .with.property('message')
      .contains(`Illegal URL: '${url}'`);
  });

  it('throw if url is undefined', () => {
    const url: string = undefined;
    expect(() => BrowserUtils.normalizeUrl(url))
      .to.throw(Error)
      .with.property('message')
      .contains(`Illegal URL: '${url}'`);
  });

  it('expect / removed', () => {
    const url: string = 'someString/';
    expect(BrowserUtils.normalizeUrl(url)).to.equal('someString');
  });

  it('expect // removed', () => {
    const url: string = 'someString/';
    expect(BrowserUtils.normalizeUrl(url)).to.equal('someString');
  });

  it('empty string', () => {
    const url: string = '';
    expect(BrowserUtils.normalizeUrl(url)).to.equal('');
  });

  it('//// to be empty', () => {
    const url: string = '////';
    expect(BrowserUtils.normalizeUrl(url)).to.equal('');
  });
});
