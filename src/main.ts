import './style.css'
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

library.add(faMagnifyingGlass);

const headerContainer = document.querySelector<HTMLDivElement>('.header-container')!
const searchDivContainer = document.createElement('div');

searchDivContainer.innerHTML = icon({ prefix: 'fas', iconName: 'magnifying-glass' }).html;
headerContainer.appendChild(searchDivContainer);


document.querySelector<HTMLDivElement>('#mainContent')!.innerHTML = `
  <div>
    <i class="fa-magnifying-glass"></i>
  </div>
`