import { afterEach, beforeEach, describe, expect, test } from 'vitest'; 
import { JSDOM } from 'jsdom';
import { ListStore } from '../../store/listStore';
import { addEventListenerMock, localStorageMock } from '../../testing-lib/mocks/localStorageMocks.ts';


// Assign the mock to the global object
(global as any).localStorage = localStorageMock;



(global as any).window = {
  addEventListener: addEventListenerMock,
  localStorage: localStorageMock,
};

import { renderListItem } from '../listItemUi';


describe('Render List Item Tests', () => {
    beforeEach(() => {
        const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>');
        global.document = dom.window.document;
        const mockStore = new ListStore('test-store');
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