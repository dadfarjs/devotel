# Devotel

## Overview

Devotel is a React-based project built using Vite, TypeScript, and Material-UI. It utilizes Redux Toolkit for state management and React Query for data fetching.

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (latest LTS recommended)
- npm or yarn

### Installation

Clone the repository and install dependencies:

```sh
# Clone the repository
git clone https://github.com/dadfarjs/devotel.git
cd devotel

# Install dependencies
npm install  # or yarn install
```

### Development Server

To start the development server, run:

```sh
npm run dev  # or yarn dev
```

This will launch the application in development mode.

### Building for Production

To build the application, use:

```sh
npm run build  # or yarn build
```

This will generate the production-ready files in the `dist` directory.

### Linting

To check for linting issues, run:

```sh
npm run lint
```

### Preview Build

To preview the production build:

```sh
npm run preview
```

## API Usage Details

The application interacts with APIs using Axios. Requests are managed through React Query for caching and synchronization.

### Example API Request

A sample API call to fetch data:

```ts
import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get("/api/data");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
```

## Assumptions Made

- The project is intended to be used with a REST API.
- The application is designed to be modular, making use of React components and hooks.
- TypeScript is used for type safety and better maintainability.
- ESLint is configured for code quality enforcement.

## Dependencies

Key dependencies used in this project include:

- **React 19**: UI library
- **Vite**: Fast build tool
- **Material-UI**: UI components
- **React Hook Form**: Form handling
- **Redux Toolkit**: State management
- **React Query**: API data fetching and caching
- **React Router**: Routing

## License

This project is licensed under the MIT License.
