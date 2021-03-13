export const findById = function(tree, parentId) {
  function searchTree(elem, match) {
    let stack = [],
      node,
      ii
    stack.push(elem)

    while (stack.length > 0) {
      node = stack.pop()
      if (node.id == match) {
        return node
      } else if (node.children && node.children.length) {
        for (ii = 0; ii < node.children.length; ii++) {
          stack.push(node.children[ii])
        }
      }
    }
  }
  if (parentId === null) parentId = 0
  let r = searchTree(tree, parentId)

  return r
}
