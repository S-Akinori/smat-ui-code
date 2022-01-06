import styles from './index.module.css'

interface Props {
  children: string
  type: string
  style? : {
    background? : string,
    color? : string,
    borderColor? : string,
    radius? : string,
    duration? : string
  }
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement> | undefined
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Button = ({children, type = "default", style = {}, onClick = undefined, onMouseOver = undefined, onMouseLeave = undefined}: Props) => {
  let classes = `${styles.button}`;
  const buttonStyle = {
    background: style.background,
    color: style.color,
    borderColor: style.borderColor,
    borderRadius: style.radius,
    transitionDuration: style.duration,
  }
  if(type) {
    classes += ` ${styles[type]}`;
  }
  return (
    <>
      <style jsx>{`
        button:hover {
          ${type === 'outline' ? `background: ${buttonStyle.borderColor}` : ''};
        }
      `}</style>
      <button 
        className={classes}
        style={buttonStyle}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </button>
    </>
  )
}

export default Button