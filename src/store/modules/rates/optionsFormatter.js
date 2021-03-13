export const formatOptions = options => {

  let result = options.map(option => {
    const groupName = Object.keys(option)[0]
    const gotOptionGroup = option[groupName]
    const preparedOptionGroup = prepareGroup(gotOptionGroup)

    return {
      [groupName]: preparedOptionGroup
    }
  })

  return result
}

const prepareGroup = (group) => {
  return group.map(item => {
    let tree = {
      label: item.name,
      id: item.id
    }
    if (item.children) tree.children = prepareGroup(item.children)
    return tree
  })
}