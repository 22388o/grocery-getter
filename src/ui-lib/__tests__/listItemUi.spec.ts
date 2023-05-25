import { afterEach, beforeEach, describe, expect, test } from 'vitest'; 
import { JSDOM } from 'jsdom';
import { renderButtonItemControls, renderEditInput } from '../listItemUi';


describe('List Item UI Tests', () => {
    let dom: JSDOM;
    const mockItem = {
        record: 'record-123', 
        data: {body: 'test', 
        id: '123', date: Date.now(), 
        isMarkedOut: false}, 
        id: '123'
    };
    beforeEach(() => {
        dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        global.document = dom.window.document;
        const listContainer = document.createElement('div');
        listContainer.classList.add('grocery-list-item-container');
    });
    afterEach(() => {
        dom.window.close();
    });
    test('it should throw an error if no item is provided', () => {
        // Arrange
        const item = null || undefined;
        // Act
        // Assert
        expect(() => renderButtonItemControls(item)).toThrow('could not find item');
    });
    test('it creates a button container', () => {
        // Arrange
       
        // Act
        const element = renderButtonItemControls(mockItem);
        // Assert
        expect(element.classList.contains('grocery-list-item-button-container')).toBe(true);
    });
    test('container should have 2 buttons', () => {
        // Arrange
       
        // Act
        const element = renderButtonItemControls(mockItem);
        // Assert
        expect(element.querySelectorAll('button').length).toBe(2);
    });

});