const FloatingButton = (props) => {
  return (
    <div style={{display: props.visible ? 'block' : 'none'}} className={`floating-button ${props.className || ""}`} onClick={props.handleClick} >
      {props.content}
    </div>
  )
}

export default FloatingButton;
