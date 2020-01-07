import React, { useState } from "react";
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
    handleChange_blue, 
    handleChange_red, 
    handleChange_title,
    ...modalModule
}) => {

    return (
        <>
            <Fab color="secondary" aria-label="edit" onClick={modalModule.handleClickOpen}>
                <Add />
            </Fab>
            <Dialog open={modalModule.open} onClose={modalModule.handleClose} aria-labelledby="form-dialog-title">
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
                    <Button onClick={modalModule.handleClose} color="secondary">
                        キャンセル
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};