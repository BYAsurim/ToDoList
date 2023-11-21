import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onClick: (title: string) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan')
    const [newTaskTitle, setNewTaskTitle] = useState(props.title)
    const [edit, setEdit] = useState(false)
    const activateEditMode = () => {
        setEdit(true)
    }
    const NewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const activateViewMode = () => {
        props.onClick(newTaskTitle)
        setEdit(false)
    }

    return (<>
        {edit ?
            // <input type="text" onChange={NewTaskTitleHandler}
            //        onBlur={activateViewMode}
            //        value={newTaskTitle} autoFocus/>
            <TextField
                variant={'outlined'}
                type="text" onChange={NewTaskTitleHandler}
                onBlur={activateViewMode}
                value={newTaskTitle} autoFocus/>
            :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
        }
    </>);
});
