import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseURL)
    console.log('getAll :' , response.data)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0}

    const response = await axios.post(baseURL, object)

    return response.data
}

const updateVotes = async (anecdoteId, content, votes) => {
    const object = { anecdoteId, content, votes}
    console.log('object : ', object)
    const response = await axios.put(baseURL + "/" + anecdoteId, object)
    console.log('response : ', response)
    return response.data
}

export default { getAll, createNew, updateVotes }