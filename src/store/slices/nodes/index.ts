import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NodeItem } from '../../../types/types'

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
        deleteNode(state, action: PayloadAction<string>) {
            state.nodesList = state.nodesList.filter(
                (item) => item.id !== action.payload
            )
        },
        resetNodes(state) {
            state.nodesList = []
        },
    },
})

export const { addNode, deleteNode, editNode, resetNodes } = nodesSlice.actions

export default nodesSlice.reducer
