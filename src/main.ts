import './style.css'
import { Web5 } from '@tbd54566975/web5';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ListStore } from './store/listStore';
import { updateList } from './scripts/updateList';

library.add(faMagnifyingGlass, faPlus);

const {web5, } = await Web5.connect();




const listStore = new ListStore('gg-list-store');

const addItemToList = async (text: string):Promise<void> => {
  const item = {
    body: text,
    date: Date.now(),
    isMarkedOut: false,
  }
  const {record} = await web5.dwn.records.create({
    data: item,
    message: {
      dataFormat: "application/json",
    }
  });
  const data = await record?.data.json();
  const groceryItem = {record, data, id: record?.id};
  listStore.add(groceryItem);
  updateList(listStore.list);

};

//Header and serach
const headerContainer = document.querySelector<HTMLDivElement>('.header-container')!
const searchDivContainer = document.createElement('div');
const searchInput = document.createElement('input');
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