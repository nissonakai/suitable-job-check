import React from "react";
import {
    Dialog,
    TextField,
    MenuItem,
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
    editSurvey,
    handleChange,
    modalModule,
    categories
}) => {
    const { open, handleClickOpen, handleClose } = modalModule;

    return (
        <>
            <Fab color="secondary" aria-label="edit" onClick={() => handleClickOpen()}>
                <Add />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">新規追加</DialogTitle>
                <DialogContent>
                    {editSurvey ? (
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="タイトル"
                            type="text"
                            value={newContent.name}
                            onChange={e => handleChange(e)}
                    />
                    ) : (
                    <>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="設問"
                        type="text"
                        value={newContent.title}
                        onChange={e => handleChange(e)}
                    />
                    <TextField
                        name="category"
                        select
                        label="カテゴリ"
                        type="number"
                        value={newContent.category}
                        onChange={e => handleChange(e)}
                        fullWidth
                    >
                        {categories.filter(category => category.value !== 0).map(category => (
                            <MenuItem
                                key={category.value}
                                value={category.value}
                            >
                                {category.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    </>
                    )}
                    
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => clickAddSwitch()}
                        color="primary"
                    >
                        追加
                    </Button>
                    <Button
                        onClick={() => handleClose()}
                        color="secondary"
                    >
                        キャンセル
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};