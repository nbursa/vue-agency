import {
  api
} from "@/axios"


export const approveCandidateDocuments = async payload => {
  const {
    userId,
    documentId
  } = payload
  const response = await api.post(`/users/${userId}/compliance/${documentId}/approve`)
}

export const rejectCandidateDocuments = async payload => {
  const {
    userId,
    documentId,
    rejectionReason
  } = payload
  const response = await api.post(`/users/${userId}/compliance/${documentId}/reject`, {
    rejection_reason: rejectionReason
  })
}

export const deleteDocumentFile = async payload => {
  const {
    userId,
    documentId,
    fileId
  } = payload
  const response = await api.delete(`/users/${userId}/compliance/${documentId}`, {
    data: {
      user_files: [{
        id: fileId
      }]
    }
  })
  return response.data
}