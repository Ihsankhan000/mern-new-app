import React from 'react';
import styled from 'styled-components';

// Styled components
const AboutContainer = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const AboutHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const AboutParagraph = styled.p`
  font-size: 16px;
  margin-bottom: 15px;
`;

const About = () => {
  return (
    <AboutContainer>
      <AboutHeader>About the To-Do List App</AboutHeader>
      <AboutParagraph>
        The To-Do List App is a simple and intuitive tool designed to help you manage your tasks and stay organized.
      </AboutParagraph>
      <AboutParagraph>
        With this app, you can easily add, update, and remove tasks as you complete them. It provides a clean and user-friendly interface to enhance your productivity.
      </AboutParagraph>
      <AboutParagraph>
        Whether you're a student, professional, or just someone who wants to keep track of their daily tasks, the To-Do List App is here to simplify your life.
      </AboutParagraph>
      <AboutParagraph>
        Start managing your tasks efficiently today with the To-Do List App!
      </AboutParagraph>
    </AboutContainer>
  );
};

export default About;
