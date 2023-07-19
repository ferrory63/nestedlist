import React, { useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../store/store'
import { addNode } from '../../store/slices/nodes'
import { NodeItem } from '../../types/types'

type Props = {
    parentId: string
    formerName?: string
}

type IFormData = {
    name: string
}

export const CustomForm = ({ parentId = '0', formerName }: Props) => {
    const [node, setNode] = useState(formerName ? formerName : '')
    const dispatch = useAppDispatch()

    const { handleSubmit } = useForm<IFormData>()

    const onSubmit: SubmitHandler<IFormData> = () => {
        dispatch(
            addNode({
                name: node,
                id: Date.now().toString(),
                parentId: parentId,
            } as NodeItem)
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="wrapper">
                <input
                    type="text"
                    id="task"
                    className="input"
                    required
                    value={node}
                    onChange={(e) => setNode(e.target.value)}
                    autoFocus
                    maxLength={20}
                    placeholder="Enter node name"
                />
            </div>
            <input type="submit" value="Add" />
        </form>
    )
}
