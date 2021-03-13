const searchConfig = {
  tabbedNav: [
    {
      id: 1,
      label: "documents.filter_tab_0",
      url: "/documents",
      slug: {
        path: "/documents"
      }
    },
    {
      id: 2,
      label: "documents.filter_tab_1",
      url: "/documents-by-candidate",
      slug: {
        path: "/documents-by-candidate"
      }
    },
    {
      id: 3,
      label: "documents.filter_tab_2",
      url: "/inspect-uploaded-documents",
      slug: {
        path: "/inspect-uploaded-documents"
      }
    }
  ],
  textSearch: {
    paramName: "name",
    placeholder: "global.search_candidate_name"
  },
  tableFilterDisplay: {
    secondColumn: "documents-by-candidate"
  }
}

export default searchConfig
