import './style.css'
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ListStore } from './store/listStore';
import { updateList } from './scripts/updateList';
import { createRecord } from './scripts/web5/web5Helpers';

library.add(faMagnifyingGlass, faPlus);


const listStore = new ListStore('gg-list-store');

const addItemToList = async (text: string):Promise<void> => {
  const item = {
    body: text,
    date: Date.now(),
    isMarkedOut: false,
  };

  const groceryItem = await createRecord(item);
  listStore.add(groceryItem);
  updateList(listStore.list);

};

//Header and serach
const headerContainer = document.querySelector<HTMLDivElement>('.header-container')!
const searchDivContainer = document.createElement('div');
const searchInput = document.createElement('input');
searchInput.setAttribute('id', 'searchInput');
searchInput.setAttribute('type', 'text');
searchInput.setAttribute('placeholder', 'Search...');
searchInput.setAttribute('autocomplete', 'off');
searchInput.setAttribute('autocorrect', 'off');
searchInput.setAttribute('name', 'searchInput');
const searchBtn = document.createElement('button');

searchBtn.addEventListener('click',  async() => {
  await addItemToList(searchInput.value);
  searchInput.value = '';
});


searchBtn.classList.add('search-btn');
searchInput.classList.add('search-input');
searchInput.setAttribute('type', 'text');
searchInput.setAttribute('placeholder', 'Search');
searchDivContainer.appendChild(searchInput);
searchBtn.setAttribute('type', 'button');
searchBtn.innerHTML = icon({ prefix: 'fas', iconName: 'plus' }).html.join('');
searchDivContainer.appendChild(searchBtn);
searchDivContainer.classList.add('search-container');
headerContainer.appendChild(searchDivContainer);

const hi = `are you thinking through this?`;

if (listStore.list.length === 0) {
  document.querySelector<HTMLDivElement>('#mainContent')!.innerHTML = hi;
} else {
  updateList(listStore.list);
}