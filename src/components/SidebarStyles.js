import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => {
    let block = {
        padding: "10px",
        margin: "5px",
        fontSize: "14px",
        width: "fit-content",
        color: "white",
        cursor: "pointer"
    }
    return ({
        block,
        eventBlock: {
            ...block,
            backgroundColor: "rgb(245,158,11)"
        },
        motionBlock: {
            ...block,
            backgroundColor: "rgba(59,130,246)"
        },
        looksBlock: {
            ...block,
            backgroundColor: "rgba(119, 77, 203)"
        },
        controlsBlock: {
            ...block,
            backgroundColor: "rgba(46, 142, 184)"
        },
        flagIcon: {
            ...block,
            color: "rgba(5,150,105)",
            padding: "10px 40px",
            backgroundColor: "rgb(245,158,11)"
        },
        iconButton: {
            borderRadius: "50%",
            height: "100px",
            width: "100px"
        },
        dialogIcon: {
            border: "1px solid gray",
            borderRadius: "10%",
            margin: "10px",
            cursor: "pointer"
        },
    });
});