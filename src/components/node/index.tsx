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
    enterAddSubMode: (id: string) => void
    closeEditMode: () => void
}

export const NodeDisplay = ({
    data,
    indent,
    enterEditMode,
    enterAddSubMode,
    closeEditMode,
}: Props) => {
    const dispatch = useAppDispatch()

    const { id, name } = data

    const { nodesList } = useAppSelector((state) => state.nodes)

    const siblings = findSiblings(id, nodesList)

    return (
        <div style={{ marginLeft: `${(indent * 15).toString()}px` }}>
            <div className="node">
                <div className="node__content">{name}</div>
                <button
                    onClick={() => {
                        dispatch(deleteNode(data))
                        closeEditMode()
                    }}
                >
                    Delete
                </button>
                <button onClick={() => enterEditMode(data)}>Edit</button>
                <button onClick={() => enterAddSubMode(id)}>Add subNode</button>
            </div>
            {siblings && siblings.length
                ? siblings.map((i) => (
                      <NodeDisplay
                          key={i.id}
                          data={i}
                          indent={indent + 1}
                          enterEditMode={() => enterEditMode(i)}
                          enterAddSubMode={enterAddSubMode}
                          closeEditMode={closeEditMode}
                      />
                  ))
                : null}
        </div>
    )
}
