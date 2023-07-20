import React, { useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../store/store'
import { addNode } from '../../store/slices/nodes'
import { NodeItem } from '../../types/types'

type Props = {
    parentId: string
    setParentId: (parent: string) => void
}

type IFormData = {
    name: string
}

export const CustomForm = ({
    parentId = '0',

    setParentId,
}: Props) => {
    const [node, setNode] = useState('')
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
        setParentId('0')
        setNode('')
    }

    return (
        <form className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                id="task"
                className="input"
                required
                value={node}
                onChange={(e) => setNode(e.target.value)}
                maxLength={20}
                placeholder="Enter node name"
            />
            <input type="submit" value="Add" />
        </form>
    )
}
