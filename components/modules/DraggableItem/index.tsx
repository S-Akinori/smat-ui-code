import React, { useContext, useState } from 'react'
// import { DragAndDropState } from '../../organisms/DragAndDropContainer';
import styles from './index.module.css'

interface Props {
  children: React.ReactNode
  id: string
  dataTarget?: string
  copy?: boolean
  item: {
    id: string,
    title: string
    type: string
  }
  onClick?: React.MouseEventHandler<HTMLDivElement> 
}

const DraggableItem = ({children, id, dataTarget = 'droppableArea', onClick = undefined, item}: Props) => {
  // const {buttons, setButtons} = useContext(DragAndDropState);

  // let area: HTMLElement | null = null;
  // if (typeof document !== 'undefined') {
  //   area = document.getElementById(`${dataTarget}`);
  // }

  // const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
  //   const el = e.currentTarget;
  //   el.style.position = "fixed"
  //   el.style.top = e.pageY - el.offsetHeight / 2 + 'px';
  //   el.style.left = e.pageX - el.offsetWidth / 2 + 'px';
  // }

  // const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
  //   if(area) {
  //     const el = e.currentTarget;
  //     el.style.top = e.pageY - el.offsetHeight / 2 + 'px';
  //     el.style.left = e.pageX - el.offsetWidth / 2 + 'px';
  //     if(area.offsetLeft < e.pageX && e.pageX < area?.offsetLeft + area?.offsetWidth && area.offsetTop < e.pageY && e.pageY < area?.offsetTop + area?.offsetHeight) {
  //       el.classList.add('droppable')
  //     } else {
  //       el.classList.remove('droppable')
  //     }
  //   }
  // }

  // const onMouseUp = (e: React.MouseEvent<HTMLElement>) => {
  //   const el = e.currentTarget;
  //   if(el.classList.contains('droppable')) {
  //     // generate unique id of button
  //     item.id = 'button_' + Math.random().toString(32).substring(2);
  //     if(buttons) {
  //       buttons.push(item)
  //       setButtons(buttons)
  //     } else {
  //       setButtons([item])
  //     }
  //   }
  //   el.style.position = 'static'
  // }

  return (
    <div id={id} className={styles.draggable} data-target={dataTarget} onClick={onClick}>{children}</div>
  )
}

export default DraggableItem