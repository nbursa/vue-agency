export const getAttributeValues = (state) => {
  let results = []
  state.attributes.map((item) => {
    results = results.concat(item.values)
  })
  return results
}

export const getAttributesWithChildren = ({ attributes }) => {
  const results = attributes.map(({ id, values, name }) => {
    return {
      id: `parent-${id}`,
      name,
      attributeValues: values
    }
  })
  return results
}
