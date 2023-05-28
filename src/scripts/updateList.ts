import { Item, ListStore } from "../store/listStore";
import { createElements } from "../ui-lib/createElement";
import { deleteRecord, updateRecord } from "./web5/web5Helpers";
import { renderListItem } from "../ui-lib/listItemUi";

const listStore = new ListStore('gg-list-store');


export async function changeItemStatus ( item: Item, event: MouseEvent):Promise<void> {
    event.stopPropagation();
    let toggledItem;
    let updatedToggledItem;
    const itemElement = document.getElementById((event?.currentTarget as HTMLElement).id)!;
    
    for(let gItem of listStore.list) {
        if (gItem.id === item.id) {
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

export const deleteItem = async (item: Item, event: MouseEvent):Promise<void> => {
    if (item === undefined || null || event === undefined || null) {
        throw new Error('item and event are required');
    }
    event.stopPropagation();
    

    const deletedItem = listStore.list.find((i) => i.id === item?.id) as Item;

    if (!deletedItem) {
        return;
    }
    listStore.remove({id: deletedItem.id});

    await deleteRecord(deletedItem.id);
    
    updateList(listStore.list);
}

export const editItem = async (item: Item, event: MouseEvent):Promise<void> => {
    event.stopPropagation();
    let editedItem;
    let updatedEditedItem;
    const input = document.querySelector('.grocery-list-item-input') as HTMLInputElement;
    const updatedText = input.value;
 
   
    editedItem = listStore.list.find((i) => i.id === item?.id);

    if (!editedItem) {
        throw new Error('Item not found');
    }
    editedItem.data.body = updatedText;
    updatedEditedItem = {...editedItem.data};
    
    await updateRecord(editedItem, updatedEditedItem);
    listStore.update(editedItem);
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
        const li = renderListItem(item); 
        ul.appendChild(li);
    });
    main.appendChild(ul);
};       



