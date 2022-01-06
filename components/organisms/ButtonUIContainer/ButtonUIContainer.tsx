import React, { useState } from "react"
import { ButtonType } from "../../../lib/types/Button";

export const ButtonUIState = React.createContext<ContextProps>({} as ContextProps);

interface ContextProps {
  buttons: ButtonType[] | null
  setButtons: React.Dispatch<React.SetStateAction<ButtonType[] | null>>
}

interface Props {
  children: React.ReactNode
}

const ButtonUIContainer = ({children}: Props) => {
  const [buttons, setButtons] = useState<ButtonType[] | null>(null)
  const value: ContextProps = {
    buttons,
    setButtons
  }

  return (
    <div>
      <ButtonUIState.Provider value={value}>
        {children}
      </ButtonUIState.Provider>
    </div>
  )
}

export default ButtonUIContainer;