export const findById = function(tree, parentId) {
  var index
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

  let r = searchTree(tree, parentId)

  return r
}
