import SettingsIcon from '@mui/icons-material/Settings';
import React, { useContext, useState } from "react"
import Button from "../../atoms/Button";
import styles from "./ButtonPlayground.module.css"
import { Drawer, IconButton, Modal } from "@mui/material";
import type {ButtonType} from "../../../lib/types/Button"
import { ButtonUIState } from "./ButtonUIContainer";
import { ButtonSettings } from '.';
import deepCopy from '../../../lib/functions/deepcopy';

interface Props {
  children?: React.ReactNode;
  id?: string
  placeholder?: string
  cols?: number
}

const ButtonPlayground = ({children, id = 'droppableArea', placeholder="", cols=1}: Props) => {
  const {buttons} = useContext(ButtonUIState);
  const [target, setTarget] = useState('0');
  const [targetButton, setTargetButton] = useState<ButtonType | null>(null)
  const [open, setOpen] = useState(false);

  const handleOpen = () =>  {
    if(buttons) {
      for(let i = 0; i < buttons?.length; i++) {
        if(buttons[i].id === target) {
          const item = deepCopy(buttons[i]) as ButtonType
          setTargetButton(item);
          break
        }
      }
    }
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const onMouseOver = (e: React.MouseEvent<HTMLElement>) => {
    const key = e.currentTarget.dataset.key;
    if(key) {
      setTarget(key)
    }
  }
  const onMouseLeave = () => {
    setTarget('0')
  }

  return (
    <div id={id} className={styles.area} style={{background: "#ececec", height: "200px", display: "flex", flexWrap: "wrap"}}>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleClose}
      >
        {targetButton && <ButtonSettings button={targetButton} />}
      </Drawer>
      {!buttons && <span className={styles.placeholder}>{placeholder}</span>}
      {buttons && buttons.map(button => (
        <div style={{position: "relative", width: `calc(${100/cols}% - 1rem)`}} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} data-key={button.id} key={button.id}>
          <Button type={button.type} style={button.style}>{button.title}</Button>
          {target == button.id.toString() && (<IconButton onClick={handleOpen} style={{position: "absolute"}}>
            <SettingsIcon />
          </IconButton>)}
        </div>
      ))}
    </div>
  )
}

export default ButtonPlayground;