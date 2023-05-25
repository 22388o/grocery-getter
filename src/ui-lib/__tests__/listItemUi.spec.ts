import { afterEach, beforeEach, describe, expect, test } from 'vitest'; 
import { JSDOM } from 'jsdom';
import { renderButtonItemControls, renderEditInput } from '../listItemUi';


describe('List Item UI Tests', () => {
    let dom: JSDOM;

    beforeEach(() => {
        dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        global.document = dom.window.document;
        const listContainer = document.createElement('div');
        listContainer.classList.add('grocery-list-item-container');
    });
    afterEach(() => {
        dom.window.close();
    });
    test('it creates a button container', () => {
        // Arrange
        const item = {
            record: 'record-123', 
            data: {body: 'test', 
            id: '123', date: Date.now(), 
            isMarkedOut: false}, 
            id: '123'
        };
        // Act
        const element = renderButtonItemControls(item);
        // Assert
        expect(element.classList.contains('grocery-list-item-button-container')).toBe(true);
    });


});