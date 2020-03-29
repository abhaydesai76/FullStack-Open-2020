import React from 'react';
import './index.css';

const Course = ({ courses }) => {
    return (
        <div>            
            <h1>Web Development Curriculam</h1>
            <ul>
            {courses.map(course =>             
                <li key={course.name} >                    
                    <Header course={course} />
                    <Content course={course} />
                    <b>total of <Total course={course} /> exercises</b>
                </li>
                )}
            </ul>                            
        </div>    
    )}
  
const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {    
    var totalExercises = course.parts.reduce(function(sum,part) {
            return sum + part.exercises
    }, 0 )
    
    return totalExercises
}

const Content = ({ course }) => {
  return (
    <div> 
        <ul>
            {course.parts.map(part => 
                <li key={part.id}>{part.name} {part.exercises}</li>)}
        </ul>      
    </div>
  )
}

export default Course;