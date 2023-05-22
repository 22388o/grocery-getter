import { Web5 } from "@tbd54566975/web5";
import { Item, ListStore } from "../store/listStore";

const listStore = new ListStore('gg-list-store');

const {web5} = await Web5.connect();



export const updateList = async () => {
    const listOfItems = document.createElement('ul');
    listOfItems.classList.add('list-of-items');
    const {records} = await web5.dwn.records.query({  
        message: {
            filter: {
                schema: 'http://some-schema-registry.org/grocery-item'
            },
            dateCreated: 'desc'
        }
    });

    for(let record of records || []) {
        const data = await record.data.json();
        const item = {record, data, id: record.id};
        
        listStore.add(item);
    }
};