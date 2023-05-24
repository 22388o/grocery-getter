//refactor all web5 methods to this file
import { Web5 } from "@tbd54566975/web5";
import { Item } from "../../store/listStore";

const {web5} = await Web5.connect();

export const createRecord = async (item: any):Promise<Item> => {
    const {record} = await web5.dwn.records.create({
        data: item,
        message: {
          dataFormat: "application/json",
        }
      });
    const data = await record?.data.json();
    const groceryItem = {record, data, id: record?.id} as Item;
    return groceryItem;
};