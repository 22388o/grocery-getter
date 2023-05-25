import { Item, ListStore } from "../store/listStore";
import { createElements } from "../ui-lib/createElement";
import { updateRecord } from "./web5/web5Helpers";

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
            const liButtonContainer = createElements({ 
                type: 'div', 
                attr: [
                    { name: 'class', value: 'grocery-list-item-button-container' }
                ] 
            });
            const liEditButton = createElements({ 
                type: 'div', 
                attr: [
                    { name: 'class', value: 'grocery-list-edit-button' }
                ] 
            });
            liEditButton.textContent = 'E';
            liEditButton.classList.add('control-btn');
            const liDeleteButton = createElements({ 
                type: 'div', 
                attr: [
                    { name: 'class', value: 'grocery-list-delete-button' }
                ] 
            });
            
            liDeleteButton.textContent = 'D';
            liDeleteButton.classList.add('control-btn');
            liButtonContainer.appendChild(liEditButton);
            liButtonContainer.appendChild(liDeleteButton);
            liText.innerHTML = item.data.body;
            liContainer.appendChild(liText);
            liContainer.appendChild(liButtonContainer);
            liEditButton.addEventListener('click', function(event: MouseEvent){
                event.stopPropagation();
                // change text container into input with value of text container
                liContainer.innerHTML = '';
                const liInput = createElements({
                    type: 'input',
                    attr: [
                        { name: 'type', value: 'text' }, 
                        { name: 'value', value: item.data.body },
                        {name: 'class', value: 'search-input'}
                    ]
                });
                liInput.classList.add('grocery-list-item-input');
                liContainer.appendChild(liInput);
                const liSaveButton = createElements({
                    type: 'button',
                    attr: [{ name: 'class', value: 'grocery-list-save-button' }]
                });
                liSaveButton.textContent = 'S';
                liSaveButton.classList.add('control-btn');
                liButtonContainer.removeChild(liEditButton);
                liButtonContainer.removeChild(liDeleteButton);
                liButtonContainer.appendChild(liSaveButton);
                liContainer.appendChild(liButtonContainer);
                // change edit button to save button with checkmark
            });
            li.appendChild(liContainer);
            ul.appendChild(li);
    });
    main.appendChild(ul);
};       