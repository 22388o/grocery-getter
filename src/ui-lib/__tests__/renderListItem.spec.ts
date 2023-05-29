import { describe, expect, test } from '@jest/globals';
import { beforeEach, afterEach } from '@jest/globals';
import { JSDOM } from 'jsdom';
import { renderListItem } from '../listItemUi';

describe('Render List Item Tests', () => {
  let dom: JSDOM;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>');
    global.document = dom.window.document;
  });

  afterEach(() => {
    dom.window.close();
  });

  test('it should throw an error if no item is provided', () => {
    // Arrange
    const item = undefined;

    // Act
    // Assert
    // @ts-ignore
    expect(() => renderListItem(item)).toThrow('item is required');
  });
});