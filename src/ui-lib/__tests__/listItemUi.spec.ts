import { 
    afterEach, 
    beforeEach, 
    describe, 
    expect, 
    test,
} from 'vitest'; 
import { JSDOM } from 'jsdom';
import { renderButtonItemControls, renderEditInput } from '../listItemUi';


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

describe('List Item UI Button Tests', () => {
    
    test('it should throw an error if no item is provided', () => {
        // Arrange
        const item = null || undefined;
        // Act
        // Assert
        expect(() => renderButtonItemControls(item)).toThrow('could not find item');
    });
    test('it creates a button container', () => {
       
        // Act
        const element = renderButtonItemControls(mockItem);
        // Assert
        expect(element.classList.contains('grocery-list-item-button-container')).toBe(true);
    });
    test('container should have 2 buttons', () => {
        // Act
        const element = renderButtonItemControls(mockItem);
        // Assert
        expect(element.querySelectorAll('button').length).toBe(2);
    });

});

describe('List Item UI Edit Input Tests', () => {
    test('it should throw an error if there is no item or event', () => {
        // Arrange
        const item = null || undefined;
        const event = null || undefined;
        // Act
        // Assert
        expect(() => renderEditInput(item, event)).toThrow('item and event are required');
    });  
    test('it should create an input when edit button is clicked', () => {
        test('it should create an input when edit button is clicked', () => {
            // Arrange
            const event = new Event('MouseEvent');
            event.initEvent('click', true, true);
        
            // Act
            renderEditInput(mockItem, event);
        
            // Assert
            const element = document.querySelector('.grocery-list-item-input');
            expect(element?.tagName).toBe('INPUT');
          });
    });
});