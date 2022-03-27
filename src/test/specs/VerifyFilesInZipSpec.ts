import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const linkToZip: string = 'http://127.0.0.1:8000/src/test/resources/archiveWithFiles.zip';
const fileNamesList: Array<string> = ['firstFile.txt', 'secondFile.jpeg', 'innerFolder/thirdFile.doc'];
/**
 * verifyFilesInZip
 */
describeCommon('verifyFilesInZip', () => {
  it('correct list without size', async () => {
    await Reporter.step('Verify correct list name in zip');
    await BrowserUtils.verifyFilesInZip(linkToZip, fileNamesList);
  });
  it('correct list with incorrect size', async () => {
    await Reporter.step('Verify correct list name and number of files in zip');
    await chai
      .expect(BrowserUtils.verifyFilesInZip(linkToZip, fileNamesList, 5))
      .to.rejectedWith(Error, "Incorrect number of files. Expected '5', actual '3'");
  });
  it('correct list with size', async () => {
    await Reporter.step('Verify correct number of files in zip');
    await BrowserUtils.verifyFilesInZip(linkToZip, fileNamesList, 3);
  });

  it('incorrect zip link', async () => {
    await Reporter.step('Incorrect zip link throws an error');
    await chai
      .expect(BrowserUtils.verifyFilesInZip('notALink', ['']))
      .to.rejectedWith(Error, "Failed to get zip file from 'notALink'");
  });
});
