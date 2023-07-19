import React, { useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../store/store'
import { editNode } from '../../store/slices/nodes'
import { NodeItem } from '../../types/types'

interface EditFormProps {
    selectedNode: NodeItem | null
    onEditSucces: () => void
}

interface IFormData {
    name: string
}

export const EditForm: React.FC<EditFormProps> = ({
    selectedNode,
    onEditSucces,
}) => {
    const [updatedTaskName, setUpdatedTaskName] = useState(selectedNode?.name)
    const dispatch = useAppDispatch()

    const { handleSubmit } = useForm<IFormData>()

    const onSubmit: SubmitHandler<IFormData> = () => {
        if (selectedNode) {
            dispatch(
                editNode({
                    id: selectedNode.id,
                    parentId: selectedNode.parentId,
                    name: updatedTaskName,
                } as NodeItem)
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
                />
            </div>
            <input type="submit" value="Edit" />
        </form>
    )
}
