import React, { useState } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './store/store'
import { NodeDisplay } from './components/node'
import { findSiblings } from './helpers'
import { NodeItem } from './types/types'
import { CustomForm } from './components/addFrom'
import { EditForm } from './components/editForm'

function App() {
    const dispatch = useAppDispatch()

    const { nodesList } = useAppSelector((state) => state.nodes)

    const siblings = findSiblings('0', nodesList)

    console.log(siblings)

    const [editNode, setEditNode] = useState<NodeItem | null>(null)

    const [isEditing, setIsEditing] = useState(false)
    const [isAdding, setIsAddng] = useState(false)
    const [parentId, setParentId] = useState('0')

    const enterAddSubNode = (parent: string) => {
        setParentId(parent)
    }

    const enterEditMode = (node: NodeItem) => {
        setIsEditing(true)
        setEditNode(node)
    }

    const closeEditMode = () => {
        setIsEditing(false)
        setEditNode(null)
    }

    return (
        <div className="App">
            <p>alive</p>
            {!isEditing && <CustomForm parentId={parentId} />}
            {isEditing && (
                <EditForm
                    selectedNode={editNode}
                    onEditSucces={() => closeEditMode()}
                />
            )}
            {siblings.map((sib) => (
                <NodeDisplay data={sib} deps={0} />
            ))}
        </div>
    )
}

export default App
