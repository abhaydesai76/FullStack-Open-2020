import blogService from '../services/blogService'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG' :
    return [...state, action.data]
  case 'INIT_BLOG' :
    return action.data
  case 'UPDATE_BLOG_LIKES' :
    // eslint-disable-next-line no-case-declarations
    const updateBlogId = action.data.id
    console.log('updateBlogId : ', updateBlogId)

    console.log('state : ', state)
    // eslint-disable-next-line no-case-declarations
    const blogToLike = state.find(i => i.id === updateBlogId)
    console.log('blogToLike inside Reducer : ', blogToLike)
    // eslint-disable-next-line no-case-declarations
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes === undefined ? 1 : blogToLike.likes + 1
    }
    console.log('likedBlog inside Reducer : ' , likedBlog)
    return state.map(blog => blog.id !== updateBlogId ? blog : likedBlog)
  case 'DELETE_BLOG' :
    // eslint-disable-next-line no-case-declarations
    const deleteBlogId = action.data
    console.log('deleteBlogId : ', deleteBlogId)
    console.log('inside DELETE_BLOG :', action.data.deleteResult)
    if (action.data.deleteResult === '')
    {
      // eslint-disable-next-line no-case-declarations
      const remainingBlogs = state.filter(i => i.id !== deleteBlogId.id)
      console.log('remainingBlogs inside reducer : ' , remainingBlogs)
      return remainingBlogs
    }
    else
    {
      return [...state]
      // return [state, { id: deleteBlogId, error: action.data.deleteResult }]
    }
    // return state.filter(i => i.id !== deleteBlogId)
  case 'TOGGLE_VISIBILITY':
    // eslint-disable-next-line no-case-declarations
    const blogId = action.data.id
    // eslint-disable-next-line no-case-declarations
    const blogToShow = state.find(n => n.id === blogId)
    // eslint-disable-next-line no-case-declarations
    const visibleBlog = {
      ...blogToShow,
      visible: !blogToShow.visible
    }
    return state.map(blog => blog.id !== blogId ? blog : visibleBlog) 
  case 'UPDATE_BLOG_COMMENT' :
    const updatecommentBlogId = action.data.id
    console.log('updatecommentBlogId : ', updatecommentBlogId)

    console.log('state : ', state)
    // eslint-disable-next-line no-case-declarations
    const blogToUpateComment = state.find(i => i.id === updatecommentBlogId)
    console.log('blogToUpateComment inside Reducer : ', blogToUpateComment)
    // eslint-disable-next-line no-case-declarations
    const commentedBlog = {
      ...blogToUpateComment,
      comments: blogToUpateComment.comments === undefined ? '' : blogToUpateComment.comments
    }
    console.log('commentedBlog inside Reducer : ' , commentedBlog)
    return state.map(blog => blog.id !== updatecommentBlogId ? blog : commentedBlog)
  default :
    return state
  }
}

export const newBlog = (blogObject) => {

  return async dispatch => {
    const newBlog = await blogService.create(blogObject)

    dispatch({
      type:'NEW_BLOG',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log('blogs inside blogReducer : ', blogs)
    dispatch({
      type: 'INIT_BLOG',
      data: blogs
    })
  }
}

export const updateLikes = (id, blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.updateLikes(id,blog)

    dispatch({
      type:'UPDATE_BLOG_LIKES',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {

  return async dispatch => {
    var deleteResult = await blogService.remove(id)
    console.log('deleteResult inside blogReducer : ', deleteResult)
    dispatch({
      type:'DELETE_BLOG',
      data: { id: id,
        deleteResult: deleteResult }
    })
  }
}

export const updateComment = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.updateComment(blog)
    console.log('updatedBlog inside blogReducer : ', updatedBlog)
    dispatch ({
      type: 'UPDATE_BLOG_COMMENT',
      data: updatedBlog
    })
  }
}

export const showhideVisibilty = (id) => {
  return {
    type: 'TOGGLE_VISIBILITY',
    data: { id }
  }
}

export default blogReducer