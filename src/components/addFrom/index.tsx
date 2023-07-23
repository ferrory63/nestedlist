import React, { RefObject, useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../store/store'
import { addNode } from '../../store/slices/nodes'
import { NodeItem } from '../../types/types'

type Props = {
    parentId: string
    setParentId: (parent: string) => void
    inputRef: RefObject<HTMLInputElement>
}

type formData = {
    name: string
}

export const CustomForm = ({
    parentId = '0',
    inputRef,
    setParentId,
}: Props) => {
    const [node, setNode] = useState('')
    const dispatch = useAppDispatch()

    const { handleSubmit } = useForm<formData>()

    const onSubmit: SubmitHandler<formData> = () => {
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
                ref={inputRef}
            />
            <input type="submit" value="Add" />
        </form>
    )
}
