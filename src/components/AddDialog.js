import React from "react";
import {
    Dialog,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Button
} from "@material-ui/core";
import {
    Add
} from '@material-ui/icons';

export const AddDialog = ({
    clickAddSwitch, 
    newContent,
    handleChangeModule,
    modalModule
}) => {
    const { open, handleClickOpen, handleClose } = modalModule;
    const { handleChange_blue, handleChange_red, handleChange_title} = handleChangeModule;

    return (
        <>
            <Fab color="secondary" aria-label="edit" onClick={() => handleClickOpen()}>
                <Add />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">新規追加</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="設問"
                        type="text"
                        value={newContent.title}
                        onChange={e => handleChange_title(e)}
                    />
                    <TextField
                        margin="dense"
                        id="red"
                        label="選択肢1"
                        type="text"
                        value={newContent.red}
                        onChange={e => handleChange_red(e)}
                    />
                    <TextField
                        margin="dense"
                        id="blue"
                        label="選択肢2"
                        type="text"
                        value={newContent.blue}
                        onChange={e => handleChange_blue(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => clickAddSwitch()} color="primary">
                        追加
                    </Button>
                    <Button onClick={() => handleClose()} color="secondary">
                        キャンセル
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};