import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NodeItem } from '../../../types/types'
import { findDescendants } from '../../../helpers'

type INodeItemsSliceState = {
    nodesList: NodeItem[]
}

const initialState: INodeItemsSliceState = {
    nodesList: [],
}

const nodesSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        addNode(state, action: PayloadAction<NodeItem>) {
            state.nodesList = [...state.nodesList, action.payload]
        },
        editNode(state, action: PayloadAction<NodeItem>) {
            const selectedNode = state.nodesList.find(
                (obj) => obj.id === action.payload.id
            )
            if (selectedNode) {
                selectedNode!.name = action.payload.name
            }
        },
        deleteNode(state, action: PayloadAction<NodeItem>) {
            const desc = findDescendants(state.nodesList, action.payload.id)

            function filterArrayById(state: NodeItem[], desc: NodeItem[]) {
                const idsToRemove = new Set(desc.map((item) => item.id))
                return state.filter((item) => !idsToRemove.has(item.id))
            }

            state.nodesList = filterArrayById(state.nodesList, desc)
            state.nodesList = state.nodesList.filter((item) =>
                desc.find((i) => i === item)
            )
        },
        resetNodes(state) {
            state.nodesList = []
        },
    },
})

export const { addNode, deleteNode, editNode, resetNodes } = nodesSlice.actions

export default nodesSlice.reducer
