export const addEventListenerMock = (event: string, callback: (event: Event) => void) => {
    // Mock implementation
    console.log('addEventListenerMock', event);
    console.log('addEventListenerMock', callback);
  };
  
  
  export const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
  
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();