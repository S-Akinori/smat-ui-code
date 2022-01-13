import { useContext, useEffect, useState } from "react";
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.min.js";
import "prismjs/plugins/toolbar/prism-toolbar.min.js";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js";
import "prismjs/plugins/unescaped-markup/prism-unescaped-markup.min.js";
import "prismjs/plugins/unescaped-markup/prism-unescaped-markup.css";
import { Button } from "@mui/material";
import { ButtonUIState } from "./ButtonUIContainer";

const ButtonCodeArea = () => {
  const {buttons} = useContext(ButtonUIState);
  let htmlArea: HTMLElement | null = null;
  let cssArea: HTMLElement | null = null;
  if(typeof document !== 'undefined') {
    htmlArea = document.getElementById('buttonHTMLArea')
    cssArea = document.getElementById('buttonCSSArea')
  }

  const createButtonCode = async () => {
    if(buttons && htmlArea && cssArea) {
      const res = await fetch('/api/button', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({buttons: buttons})
      })
      const data = await res.json();
      htmlArea.innerHTML = '<!--' +  data.html + '-->';
      cssArea.innerHTML = data.css;

      Prism.highlightElement(htmlArea);
      Prism.highlightElement(cssArea);
    }
  }

  const downloadFile = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if(!href || href === '#') {
      const target = e.currentTarget;
      e.preventDefault();
      const htmlCodeArea = document.querySelector('#htmlCodeArea pre code');
      const cssCodeArea = document.querySelector('#cssCodeArea pre code');
      if(htmlCodeArea && htmlCodeArea.textContent && cssCodeArea && cssCodeArea.textContent) {
        const textdata = [
          {
            text: htmlCodeArea.textContent,
            ext: "html"
          },
          {
            text: cssCodeArea.textContent,
            ext: "css"
          }
        ]
        const res = await fetch('/api/file', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({textdata: textdata})
        });
        const data = await res.json();
        const url = data.url
        console.log(url)
        target.setAttribute('href', url);
        target.click();
      }
    }
  }

  useEffect(() => {
    Prism.highlightAll();
  }, [])

  return (
    <div>
      <Button variant="contained" onClick={createButtonCode}>生成</Button>
      <div style={{padding: "1rem 0"}}>
        <div id="htmlCodeArea" style={{padding: "1rem 0"}}>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div>HTML</div>
            <div><Button href="#" onClick={downloadFile} variant="contained">一括ダウンロード</Button></div>
          </div>
          <pre><code id="buttonHTMLArea" className="language-html"></code></pre>
        </div>
        <div id="cssCodeArea" style={{padding: "1rem 0"}}>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div>CSS</div>
          </div>
          <pre><code id="buttonCSSArea" className="language-css"></code></pre>
        </div>
      </div>
      <iframe width="100%"></iframe>
    </div>
  )
}

export default ButtonCodeArea