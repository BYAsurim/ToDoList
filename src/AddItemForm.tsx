import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addTaskHandler: (newTaskTitle: string) => void
    disabled?: boolean
}
const AddItemForm = memo((props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTastTitle] = useState('')
    const [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e) {
            setNewTastTitle(e.currentTarget.value)
        }
    }
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTaskHandler(newTaskTitle)
            setNewTastTitle('')
        } else {
            setError('error')
        }
    }
    const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== '') {
            setError('')
        }

        if (e.charCode === 13) {
            addTaskHandler()
        }
    }

    return (
        <div>
            <div>
                <TextField
                    disabled={props.disabled}
                    variant={'outlined'}
                    value={newTaskTitle} onChange={onChangeHandler}
                    onKeyPress={onKeyPressEnter}
                    label={'Write title'}
                    error={!!error}
                />
                <IconButton
                    onClick={addTaskHandler}
                    disabled={props.disabled}
                    color={'primary'}>
                    <AddBox/>
                </IconButton>
            </div>
        </div>
    );
})

export default AddItemForm;