import { createElements } from './createElement';
import { Item } from '../store/listStore';

export const renderEditInput = (item: Item, event: MouseEvent):void  => {
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
            attr: [{ name: 'class', value: 'grocery-list-save-button' }]
        });
        liSaveButton.textContent = 'S';
        liSaveButton.classList.add('control-btn');
        liButtonContainer.removeChild(liEditButton);
        liButtonContainer.removeChild(liDeleteButton);
        liButtonContainer.appendChild(liSaveButton);
        liContainer.appendChild(liButtonContainer);
        liInput.focus();
};

export const renderButtonItemControls = (item: Item):HTMLElement => {
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

    liEditButton.addEventListener('click', function(event: MouseEvent){
        renderEditInput.call(this, item, event);
    });
    
    liDeleteButton.textContent = 'D';
    liDeleteButton.classList.add('control-btn');
    liButtonContainer.appendChild(liEditButton);
    liButtonContainer.appendChild(liDeleteButton);

    return liButtonContainer;
};