import { Item, ListStore } from "../store/listStore";
import { createElements } from "../ui-lib/createElement";
import { Web5 } from "@tbd54566975/web5";

const listStore = new ListStore('gg-list-store');
const {web5} = await Web5.connect();


async function changeItemStatus ( item, event: MouseEvent):Promise<void> {
    debugger;
    event.stopPropagation();
    let toggledItem;
    let updatedToggledItem;
    const itemElement = document.getElementById(event?.currentTarget?.id)!;
    
    for(let gItem of listStore.list) {
        if (gItem.id === event?.currentTarget?.id) {
            toggledItem = gItem;
            toggledItem.data.isMarkedOut = !toggledItem.data.isMarkedOut;
            updatedToggledItem = {...toggledItem.data};
            break;
        }
    }
    console.log('toggledItem', toggledItem);
    const { record } = await web5.dwn.records.read({
        message: {
          recordId: toggledItem.id,
        }
      });

    await record.update({
        data: updatedToggledItem,
    });

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
            liEditButton.textContent = 'Edit';
            const liDeleteButton = createElements({ 
                type: 'div', 
                attr: [
                    { name: 'class', value: 'grocery-list-delete-button' }
                ] 
            });
            liDeleteButton.textContent = 'Delete';
            liButtonContainer.appendChild(liEditButton);
            liButtonContainer.appendChild(liDeleteButton);
            liText.innerHTML = item.data.body;
            liContainer.appendChild(liText);
            liContainer.appendChild(liButtonContainer);
            li.appendChild(liContainer);
            ul.appendChild(li);
    });
    main.appendChild(ul);
};


 // if (item.id) { // Check if item.id is defined
       