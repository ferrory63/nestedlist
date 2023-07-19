import React from 'react'
import { NodeItem } from '../../types/types'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { findSiblings } from '../../helpers'
import { deleteNode } from '../../store/slices/nodes'

import './style.scss'

type Props = {
    data: NodeItem
    indent: number
    enterEditMode: (node: NodeItem) => void
    setParent: (id: string) => void
}

export const NodeDisplay = ({
    data,
    indent,
    enterEditMode,
    setParent,
}: Props) => {
    const dispatch = useAppDispatch()

    const { id, name } = data

    const { nodesList } = useAppSelector((state) => state.nodes)

    const siblings = findSiblings(id, nodesList)

    return (
        <div style={{ paddingLeft: `${indent * 5}px` }}>
            <div className="node">
                <div className="node__content">{name}</div>
                <button onClick={() => dispatch(deleteNode(id))}>Delete</button>
                <button onClick={() => enterEditMode(data)}>Edit</button>
                <button onClick={() => setParent(id)}>Add subNode</button>
            </div>
            {siblings && siblings.length
                ? siblings.map((i) => (
                      <NodeDisplay
                          data={i}
                          indent={indent + 1}
                          enterEditMode={() => enterEditMode(i)}
                          setParent={() => setParent(i.id)}
                      />
                  ))
                : null}
        </div>
    )
}
