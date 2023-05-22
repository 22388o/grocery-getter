// import Item from const/interfaces
export type Item = {
  id: string;
  body: string;
  date: number;
}
  
export class ListStore extends EventTarget {
  public list: Item[] = [];
  private localStorageKey: string;
  get: (id: string) => Item | undefined;

  constructor(localStorageKey: string) {
    super();
    this.localStorageKey = localStorageKey;
    this._readStorage();
    
    window.addEventListener('storage', () => {
      this._readStorage();
      this._saveNotes();
    }, false);

    this.get = (id: string) => this.list.find((item) => item.id === id);
  }
  _readStorage() { 
    const storedNotes = localStorage.getItem(this.localStorageKey);
    this.list = storedNotes ? JSON.parse(storedNotes) : [];
  }
  
  _saveNotes() { 
    window.localStorage.setItem(this.localStorageKey, JSON.stringify(this.list));
  }

  // mutators
  add(item: Item): void { 
    this.list.push( item );
    this._saveNotes();
  }
  remove({ id }: { id: string }) { 
    this.list = this.list.filter((item) => item.id !== id);
    this._saveNotes();
  }
  update(item: Item): void {
    this.list = this.list.map((i) => i.id === item.id ? item : i);
    this._saveNotes();
  }
}