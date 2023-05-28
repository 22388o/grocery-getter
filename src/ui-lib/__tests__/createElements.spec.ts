import { describe, expect, test } from '@jest/globals';
import { beforeEach, afterEach } from '@jest/globals';
import { JSDOM } from 'jsdom';

import { createElements } from '../createElement';


describe('Create Elements Tests', () => {
    let dom: JSDOM;
    beforeEach(() => {
        dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        global.document = dom.window.document;
    });
    afterEach(() => {
        dom.window.close();
    });
    test('it should throw an error if no type is provided', () => {
        // Arrange
        const type = '';
        const attr = [{name: 'class', value: 'grocery-list'}];
        // Act
        // Assert
        expect(() => createElements({type, attr})).toThrow('type is required');
    });
    test('it should return an element with the correct type', () => {
        // Arrange
        const type = 'div';
        // Act
        const element = createElements({type});
        // Assert
        expect(element.tagName).toBe('DIV');
    });
    test('it should return an element with the correct class', () => {
        // Arrange
        const type = 'div';
        const attr = [{name: 'class', value: 'grocery-list'}];
        // Act
        const element = createElements({type, attr});
        // Assert
        expect(element.classList.contains('grocery-list')).toBe(true);
    });
    test('it should return an element with the correct id', () => {
        // Arrange
        const type = 'div';
        const attr = [{name: 'id', value: 'grocery-list'}];
        // Act
        const element = createElements({type, attr});
        // Assert
        expect(element.id).toBe('grocery-list');
    });
    test('it should add multiple attributes to the element', () => {
        // Arrange
        const type = 'div';
        const attr = [{name: 'id', value: 'grocery-list'}, {name: 'class', value: 'grocery-list'}];
        // Act
        const element = createElements({type, attr});
        // Assert
        expect(element.id).toBe('grocery-list');
        expect(element.classList.contains('grocery-list')).toBe(true);
    });
});