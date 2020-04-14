import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'JEST testing of displaying title',
    author: 'JEST testing of displaying author'
  }

  const component = render (
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('JEST testing of displaying title')
  expect(component.container).toHaveTextContent('JEST testing of displaying author')
})

test('clicking the button two times calls event handler twice', () => {
  const blog = {
    title: 'JEST testing of displaying title',
    author: 'JEST testing of displaying author',
    url: 'JEST testing of displaying url',
    likes: 'JEST testing of displaying likes'
  }

  const mockHandler = jest.fn()

  const component = render (
    <Blog blog={blog} updateBlogLikes={mockHandler} />
  )

  const button = component.getByText('updateLikes')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

})