import type { NextPage } from 'next'
import React from 'react';
import {ButtonUIContainer, ButtonPlayground, ButtonList, ButtonCodeArea } from '../../components/organisms/ButtonUIContainer';
import Layout from '../../components/templates/Layout'
import style from './index.module.css'

const buttonContext = React.createContext(null)

const ButtonPage: NextPage = () => {
  let area: HTMLElement | null = null;
  if (typeof document !== 'undefined') {
    area = document.getElementById('droppableArea')
  }

  return (
    <Layout>
      <div className={style.container}>
        <h1>ボタン作成</h1>
        <ButtonUIContainer>
          <div className={style.componentArea}>
            <div className={style.buttonList}>
              <ButtonList />
            </div>
            <div className={style.generatedArea}>
              <ButtonPlayground placeholder="ボタンをクリックするとここに追加されます" cols={1}></ButtonPlayground>
            </div>
          </div>
          <ButtonCodeArea />
        </ButtonUIContainer>
      </div>
    </Layout>
  )
}

export default ButtonPage