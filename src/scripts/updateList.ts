import { Item, ListStore } from "../store/listStore";
import { createElements } from "../ui-lib/createElement";
import { updateRecord } from "./web5/web5Helpers";
import { renderButtonItemControls } from "../ui-lib/listItemUi";


const listStore = new ListStore('gg-list-store');


async function changeItemStatus ( item: Item, event: MouseEvent):Promise<void> {
    event.stopPropagation();
    let toggledItem;
    let updatedToggledItem;
    const itemElement = document.getElementById((event?.currentTarget as HTMLElement).id)!;
    
    for(let gItem of listStore.list) {
        if (gItem.id === (event?.currentTarget as HTMLElement).id) {
            toggledItem = gItem;
            toggledItem.data.isMarkedOut = !toggledItem.data.isMarkedOut;
            updatedToggledItem = {...toggledItem.data};
            break;
        }
    }


    if (!toggledItem || !updatedToggledItem) {
        throw new Error('Item not found');
    }
 
    await updateRecord(toggledItem, updatedToggledItem);

    if (toggledItem?.data.isMarkedOut) {
        itemElement.setAttribute('isMarkedOut', 'true');
        itemElement.classList.add('marked-out');
    } else {
        itemElement.setAttribute('isMarkedOut', 'false');
        itemElement.classList.remove('marked-out');
    }
};

export const editItem = async (item: Item, event: MouseEvent):Promise<void> => {
    event.stopPropagation();
    let toggledItem;
    let updatedToggledItem;
    const input = document.querySelector('.grocery-list-item-input') as HTMLInputElement;
    const liContainer = document.querySelector('.grocery-list-item-container')!;
    const liElement = liContainer.closest('.grocery-list')!;
    console.log(liElement.id);
    const updatedText = input.value;
 
    for(let gItem of listStore.list) {
        if (gItem.id === liElement.id) {
            toggledItem = gItem;
            toggledItem.data.body = updatedText;
            updatedToggledItem = {...toggledItem.data};
            break;
        }
    }
    
    if (!toggledItem || !updatedToggledItem) {
        throw new Error('Item not found');
    }
    await updateRecord(toggledItem, updatedToggledItem);
    updateList(listStore.list);
};



export const updateList = (updatedList: Item[]) => {

    const main = document.querySelector<HTMLDivElement>('#mainContent')!;
    main.innerHTML = '';
    const ul = createElements({ 
        type: 'ul', 
        attr: [
            { name: 'class', value: 'grocery-list' }, 
            { name: 'id', value: 'groceryList' }
        ] 
    });
    
    updatedList.map(item => {
             const li = createElements({
                type: 'li',
                attr: [
                    { name: 'class', value: item.data.isMarkedOut ? 'grocery-list' : 'grocery-list-item' },
                    { name: 'id', value: item.id },
                    { name: 'isMarkedOut', value: item.data.isMarkedOut.toString() },
                ]
            });
            const liContainer = createElements({ 
                type: 'div', 
                attr: [
                    { name: 'class', value: 'grocery-list-item-container' }
                ] 
            });
            const liText = createElements({ 
                type: 'div', 
                attr: [
                    { name: 'class', value: 'grocery-list-item-text'},
                    { name: 'id', value: item?.id?.toString() },
                ] 
            });
            liText.addEventListener('click', function(event: MouseEvent){
                changeItemStatus.call(this, item, event);
            });            
            const buttonContainer = renderButtonItemControls(item);
            liText.innerHTML = item.data.body;
            liContainer.appendChild(liText);
            liContainer.appendChild(buttonContainer);           
            li.appendChild(liContainer);
            ul.appendChild(li);
    });
    main.appendChild(ul);
};       



