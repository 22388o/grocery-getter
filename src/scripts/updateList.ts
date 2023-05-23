import { Item } from "../store/listStore";
import { createElements } from "../ui-lib/createElement";






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