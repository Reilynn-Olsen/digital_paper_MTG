type DropDownProps = {dropDown: dropDownObj, clearDropDown: () => void}

function DropDown(Props: DropDownProps){

  const clearDropDown = (e: React.MouseEvent) => {
    if (isParagraphElement(e.target)){
      Props.clearDropDown()
    }
  };

  return(
    <div>
      {Props.dropDown.visible ? <div onClick={clearDropDown} id="dropDown" style={{zIndex: 2, position: 'absolute', top: Props.dropDown.x, left: Props.dropDown.y}}>{Props.dropDown.options.map(el => el)}</div> : null}
    </div>
  )
}

const isParagraphElement = (value: any): value is HTMLParagraphElement => value.tagName === 'P';

export default DropDown