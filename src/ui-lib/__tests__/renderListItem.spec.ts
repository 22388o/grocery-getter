import { describe, expect, test } from '@jest/globals';
import { beforeEach, afterEach } from '@jest/globals';
import { JSDOM } from 'jsdom';
import { renderListItem } from '../listItemUi';
import { ListStore } from '../../store/listStore';

describe('Render List Item Tests', () => {
  let dom: JSDOM;
  let mockStore: ListStore;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>');
    global.document = dom.window.document;
    mockStore = new ListStore('test-store');
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