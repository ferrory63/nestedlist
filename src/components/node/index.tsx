import React from 'react'
import { NodeItem } from '../../types/types'
import { useAppSelector } from '../../store/store'
import { findSiblings } from '../../helpers'

type Props = {
    data: NodeItem
    deps: number
}

export const NodeDisplay = ({ data, deps }: Props) => {
    const { id, name } = data

    const { nodesList } = useAppSelector((state) => state.nodes)

    const siblings = findSiblings(id, nodesList)

    return (
        <>
            <div>{name}</div>
            {siblings &&
                siblings.length &&
                siblings.map((i) => <NodeDisplay data={i} deps={deps + 1} />)}
        </>
    )
}
