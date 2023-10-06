import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onClick: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [newTaskTitle, setNewTastTitle] = useState(props.title)
    const [edit, setEdit] = useState(false)
    const activateEditMode = () => {
        setEdit(true)
    }
    const NewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTastTitle(e.currentTarget.value)
    }
    const activateViewMode = () => {
        props.onClick(newTaskTitle)
        setEdit(false)
    }

    return (<>
        {edit ? <input type="text" onChange={NewTaskTitleHandler}
                       onBlur={activateViewMode}
                       value={newTaskTitle} autoFocus/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
        }
    </>);
};
