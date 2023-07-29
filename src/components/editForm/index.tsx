import React, { RefObject, useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../store/store'
import { editNode } from '../../store/slices/nodes'
import { NodeItem } from '../../types/types'

interface Props {
    selectedNode: NodeItem | null
    onEditSucces: () => void
    inputRef: RefObject<HTMLInputElement>
}

interface formData {
    name: string
}

export const EditForm = ({ selectedNode, onEditSucces, inputRef }: Props) => {
    const [updatedTaskName, setUpdatedTaskName] = useState(selectedNode?.name)
    const dispatch = useAppDispatch()

    const { handleSubmit } = useForm<formData>()

    const onSubmit: SubmitHandler<formData> = () => {
        if (selectedNode) {
            dispatch(
                editNode({
                    id: selectedNode.id,
                    parentId: selectedNode.parentId,
                    name: updatedTaskName || '',
                })
            )
            onEditSucces()
        }
    }

    return (
        <form className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    type="text"
                    id="task"
                    className="input"
                    required
                    value={updatedTaskName}
                    onChange={(e) => setUpdatedTaskName(e.target.value)}
                    autoFocus
                    maxLength={20}
                    placeholder="update node"
                    ref={inputRef}
                />
            </div>
            <input type="submit" value="Edit" />
        </form>
    )
}
