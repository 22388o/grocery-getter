import { describe, expect, test,  } from 'vitest'; 
import { ListStore } from '../listStore.ts';
import { addEventListenerMock, localStorageMock } from '../../testing-lib/mocks/localStorageMocks.ts';


// Assign the mock to the global object
(global as any).localStorage = localStorageMock;



(global as any).window = {
  addEventListener: addEventListenerMock,
  localStorage: localStorageMock,
};


describe('NotesStore', () => {
  test('should add a new note to the store', () => {
    // Arrange
    const store = new ListStore('test-store');
    const note = {
      id: '1',
      body: 'Sample note',
      date: 0,
    };

    // Act
    store.add(note);

    // Assert
    const addedNote = store.get('1');
    expect(addedNote).toEqual({
      id: '1',
      body: 'Sample note',
      date: expect.any(Number),
    });
  });
  test('should update a note in the store', () => {
    // Arrange
    const store = new ListStore('test-store');
    const note = {
      id: '1',
      body: 'Sample note',
      date: 0,
    };

    // Act
    store.add(note);
    store.update({ ...note, body: 'Updated note' });

    // Assert
    const updatedNote = store.get('1');
    expect(updatedNote).toEqual({
      id: '1',
      body: 'Updated note',
      date: expect.any(Number),
    });
   });
  test('should remove a note from the store', () => { 
    // arange
    const store = new ListStore('test-store');
    const noteId = '1';

    // act
    store.remove({ id: noteId });
    expect(store.get(noteId)).toBeUndefined();
  });
 }); 