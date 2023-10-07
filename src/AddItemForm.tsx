import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./AddItemForm.module.css";
import {Button, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addTaskHandler: (newTaskTitle: string) => void

}

const AddItemForm = (props: AddItemFormPropsType) => {

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
                {/*<input value={newTaskTitle} onChange={onChangeHandler}*/}
                {/*       onKeyPress={onKeyPressEnter}*/}
                {/*       className={error ? s.errorInput : ''}*/}
                {/*/>*/}
                <TextField
                    variant={'outlined'}
                    value={newTaskTitle} onChange={onChangeHandler}
                    onKeyPress={onKeyPressEnter}
                    error={!!error}

                />
                {/*<button onClick={addTaskHandler}>+</button>*/}
                <Button className={s.button} variant={"contained"} color={'primary'} onClick={addTaskHandler}>+</Button>
                {error &&
                    <div className={s.error}>error</div>
                }

            </div>
        </div>
    );
};

export default AddItemForm;