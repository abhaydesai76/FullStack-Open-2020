describe ('Blog App', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    let user= {
      'username': 'bkhulla',
      'name': 'Bulla Khulla',
      'password': 'bkhulla'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)

    user= {
      'username': 'pkhote',
      'name': 'Pote Khote',
      'password': 'pkhote'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Blogs')
    cy.contains('Bloglist app, Abhay Desai 2020')
  })


  describe('Login', function () {
    it('login form can be opened', function () {
      cy.contains('Login').click()
    })

    it('fails with wrong credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('bkhulla')
      cy.get('#password').type('bulla')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Bulla Khulla logged in')
    })

    it('succeeds with correct credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('bkhulla')
      cy.get('#password').type('bkhulla')
      cy.get('#login-button').click()

      cy.contains('Bulla Khulla logged in')
    })
  })

  describe('When logged in' , function () {
    beforeEach('', function () {
      cy.login( { username: 'bkhulla', password: 'bkhulla' })
    })

    it('A blog can be created', function () {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('Test Blog 5')
      cy.get('#author').type('Bulla Khulla')
      cy.get('#url').type('http:/Blogs/TestBlog5')
      cy.contains('create').click()
    })

    describe ('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Test Blog 10',author: 'Bulla Khulla',url: 'http://Blogs/TestBlog10',likes: 10 }),
        cy.createBlog({ title: 'Test Blog 15',author: 'Pote Khote',url: 'http://Blogs/TestBlog15',likes: 15 }),
        cy.createBlog({ title: 'Test Blog 20',author: 'Bulla Khulla',url: 'http://Blogs/TestBlog20',likes: 20 })
        cy.createBlog({ title: 'Test Blog 25',author: 'Pote Khote',url: 'http://Blogs/TestBlog25',likes: 25 })
      })

      it('User can like a blog', function () {
        cy.contains('Test Blog 10')
          .get('#hidebutton').click()
          .get('#likebutton').click()
      })

      it('User can delete a blog created by himself', function () {
        cy.contains('Test Blog 10').get('#hidebutton').click()

        cy.contains('Test Blog 10').parent().find('#removebutton').click()
      })

      it('User cannot delete a blog created by someone else', function () {

        cy.contains('Logout').click()

        cy.contains('Login').click()
        cy.get('#username').type('pkhote')
        cy.get('#password').type('pkhote')
        cy.get('#login-button').click()

        cy.contains('Pote Khote logged in')
        cy.contains('Test Blog 15').parent().find('#hidebutton').click()

        cy.contains('Test Blog 15').parent().find('#removebutton').click()
      })

      it.only('Verify that blogs are ordered as per number of likes', function () {        
        cy.get('blogs')
        .then(($blogs) => {
          console.log('form is:', $blogs)          
        })
      })
    })
  })
})