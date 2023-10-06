import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./Todolist.module.css";

type AddItemFormPropsType = {
    addTaskHandler: (newTaskTitle:string)=> void

}

const AddItemForm  = (props:AddItemFormPropsType) => {

    const [newTaskTitle, setNewTastTitle] = useState('')
    const [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e) {
            setNewTastTitle(e.currentTarget.value)
        }
    }
    const addTaskHandler = () => {
        if(newTaskTitle.trim() !== ''){
        props.addTaskHandler(newTaskTitle)
        setNewTastTitle('')
        }else {
            setError('error')
        }
    }
    const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== ''){
            setError('')
        }

        if (e.charCode === 13) {
           addTaskHandler()
        }
    }

    return (
        <div>
            <div>
                <input value={newTaskTitle} onChange={onChangeHandler}
                       onKeyPress={onKeyPressEnter}
                       className={error ? s.errorInput : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error &&
                    <div className={s.error}>error</div>
                }

            </div>
        </div>
    );
};

export default AddItemForm;