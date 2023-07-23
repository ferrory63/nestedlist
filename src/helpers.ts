import { NodeItem } from './types/types'

export function findSiblings(id: string, parents: NodeItem[]) {
    return parents.filter((i) => i.parentId === id)
}

export function findDescendants(array: NodeItem[], nodeId: string) {
    const descendants: NodeItem[] = []

    function getDescendants(nodeId: string) {
        const children = array.filter((item) => item.parentId === nodeId)
        descendants.push(...children)
        children.forEach((child) => getDescendants(child.id))
    }

    getDescendants(nodeId)

    return descendants
}
