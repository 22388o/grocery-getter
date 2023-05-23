import { Item, ListStore } from "../store/listStore";

const listStore = new ListStore('gg-list-store');



interface CreateElementsParams {
    type: string;
    attr?: {readonly [key: string]: string}[];
}

const createElements = ({type, attr}:CreateElementsParams):HTMLElement => {

    if (!type || type === '') {
        throw new Error('type is required');
    }
    const element = document.createElement(type);

    if (attr) {
        attr.forEach((attribute) => {
            if (attribute.name === 'class') {
                element.classList.add(attribute.value);
            }
            element.setAttribute(attribute.name, attribute.value);
        });
    }
    return element;
};

export const updateList =  (updatedList: Item[]) => {
    const main = document.querySelector<HTMLDivElement>('#mainContent')!;
    main.innerHTML = '';
    const ul = createElements({type:'ul', attr:[{name: 'class', value: 'grocery-list'}, {name: 'id', value: 'groceryList'}]});
    updatedList.map((item) => {
        const li = createElements({type: 'li', attr:[{name: 'class', value: 'grocery-list-item'}]});
        li.innerHTML = item.body;
        ul.appendChild(li);
    });
    main.appendChild(ul);
};