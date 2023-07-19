import { NodeItem } from './types/types'

export function findSiblings(id: string, parens: NodeItem[]) {
    return parens.filter((i) => i.parentId === id)
}
