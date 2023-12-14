# Blog Post Website

## Overview

This repository contains the code for a blog post website, developed as part of an assignment. The primary goal was to create a platform with features such as adding, removing, and categorizing posts. Additionally, the project involved implementing user authentication and receiving feedback for iterative improvements.

## Features

- **Add, Remove, and Categorize Posts:** Users can create new blog posts, delete existing posts, and categorize them.
- **Image Upload:** The ability to upload images along with text in blog posts, enhancing visual content.
- **User Authentication:** Utilizes Passport.js and the LocalStrategy for user login, restricting access to the blog page.

## Technologies Used

- **Frontend:** HTML, CSS, EJS (Embedded JavaScript)
- **Backend:** Node.js, Express
- **Database:** SQL (with unique IDs for posts)
- **Middleware:** Passport.js (LocalStrategy for user authentication)
- **Image Handling:** Multer
- **Feedback Incorporation:** Iterative development based on teacher and peer feedback

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Set up the database and configure database connection.
4. Run the application: `npm start`

## Code Overview

- **Blog Routes:** `blogRoutes.js` file contains routes for adding, removing, and categorizing posts.
- **Image Upload:** Utilizes the Multer module to handle image uploads.
- **User Authentication:** Integrates Passport.js with the LocalStrategy for a secure login system.
- **HTML Templates:** EJS templates for rendering dynamic content.

## Feedback and Iterations

Feedback from peers and the teacher played a crucial role in refining the project. Key improvement points were identified, leading to iterative enhancements.

## Improvements

Following feedback, key improvements were made, including:

- Resolving scroll bar issues on login and new post pages.
- Adding more color to the design for a visually appealing experience.
- Improving title boxes and centering the new post button.
- Consistent inclusion of a header and footer for design cohesion.
- Consideration for future integration of a Content Management System (CMS).

## Reflection

The project presented significant challenges, pushing the developer out of their comfort zone. The iterative development process, user authentication, and feedback incorporation enriched the learning experience. The resulting blog post website showcases a blend of technical skills, creativity, and problem-solving.