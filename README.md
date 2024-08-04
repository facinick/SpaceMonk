# Spacemonk

[![MIT License](https://img.shields.io/github/license/facinick/SpaceMonk)](https://github.com/facinick/SpaceMonk/blob/main/LICENSE)
[![RedwoodJS](https://img.shields.io/badge/RedwoodJS-Full%20Stack%20Web%20Framework-ff7f00)](https://redwoodjs.com/)

Spacemonk is a full-featured blogging platform built with the power of RedwoodJS and TypeScript. It showcases a variety of features including authentication/authorization, rich text editing, dynamic themes, and more.

## Demo and Screenshots

<img width="1418" alt="Screenshot 2024-08-04 at 5 52 17 PM" src="https://github.com/user-attachments/assets/09630457-98aa-4f02-b3e0-53fc38d7ef01">

<img width="1424" alt="Screenshot 2024-08-04 at 5 51 29 PM" src="https://github.com/user-attachments/assets/accd1de6-8514-42f4-8b42-4fdb819f4795">

<img width="1424" alt="Screenshot 2024-08-04 at 5 51 53 PM" src="https://github.com/user-attachments/assets/33330a49-83bf-4454-8af6-c705ceee658a">

[Demo Video](https://drive.google.com/file/d/11BX3gyq3-NcZUvX_38FSFQrafNvniNaO/view?usp=sharing)

## Features

1. **Authentication / Authorization**
   - Admin dashboard to monitor all online users via GraphQL polling.
   - Regular users can create, view, and edit blog posts.
   - All users can log in using username and password.
   - Authorization checks for user permissions (e.g., deleting posts).

2. **Rich Text Editor**
   - Create blog posts with rich content using Tiptap editor.
   - Add header images with validation for content type.
   - Include tags, titles, and other rich content.

3. **Dynamic Themes**
   - Switch between numerous themes categorized as light, dark, and merryweather.
   - Cycle through themes using the '`' key press.

4. **Tag-Based Post Viewing**
   - Users can view posts filtered by tags.

5. **Automatic Image Generation**
   - If no image URL is provided, a placeholder image is added.
   - A job is scheduled to apply an image URL from Unsplash automatically.

6. **User Requests**
   - Regular users can send requests/messages to the admin.

7. **GraphQL Backend**

8. **State Management**
   - Global state managed by Zustand.
   - Local state managed by React useState.

9. **Follow/Unfollow**
   - Users can follow or unfollow other users.
   - User profiles display created posts.

10. **Comments and Replies**
    - Users can comment on posts and reply to other comments.

11. **Voting**
    - Upvote/downvote functionality for posts and comments.

12. **Responsiveness**
    - The web app is responsive and works seamlessly on mobile, tablet, and desktop devices.

13. **Pagination**
    - Cursor-based pagination for browsing blog posts.

14. **Routing**
    - Various pages including login, signup, profile, tags, blog, etc.

## Tech Stack

- **Frontend:** ReactJS, Tailwind CSS, DaisyUI
- **Backend:** Typescript, GraphQL, Prisma ORM, PostgreSQL
- **State Management:** Zustand, React useState
- **Rich Text Editor:** Tiptap
- **Job Queue:** Bull for Redis
- **Authentication:** JWT
- **Image Generation:** Unsplash API

## Installation

To get started with Spacemonk, follow these steps:

Clone the repository:
   ```bash
   git clone https://github.com/facinick/SpaceMonk.git
   cd SpaceMonk
   ```
Install dependencies:

```bash
yarn install
```
Run the development server:

```bash
yarn rw dev
```

Author
Created by facinick.

Contribution
Feel free to open issues or submit pull requests for any improvements or bug fixes. Purpose of this repository was to learn various components in full stack coming together.
