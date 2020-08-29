import numeral from "numeral";
import React from "react";

export const DisplayCount = (props) => {
    return <span>{numeral(props.children).format('0a')}</span>
}