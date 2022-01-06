import { ButtonType } from "../types/Button";

const extractItemById = (arr: ButtonType[], id: string) => {
  for(let item of arr) {
    if(item.id === id) {
      return item;
    }
  }
  return null
}

export default extractItemById