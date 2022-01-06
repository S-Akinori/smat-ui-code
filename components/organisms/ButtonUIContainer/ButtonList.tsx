import { useContext, useEffect } from "react"
import Button from "../../atoms/Button";
import DraggableItem from "../../modules/DraggableItem";
import { ButtonUIState } from "./ButtonUIContainer"
import type {ButtonType} from "../../../lib/types/Button"
import deepCopy from "../../../lib/functions/deepcopy";

const buttonItems = [
  {
    id: "1",
    title: "デフォルト",
    type: "default",
    style: {
      background: "#4169e1",
      color: "#FFF",
      radius: "0",
      duration: "300ms"
    }
  },
  {
    id: "2",
    title: "アウトライン",
    type: "outline",
    style: {
      borderColor: "#4169e1",
      color: "#333",
      radius: "0",
      duration: "300ms"
    }
  },
];

const ButtonList = () => {
  const {buttons, setButtons} = useContext(ButtonUIState);

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    // add button
    for(let i = 0; i < buttonItems.length; i++) {
      if(buttonItems[i].id == e.currentTarget.id) {
        const item = deepCopy(buttonItems[i]) as ButtonType
        item.id = 'button-' + Math.random().toString(32).substring(2);
        if(buttons) {
          setButtons([...buttons, item])
        } else {
          setButtons([item])
        }
        break
      }
    }
  }

  return (
    <div>
      {buttonItems && buttonItems.map(item => (
        <div key={item.id}>
          <div>{item.title}</div>
          <DraggableItem id={item.id} onClick={onClick} item={item}>
            <Button type={item.type} style={item.style}>{item.title}</Button>
          </DraggableItem>
        </div>
      ))}
    </div>
  )
}

export default ButtonList