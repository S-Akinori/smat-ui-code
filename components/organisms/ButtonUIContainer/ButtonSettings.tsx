import React, { useContext } from "react"
import extractItemById from "../../../lib/functions/extractItemById"
import type {ButtonType} from "../../../lib/types/Button"
import { ButtonUIState } from "./ButtonUIContainer"
import style from "./ButtonSettings.module.css"
import { Input, TextField } from "@mui/material"

interface Props {
  button: ButtonType
}

const ButtonSettings = ({button}: Props) => {
  const {buttons, setButtons} = useContext(ButtonUIState)

  const setBackgroundColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(buttons) {
      const item = extractItemById(buttons, button.id)
      if(item) {
        const color = e.currentTarget.value
        item.style.background = color
      }
    }
  }
  const setborderColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(buttons) {
      const item = extractItemById(buttons, button.id)
      if(item) {
        const color = e.currentTarget.value
        item.style.borderColor = color
      }
    }
  }
  const setTextColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(buttons) {
      const item = extractItemById(buttons, button.id)
      if(item) {
        const color = e.currentTarget.value
        item.style.color = color
      }
    }
  }
  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(buttons) {
      const item = extractItemById(buttons, button.id)
      if(item) {
        const title = e.currentTarget.value
        item.title = title;
      }
    }
  }
  const setRadius = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(buttons) {
      const item = extractItemById(buttons, button.id)
      if(item) {
        const radius = e.currentTarget.value
        item.style.radius = radius;
      }
    }
  }
  const setDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(buttons) {
      const item = extractItemById(buttons, button.id)
      if(item) {
        const duration = e.currentTarget.value
        item.style.duration = duration;
      }
    }
  }

  return (
    <div className={style.settings}>
      <div className={style.title}>ボタン設定</div>
      <div className={style.form}>
        {button.type !== "outline" && (<div className={style.formGroup}>
          <p className={style.label}>背景色</p>
          <div className="flex-start-center">
            <input type="color" onChange={setBackgroundColor} defaultValue={button.style?.background} />
            <span id="bgColorCode">{button.style.background}</span>
          </div>
        </div>)}
        {button.type === "outline" && (<div className={style.formGroup}>
          <p className={style.label}>枠線の色</p>
          <div className="flex-start-center">
            <input type="color" onChange={setborderColor} defaultValue={button.style?.borderColor} />
            <span id="bgColorCode">{button.style.borderColor}</span>
          </div>
        </div>)}
        <div className={style.formGroup}>
          <p className={style.label}>文字色</p>
          <div className="flex-start-center">
            <input type="color" onChange={setTextColor} defaultValue={button.style?.color} />
            <span id="bgColorCode">{button.style.color}</span>
          </div>
        </div>
        <div className={style.formGroup}>
          <p>テキスト</p>
          <TextField onChange={setTitle} defaultValue={button.title} />
        </div>
        <div className={style.formGroup}>
          <p>丸み</p>
          <TextField onChange={setRadius} defaultValue={button.style.radius} />
        </div>
        <div className={style.formGroup}>
          <p>アニメーション時間</p>
          <TextField onChange={setDuration} defaultValue={button.style.duration} />
        </div>
      </div>
    </div>
  )
}

export default ButtonSettings