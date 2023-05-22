import { ListStore } from "../store/listStore";

const listStore = new ListStore('gg-list-store');




const createElements = (type: string, className: string,) => {
    const element = document.createElement(type);
    element.classList.add(className);
    return element;
};

export const updateList = async ():Promise<void> => {
    const main = document.querySelector<HTMLDivElement>('#mainContent')!;
    main.innerHTML = '';
    const ul = createElements('ul', 'grocery-list');
    debugger;
    listStore.list.map((item) => {
        const li = createElements('li', 'grocery-list-item');
        li.innerHTML = item.body;
        ul.appendChild(li);
    });
    main.appendChild(ul);
};