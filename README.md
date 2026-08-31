# Psychologists.Services

Psychologists.Services is a web application for a company that provides psychological services.

The application allows users to browse psychologists, sort them by different criteria, add psychologists to favorites, view detailed information and reviews, and make an appointment with a selected psychologist.

## Features

- User registration, login and logout
- Firebase Authentication
- Psychologists data stored in Firebase Realtime Database
- Sorting psychologists:
  - A to Z
  - Z to A
  - by price
  - by rating
- Load more functionality
- Add and remove psychologists from favorites
- Favorites are saved for authorized users
- Private Favorites page
- Detailed information about psychologists
- Client reviews
- Appointment form
- Form validation with React Hook Form and Yup
- Responsive design for mobile, tablet and desktop devices

## Technologies

- React
- Vite
- React Router
- Firebase Authentication
- Firebase Realtime Database
- React Hook Form
- Yup
- CSS Modules
- React Hot Toast

## Pages

### Home

The Home page contains the main information about the service and a call-to-action button that redirects users to the Psychologists page.

### Psychologists

The Psychologists page displays psychologist cards and allows users to sort them, view additional information, add psychologists to favorites and make an appointment.

### Favorites

The Favorites page is available only to authorized users and displays psychologists added to favorites.

## Design

[Figma design](https://www.figma.com/file/I5vjNb0NsJOpQRnRpMloSY/Psychologists.Services?type=design&node-id=0-1&mode=design)

## Technical Task

The application was developed according to the provided technical requirements.

Main requirements include:

- Three application pages: Home, Psychologists and Favorites
- User authentication with Firebase
- Firebase Realtime Database
- Psychologist cards
- Sorting functionality
- Load more functionality
- Favorites functionality
- Appointment modal
- Form validation
- Private Favorites route
- Responsive layout from 320px to 1440px

## Getting Started

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Install dependencies:

```bash
npm install
```

Run the project locally:

```bash
npm run dev
```

## Author

Developed by Mikhail
