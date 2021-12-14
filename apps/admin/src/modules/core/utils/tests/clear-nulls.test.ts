import {clearNulls} from '../clear-nulls';

describe('clearNulls', () => {

  describe('when given empty object', () => {
    const obj = {};

    test('should return an empty object', () => {
      expect(clearNulls(obj)).toEqual({});
    })
  });

  describe('when given object with all nulls', () => {
    const obj = {a: null, b: null, c: null};

    test('should return an empty object', () => {
      expect(clearNulls(obj)).toEqual({});
    })
  });

  describe('when given a string', () => {
    test('should return an empty object', () => {
      expect(clearNulls('demo test string')).toEqual({});
    })
  })

  describe('when given empty array', () => {
    const arr = [];

    test('should return an empty object', () => {
      expect(clearNulls(arr)).toEqual({});
    })
  });

  describe('when given array with values', () => {
    const arr = [1, 2, 3, null, 4];

    test('should return an empty object', () => {
      expect(clearNulls(arr)).toEqual({});
    })
  });

  describe('when given mixed object with values and nulls', () => {
    const obj = {a: 5, b: null, c: 7, d: null};

    test('should return an object with the valid values only', () => {
      expect(clearNulls(obj)).toEqual({a: 5, c: 7});
    })
  })
})
