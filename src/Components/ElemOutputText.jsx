import React from "react";

const ElemOutputText = ({state, backgroundColor, color = 'black'}) => {
    return <div className='elem' style={{ backgroundColor: `${backgroundColor}`, color: `${color}` }}>
        <div className='centerBlogForText'>
            {state.length ? state.map((e, index) => <p key={index}>{e.text} {e.count > 1 && ` x${e.count}`} </p>)
                : <p>Нет введенных данных</p>}
        </div>
    </div>
}

export default ElemOutputText;