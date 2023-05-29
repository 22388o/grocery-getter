import { createElements } from './createElement';
import { Item } from '../store/listStore';
import { editItem, deleteItem, changeItemStatus } from '../scripts/updateList';


export const renderListItemText = (item: Item):HTMLElement => {
    if(item === undefined || null ) {
        throw new Error('could not find item');
    }
    const liTextContainer = createElements({
        type: 'div',
        attr: [
            { name: 'class', value: 'grocery-list-item-text' }
        ]
    });
    const liText = createElements({
        type: 'div',
        attr: [
            { name: 'class', value: 'grocery-list-item-text' }
        ]
    });
    liText.addEventListener('click', function(event: MouseEvent){
        changeItemStatus.call(this, item, event);
    });
    liText.textContent = item.data.body;
    liTextContainer.appendChild(liText);
    return liTextContainer;
};

export const renderEditInput = (item: Item, event: MouseEvent):void  => {
    if((item === undefined || null ) || event === undefined || null) {
        throw new Error('item and event are required');
    }
    event.stopPropagation();
    const liContainer = document.querySelector('.grocery-list-item-container')!;
    const liButtonContainer = liContainer.querySelector<HTMLDivElement>('.grocery-list-item-button-container')!;
    const liEditButton = liButtonContainer.querySelector<HTMLDivElement>('.grocery-list-edit-button')!;
    const liDeleteButton = liButtonContainer.querySelector<HTMLDivElement>('.grocery-list-delete-button')!;
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
            attr: [
                { name: 'class', value: 'grocery-list-save-button' },
                {name: 'type', value: 'button'}
            ]
        });
        liSaveButton.textContent = 'S';
        liSaveButton.classList.add('control-btn');
        liSaveButton.addEventListener('click', function(event: MouseEvent){
            editItem(item, event);
        }); 
        const liCancelButton = createElements({
            type: 'button',
            attr: [{ name: 'class', value: 'grocery-list-cancel-button'}]
        });
        liCancelButton.textContent = 'C';
        liCancelButton.classList.add('control-btn');
        liCancelButton.addEventListener('click', function(event: MouseEvent){
            event.stopPropagation();
            liContainer.innerHTML = '';
            const listText = renderListItemText(item);
            liContainer.appendChild(listText);
            liButtonContainer.innerHTML = '';
            liButtonContainer.appendChild(liEditButton);
            liButtonContainer.appendChild(liDeleteButton);
            liContainer.appendChild(liButtonContainer);
        });
        liButtonContainer.removeChild(liEditButton);
        liButtonContainer.removeChild(liDeleteButton);
        liButtonContainer.appendChild(liSaveButton);
        liButtonContainer.appendChild(liCancelButton);
        liContainer.appendChild(liButtonContainer);
        liInput.focus();
};

export const renderButtonItemControls = (item: Item):HTMLElement => {
    if(item === undefined || null ) {
        throw new Error('could not find item');
    }
    const liButtonContainer = createElements({ 
        type: 'div', 
        attr: [
            { name: 'class', value: 'grocery-list-item-button-container' }
        ] 
    });
    const liEditButton = createElements({ 
        type: 'button', 
        attr: [
            { name: 'class', value: 'grocery-list-edit-button' }
        ] 
    });
    liEditButton.textContent = 'E';
    liEditButton.classList.add('control-btn');
    const liDeleteButton = createElements({ 
        type: 'button', 
        attr: [
            { name: 'class', value: 'grocery-list-delete-button' }
        ] 
    });
    liDeleteButton.addEventListener('click', function(event: MouseEvent){
        deleteItem.call(this, item, event);
    });
    liEditButton.addEventListener('click', function(event: MouseEvent){
        renderEditInput.call(this, item, event);
    });
    
    liDeleteButton.textContent = 'D';
    liDeleteButton.classList.add('control-btn');
    liButtonContainer.appendChild(liEditButton);
    liButtonContainer.appendChild(liDeleteButton);

    return liButtonContainer;
};

export const renderListItem = (item: Item):HTMLElement => {
    if(item === undefined || null ) {
        console.error('could not render list item because item is undefined or null');
        throw new Error('could not render item');
    }
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
    const liText = renderListItemText(item);           
    const buttonContainer = renderButtonItemControls(item);
    liText.innerHTML = item.data.body;
    liContainer.appendChild(liText);
    liContainer.appendChild(buttonContainer);           
    li.appendChild(liContainer);
    return li;
}