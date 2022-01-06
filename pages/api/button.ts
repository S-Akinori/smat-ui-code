// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ButtonType } from '../../lib/types/Button';
import fs from "fs"

const createHtml = (buttons: ButtonType[]) => {
  let html = `<div class="buttons-container">\n`
  for(let button of buttons) {
    if(button.type == 'outline') {
      html += `   <div class="buttons-container__button"><button class="button ${button.id}">${button.title}</button></div>\n`
    } else {
      html += `   <div class="buttons-container__button"><button class="button ${button.id}">${button.title}</button></div>\n`
    }
  }
  html += `</div>`
  return html;
}

const createCss = (buttons: ButtonType[]) => {
  console.log(buttons)
  let css = `
        .buttons-container {
          display: flex;
        }
        .buttons-container__button {
          width: 100%;
        }
        .button {
          padding: 0.5rem 2rem;
          background: #4169e1;
          color: #FFF;
          border-radius: 0;
          transition-duration: all 300ms;
        }
        .button:hover {
          filter: brightness(120%);
        }`

  for(let button of buttons) {
    switch (button.type) {
      case 'outline':
        css += `
        .${button.id} {
          border: 1px solid ${button.style.borderColor};
          background: none;
          color: ${button.style.color};
          transition: all ${button.style.duration};
          border-radius: ${button.style.radius};
        }
        .${button.id}:hover {
          background: ${button.style.borderColor};
        }`
        break
      default:
        css += `
        .${button.id} {
          background: ${button.style.background};
          color: ${button.style.color};
          transition: all ${button.style.duration};
          border-radius: ${button.style.radius};
        }`
    }
  }
  return css;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { buttons } = req.body
  let html = createHtml(buttons);
  let css = createCss(buttons);
  res.status(200).json({css, html})
}