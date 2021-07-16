import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => {
    return (
        {
            mainContainer: {
                height: "100vh",
                backgroundColor: "rgb(219,234,254)",
                padding: "5px"
            },
            section: {
                // border: "0.5px solid grey",
                width: "29%",
                marginLeft: "1px",
                backgroundColor: "white"
            }
        }
    )
})