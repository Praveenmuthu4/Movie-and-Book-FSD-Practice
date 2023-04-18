import { useState } from 'react';
import { ColorBox } from "./ColorBox";
import { useReducer } from "react"

const INITIAL_STATE = { count: 10, color: 'pink' }

const reducer = (state, action) => {
    switch (action.type) {
        case "increment":
            return { ...state, count: state.count + 1 };
        case "decrement":
            return { ...state, count: state.count - 1 };
        case "resetToZero":
            return { ...state, count: state.count = action.payload };
        case "updateColour":
            return { ...state, color: state.color = action.payload };
        default:
            return state
    }

}

export function AddColor() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    const style = {
        backgroundColor: state.color
    }
    const [color, setColor] = useState("pink");

    const styles = {
        background: color,
    };

    const [colorlist, setColorList] = useState(['orange', 'crimson', 'pink', 'green']);

    return (
        <div className='colour-game'>
            <div>

                {/* Redux */}
                <input style={style}
                    value={state.color}
                    onChange={(e) => dispatch({ type: "updateColour", payload: e.target.value })} />

                <button onClick={() => dispatch({ type: "increment" })}> + </button>
                Count: {state.count}
                <button onClick={() => dispatch({ type: "decrement" })}> - </button>
                <button onClick={() => dispatch({ type: "resetToZero", payload: 0 })}> 🔃 </button>
            </div>

            {/* useState */}
            <input
                style={styles}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Enter a color"
                value={color} />
            <button className='addcolorbtn' onClick={() => setColorList([...colorlist, color])} variant="contained">Add color</button>
            {colorlist.map(add => <ColorBox color={add} />)}

        </div>
    );
}
