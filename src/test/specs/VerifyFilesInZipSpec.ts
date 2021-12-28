import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const linkToZip: string = 'http://127.0.0.1:8000/src/test/resources/archiveWithFiles.zip';
const fileNamesList: Array<string> = ['firstFile.txt', 'secondFile.jpeg', 'innerFolder/thirdFile.doc'];
/**
 * verifyFilesInZip
 */
describeCommon('verifyFilesInZip', () => {
  it('correct list without size', () => {
    Reporter.step('Verify correct list name in zip');
    expect(() => BrowserUtils.verifyFilesInZip(linkToZip, fileNamesList)).to.not.throw(Error);
  });
  it('correct list with incorrect size', () => {
    Reporter.step('Verify correct list name and number of files in zip');
    expect(() => BrowserUtils.verifyFilesInZip(linkToZip, fileNamesList, 5))
      .to.throw(Error)
      .with.property('message')
      .contains("Incorrect number of files. Expected '5', actual '3'");
  });
  it('correct list with size', () => {
    Reporter.step('Verify correct number of files in zip');
    expect(() => BrowserUtils.verifyFilesInZip(linkToZip, fileNamesList, 3)).to.not.throw(Error);
  });
  it('incorrect zip link', () => {
    Reporter.step('Incorrect zip link throws an error');
    expect(() => BrowserUtils.verifyFilesInZip('notALink', ['']))
      .to.throw(Error)
      .with.property('message')
      .contains("Failed to get zip file from 'notALink'");
  });
});
