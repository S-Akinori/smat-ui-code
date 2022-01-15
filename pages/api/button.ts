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

const createPreview = ({html = '', css = ''}) => {
  const previewHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/toolbar/prism-toolbar.min.css" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/unescaped-markup/prism-unescaped-markup.min.css" rel="stylesheet" />
  </head>
  <body style="font-size: 50px">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/components/prism-core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/autoloader/prism-autoloader.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/toolbar/prism-toolbar.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/unescaped-markup/prism-unescaped-markup.min.js"></script>
    <div>
      <div>HTML</div>
      <pre><code class="language-html"><!--${html}--></code></pre>
    </div>
    <div>
      <div>CSS</div>
      <pre><code class="language-css">${css}</code></pre>
    </div>
  </body>
  </html>
  `
  return previewHtml;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { buttons } = req.body
  let html = createHtml(buttons);
  let css = createCss(buttons);
  const previewHtml = createPreview({html: html, css: css})
  res.status(200).json({css, html, previewHtml})
}