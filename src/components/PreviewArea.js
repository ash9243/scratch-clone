import React from "react";
import CatSprite from "./CatSprite";
import Bat from './Bat';
import { Tooltip } from '@material-ui/core';

import * as Constants from "../Common/Constants";
export default function PreviewArea(props) {

    let list = [];

    let [allSprites, setAllSprites] = props.allSprites;

    for (let i = 0; i < allSprites.length; i++) {
        if (allSprites[i] === Constants.CAT_SPRITE) {
            list.push(
                <Tooltip key={Constants.CAT_SPRITE_DIV} title="Hello" placement="right-start">
                    <div
                        style={{ height: "fit-content", width: "fit-content" }}
                        key={Constants.CAT_SPRITE_DIV}
                        onClick={() => props.handleClick(Constants.SUBTYPE_EVENT_SPRITE, Constants.CAT_SPRITE)}
                        id={Constants.CAT_SPRITE_DIV}
                        draggable={true}
                        onDragStart={props.handleSpriteDragStart}
                        onDrag={props.handleSpriteDrag}
                        onDragEnd={props.handleSpriteDragEnd}
                    >
                        <CatSprite handleClick={props.handleClick} />
                    </div>
                </Tooltip>
            )
        }
        else if (allSprites[i] === Constants.BAT_SPRITE) {
            list.push(
                <Tooltip key={Constants.CAT_SPRITE_DIV} title="Hello" placement="right-start">
                    <div
                        style={{ height: "fit-content", width: "fit-content" }}
                        key={Constants.BAT_SPRITE_DIV}
                        onClick={() => props.handleClick(Constants.SUBTYPE_EVENT_SPRITE, Constants.BAT_SPRITE)}
                        id={Constants.BAT_SPRITE_DIV}
                        draggable={true}
                        onDragStart={props.handleSpriteDragStart}
                        onDrag={props.handleSpriteDrag}
                        onDragEnd={props.handleSpriteDragEnd}
                    >
                        <Bat handleClick={props.handleClick} />
                    </div>
                </Tooltip>
            )
        }
    }
    return (
        // <div>
        // { list }
        // </div>

        list
    );
}
