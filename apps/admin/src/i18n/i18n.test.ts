import {readdirSync} from 'fs';

describe('i18n translations files', () => {
  const translationsKeys = Object.keys(require('./en.json')).sort();
  const translations = readdirSync(__dirname).filter(file => file.includes('.json'));

  it('should have at least one translation file', () => {
    expect(translations.length).toBeGreaterThan(1);
  });


  translations.forEach(file => {
    describe('translate file: ' + file, () => {
      it('should have same keys as "en.json" file', () => {
        expect(Object.keys(require('./' + file)).sort()).toEqual(translationsKeys);
      });
    });
  });
})
