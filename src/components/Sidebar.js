import React, { useState } from "react";
import { Grid, IconButton, Dialog, DialogContent, DialogTitle, Button, DialogActions } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import FlagIcon from '@material-ui/icons/Flag';


import * as Constants from "../Common/Constants";
import { useStyles } from './SidebarStyles';
import CatSprite from "./CatSprite";
import Bat from './Bat';

const tagsProps = (classes, props) => {
    let eventListeners = {
        draggable: true,
        onDragStart: props.handleDragStart,
        onDrag: props.handleDrag,
        onDragEnd: props.handleDragEnd
    }
    return ({
        motionBlockProps: {
            ...eventListeners,
            item: true,
            className: `${classes.motionBlock} draggable`
        },
        eventBlockProps: {
            ...eventListeners,
            item: true,
            className: classes.eventBlock + " draggable"
        },
        looksBlockProps: {
            ...eventListeners,
            item: true,
            className: classes.looksBlock + " draggable"
        },
        controlsBlockProps: {
            ...eventListeners,
            item: true,
            className: classes.controlsBlock + " draggable"
        },
        headerText: {
            container: true,
            item: true,
            className: classes.headerText
        },
        blockContainer: {
            container: true,
            item: true,
            direction: "column"
        },
        spriteProps: {
            item: true,
            container: true,
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
            className: classes.dialogIcon
        },
        flagIconProps: {
            className: classes.flagIcon
        }
    })

}

const tagNames = () => {
    let flagClicked = Constants.TYPE_EVENT + ":" + Constants.SUBTYPE_EVENT_FLAG;
    let spriteClicked = Constants.TYPE_EVENT + ":" + Constants.SUBTYPE_EVENT_SPRITE;
    let motionLinear = Constants.TYPE_MOTION + ":" + Constants.SUBTYPE_MOTION_LINEAR;
    let rotateAnticlockwise = Constants.TYPE_MOTION + ":" + Constants.SUBTYPE_MOTION_ROTATE_ANTICLOCKWISE;
    let rotateClockwise = Constants.TYPE_MOTION + ":" + Constants.SUBTYPE_MOTION_ROTATE_CLOCKWISE;
    let sayHello = Constants.TYPE_LOOKS + ":" + Constants.SUBTYPE_LOOKS_HELLO;
    let wait = Constants.TYPE_CONTROLS + ":" + Constants.SUBTYPE_CONTROLS_WAIT;
    return {
        flagClicked,
        spriteClicked,
        motionLinear,
        rotateAnticlockwise,
        rotateClockwise,
        sayHello,
        wait,
    }
}
export default function Sidebar(props) {

    const classes = useStyles();

    const [open, setopen] = useState(false);

    const { motionBlockProps, eventBlockProps, looksBlockProps, controlsBlockProps, headerText, blockContainer, spriteProps, flagIconProps } = tagsProps(classes, props);

    const {
        flagClicked,
        spriteClicked,
        motionLinear,
        rotateAnticlockwise,
        rotateClockwise,
        sayHello,
        wait
    } = tagNames();

    const handleClose = () => {
        setopen(false);
    }

    const getSprite = () => {
        let [allSprites, setAllSprites] = props.allSprites;
        let list = [];
        for (let i = 0; i < allSprites.length; i++) {
            if (allSprites[i] === Constants.CAT_SPRITE) {
                list.push(
                    <Grid
                        key="cat"
                        container
                        item
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={props.workingSprite[0] === Constants.CAT_SPRITE ?
                            { opacity: 1, width: "fit-content" }
                            : { width: "fit-content", opacity: 0.4 }
                        }>

                        <Grid item onClick={() => {
                            props.workingSprite[1](Constants.CAT_SPRITE)
                        }}> <CatSprite /></Grid>
                        <Grid item><Button
                            onClick={() => {
                                setAllSprites(allSprites.filter((sprite) => {
                                    return (sprite !== Constants.CAT_SPRITE)
                                }))
                            }}
                        >Remove</Button></Grid>
                    </Grid>
                )
            }
            else if (allSprites[i] === Constants.BAT_SPRITE) {
                list.push(
                    <Grid
                        key="bat"
                        container
                        item
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={
                            props.workingSprite[0] === Constants.BAT_SPRITE ?
                                { opacity: 1, width: "fit-content" }
                                : { width: "fit-content", opacity: 0.4 }
                        }>

                        <Grid item
                            onClick={() => {
                                props.workingSprite[1](Constants.BAT_SPRITE)
                            }}
                        > <Bat /></Grid>
                        <Grid item><Button onClick={() => {
                            setAllSprites(allSprites.filter((sprite) => {
                                return (sprite !== Constants.BAT_SPRITE)
                            }))
                        }}>Remove</Button></Grid>
                    </Grid>
                )
            }
        }

        return list;
    }

    const handleSpriteClicked = (type) => {
        let allSprites = [...props.allSprites[0]];
        for (let i = 0; i < allSprites.length; i++) {
            if (allSprites[i] === type) {
                alert('Already present');
                return;
            }
        }
        allSprites.push(type);
        props.allSprites[1](allSprites);
        props.workingSprite[1](type);
        handleClose();
    }

    return (
        <Grid container direction="column" style={{ height: "100%", width: "100%" }}>
            <Grid {...headerText}>Events</Grid>
            <Grid {...blockContainer}>
                <Grid key="E:F:0" id="E:F:0" name={flagClicked} value="" {...eventBlockProps}>
                    When Flag Clicked
                </Grid>

                <Grid key="E:S:0" id="E:S:0" name={spriteClicked} value="" {...eventBlockProps}>
                    When Sprite Clicked
                </Grid>

            </Grid>
            <Grid {...headerText}>Motions</Grid>
            <Grid {...blockContainer}>
                <Grid key="M:L:0" id="M:L:0" {...motionBlockProps} name={motionLinear} value="10">Move 10 steps</Grid>
                <Grid key="M:RA:0" id="M:RA:0" {...motionBlockProps} name={rotateAnticlockwise} value="15">Move anti 15</Grid>
                <Grid key="M:RC:0" id="M:RC:0" {...motionBlockProps} name={rotateClockwise} value="15">Move clock 15</Grid>
            </Grid>
            <Grid {...headerText}>Looks</Grid>
            <Grid {...blockContainer}>
                <Grid key="L:H:0" id="L:H:0" {...looksBlockProps} name={sayHello} value="">Say Hello</Grid>
            </Grid>

            <Grid {...headerText}>Controls</Grid>
            <Grid {...blockContainer}>
                <Grid key="C:W:0" id="C:W:0" {...controlsBlockProps} name={wait} value="5">Wait 5 sec</Grid>
            </Grid>

            <Grid {...headerText}>Flag</Grid>
            <Grid {...blockContainer}>
                <Grid onClick={() => {
                    props.handleClick(Constants.SUBTYPE_EVENT_FLAG, "")
                }} key="FlagToBeClicked" id="FlagToBeClicked" {...flagIconProps} ><FlagIcon /></Grid>
            </Grid>

            <Grid {...headerText}>Sprite</Grid>
            <Grid container item>
                <Grid container>
                    <Grid item xs={10} style={{ display: "flex" }}>
                        {getSprite()}
                    </Grid>

                    <Grid item xs={2}>
                        <IconButton onClick={() => {
                            setopen(true);
                        }} className={classes.IconButton}>
                            <PetsIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Select Sprite
                </DialogTitle>

                <DialogContent>
                    <Grid container>
                        <Grid onClick={() => {
                            handleSpriteClicked(Constants.CAT_SPRITE);
                        }}
                            {...spriteProps}
                        >
                            <CatSprite />
                            cat
                        </Grid>

                        <Grid
                            onClick={() => {
                                handleSpriteClicked(Constants.BAT_SPRITE);
                            }}
                            {...spriteProps}
                        >
                            <Bat />
                            bat
                        </Grid>


                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}


