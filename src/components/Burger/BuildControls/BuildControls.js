import React from 'react';
import classes from './BuildControls.css';
import ButtonControl from './BuildControl/BuildControl';

const controls =  [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
    return (
        <div className = {classes.BuildControls}>
            <p>Current Price: <strong>{props.price}</strong></p>
            {controls.map( control => <ButtonControl
                    key={control.label}
                    added = {() => props.ingredientAdded(control.type)}
                    removed = {() => props.ingredientRemoved(control.type)}
                    disabled={props.disabledInfo[control.type]}
                    label={control.label}/>
            )}
            <button
                className = {classes.OrderButton}
                disabled = {!props.purchasable}
                onClick = {props.purchasing}>
                ORDER NOW
            </button>
        </div>
    )
};

export default buildControls;