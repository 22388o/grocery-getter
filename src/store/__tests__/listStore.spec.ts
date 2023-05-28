import { describe, expect, test } from '@jest/globals';
import { ListStore } from '../listStore.ts';
import { addEventListenerMock, localStorageMock } from '../../testing-lib/mocks/localStorageMocks.ts';


// Assign the mock to the global object
(global as any).localStorage = localStorageMock;



(global as any).window = {
  addEventListener: addEventListenerMock,
  localStorage: localStorageMock,
};


describe('NotesStore', () => {

  const store = new ListStore('test-store');
  const item = {
    record: 'test',
    id: '1',
    data: {
      body: 'Sample note',
      date: 0,
      isMarkedOut: false,
    }
  };

  test('should add a new note to the store', () => {
    // Arrange
   

    // Act
    store.add(item);

    // Assert
    const addedNote = store.get('1');
    expect(addedNote).toEqual(addedNote);
  });
  test('should update a note in the store', () => {
    // Arrange
   
    const updatedItem = {...item, data: { ...item.data, body: 'Updated note' } };
    // Act
    store.add(item);
    store.update({ ...updatedItem });

    // Assert
    const updatedNote = store.get('1');
    expect(updatedNote).toEqual(updatedItem);
   });
  test('should remove a note from the store', () => { 
    // arange
   

    // act
    store.remove({ id: item.id });
    expect(store.get(item.id)).toBeUndefined();
  });
 }); 