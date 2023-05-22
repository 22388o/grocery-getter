import './style.css'
import { Web5 } from '@tbd54566975/web5';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ListStore } from './store/listStore';

library.add(faMagnifyingGlass, faPlus);

let myDid: string;
let web5: Web5;
let record;
const getMyDid = async () => {
  const {did: myDid } = await Web5.connect();
  console.log('myDid', myDid);
  return myDid;
}

getMyDid(); 

const listStore = new ListStore('gg-list-store');

const addItemToList = async (text: string) => {
  const item = {
    id: Date.now().toString(),
    body: text,
    date: Date.now(),
  }
  const {record} = await web5.dwn.records.create({
    data: item,
    message: {
      dataFormat: "application/json",
    }
  });
  console.log('record', record?.data.json());
};

//Header and serach
const headerContainer = document.querySelector<HTMLDivElement>('.header-container')!
const searchDivContainer = document.createElement('div');
const searchInput = document.createElement('input');
const searchBtn = document.createElement('button');
searchBtn.addEventListener('click', addItemToList.bind(null, searchInput.value));


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



//Web5


 

// console.log('record', record);


// console.log('readResult', readResult);

// const updateResult = await record?.update({data: "Hello, I'm updated!"});
// // debugger;
// const updatedText = await record?.data.text();

const mainElement = document.querySelector<HTMLDivElement>('#mainContent')!;
// mainElement.innerHTML = `updatedText: ${updatedText}`;
// console.log('updateResult', await record?.data.text());

const listOfItems = document.createElement('ul');
listOfItems.classList.add('list-of-items');
listItems.forEach((item) => {
  console.log('item', item);
});

document.querySelector<HTMLDivElement>('#mainContent')!.appendChild(listOfItems);