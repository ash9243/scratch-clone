import React from "react";
import CatSprite from "./CatSprite";
import Bat from './Bat';
import { Tooltip, Zoom } from '@material-ui/core';


import * as Constants from "../Common/Constants";
export default function PreviewArea(props) {

    let list = [];

    let [allSprites, setAllSprites] = props.allSprites;

    for (let i = 0; i < allSprites.length; i++) {
        if (allSprites[i] === Constants.CAT_SPRITE) {
            list.push(
                <Tooltip open={props.workingSprite[0] === Constants.CAT_SPRITE && props.TooltipOpen} TransitionComponent={Zoom} leaveDelay={500} key={Constants.CAT_SPRITE_DIV} title="Hello" placement="right-start">
                    <div
                        style={{ height: "fit-content", width: "fit-content" }}
                        onClick={() => props.handleClick(Constants.SUBTYPE_EVENT_SPRITE, Constants.CAT_SPRITE)}
                        id={Constants.CAT_SPRITE_DIV}
                        draggable={true}
                        onDragStart={props.handleSpriteDragStart}
                        onDrag={props.handleSpriteDrag}
                        onDragEnd={props.handleSpriteDragEnd}
                        onMouseEnter={(event) => {
                            event.preventDefault();
                            return false;
                        }}
                    >
                        <CatSprite handleClick={props.handleClick} />
                    </div>
                </Tooltip>
            )
        }
        else if (allSprites[i] === Constants.BAT_SPRITE) {
            list.push(
                <Tooltip open={props.workingSprite[0] === Constants.BAT_SPRITE && props.TooltipOpen} TransitionComponent={Zoom} leaveDelay={500} key={Constants.BAT_SPRITE_DIV} title="Hello" placement="right-start">
                    <div
                        style={{ height: "fit-content", width: "fit-content" }}
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
        <div id="PreviewArea" style={{ height: "100%", width: "100%" }}>
            {list}
        </div>
    );
}
