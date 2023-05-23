import { Item } from "../store/listStore";
import { createElements } from "../ui-lib/createElement";


const changeItemStatus = (id: string, isMarkedOut: boolean):void => {
    debugger;
    const item = document.querySelector<HTMLLIElement>(id)!;
    item.setAttribute('isMarkedOut', isMarkedOut.toString());
    if (isMarkedOut) {
        item.classList.add('marked-out');
    } else {
        item.classList.remove('marked-out');
    }
};



export const updateList = (updatedList: Item[]) => {
    const main = document.querySelector<HTMLDivElement>('#mainContent')!;
    main.innerHTML = '';
    const ul = createElements({ type: 'ul', attr: [{ name: 'class', value: 'grocery-list' }, { name: 'id', value: 'groceryList' }] });
    updatedList.map((item) => {
        if (item.id) { // Check if item.id is defined
            const li = createElements({
                type: 'li',
                attr: [
                    { name: 'class', value: 'grocery-list-item' },
                    { name: 'id', value: item.id },
                    { name: 'isMarkedOut', value: 'false' }
                ]
            });
            li.addEventListener('click', changeItemStatus.bind(null,`#${item.id}`, !item.isMarkedOut));
            li.innerHTML = item.body;
            ul.appendChild(li);
        }
    });
    main.appendChild(ul);
};