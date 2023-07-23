import React, { useRef, useState } from 'react'
import './app.scss'
import { useAppDispatch, useAppSelector } from './store/store'
import { NodeDisplay } from './components/node'
import { findSiblings } from './helpers'
import { NodeItem } from './types/types'
import { CustomForm } from './components/addFrom'
import { EditForm } from './components/editForm'
import { resetNodes } from './store/slices/nodes'

function App() {
    const dispatch = useAppDispatch()

    const { nodesList } = useAppSelector((state) => state.nodes)

    const siblings = findSiblings('0', nodesList)

    const [editNode, setEditNode] = useState<NodeItem | null>(null)

    const [isEditing, setIsEditing] = useState(false)
    const [parentId, setParentId] = useState('0')

    const inputRef = useRef<HTMLInputElement>(null)

    function enterAddSibMode(parent: string) {
        closeEditMode()
        setParentId(parent)
        inputRef.current?.focus()
    }

    const enterEditMode = (node: NodeItem) => {
        setIsEditing(true)
        setEditNode(node)
        inputRef.current?.focus()
    }

    const closeEditMode = () => {
        setIsEditing(false)
        setEditNode(null)
    }

    return (
        <div className="App">
            <div className="component">
                <div className="component__header">
                    <div>
                        {!isEditing && (
                            <CustomForm
                                parentId={parentId}
                                setParentId={setParentId}
                                inputRef={inputRef}
                            />
                        )}
                        {isEditing && (
                            <EditForm
                                selectedNode={editNode}
                                inputRef={inputRef}
                                onEditSucces={() => closeEditMode()}
                            />
                        )}
                    </div>
                    <button onClick={() => dispatch(resetNodes())}>
                        Reset
                    </button>
                </div>

                <div className="component__body">
                    {siblings.map((sib) => (
                        <NodeDisplay
                            key={sib.id}
                            data={sib}
                            indent={0}
                            enterAddSubMode={enterAddSibMode}
                            enterEditMode={() => enterEditMode(sib)}
                            closeEditMode={closeEditMode}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
