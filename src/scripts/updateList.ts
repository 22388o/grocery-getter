import { Item, ListStore } from "../store/listStore";
import { createElements } from "../ui-lib/createElement";
import { Web5 } from "@tbd54566975/web5";
let web5: Web5;
const listStore = new ListStore('gg-list-store');

const changeItemStatus = async (item):Promise<void> => {
    let toggledItem;
    let updatedToggledItem;
    debugger;
    const itemElement = document.getElementById(item.id)!;
    
    for(let gItem of listStore.list) {
        if (gItem.id === item.id) {
            toggledItem = gItem;
            toggledItem.data.isMarkedOut = !toggledItem.data.isMarkedOut;
            updatedToggledItem = {...toggledItem.data};
            break;
        }
    }
    const {record} = await web5.dwn.records.read({
        message: {
            recordId: toggledItem?.id,
        }
    })
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

    // now you need to get the record and pull the data out of it
    // to make this work the right way. 
    const main = document.querySelector<HTMLDivElement>('#mainContent')!;
    main.innerHTML = '';
    const ul = createElements({ type: 'ul', attr: [{ name: 'class', value: 'grocery-list' }, { name: 'id', value: 'groceryList' }] });
    console.log('updatedList', updatedList);
    updatedList.map(item => {
             const li = createElements({
                type: 'li',
                attr: [
                    { name: 'class', value: item.data.isMarkedOut ? 'grocery-list marked-out' : 'grocery-list-item' },
                    { name: 'id', value: item.id },
                    { name: 'isMarkedOut', value: item.data.isMarkedOut.toString() },
                ]
            });
            li.addEventListener('click', changeItemStatus.bind());
            li.innerHTML = item.data.body;
            ul.appendChild(li);
    });
    main.appendChild(ul);
};


 // if (item.id) { // Check if item.id is defined
       