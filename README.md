# User Management Dashboard

## 1. Project Title
**User Management Dashboard**

## 2. Project Overview
This project is a modern, responsive web application that allows users to view, add, edit, delete, search, filter, sort, and paginate user records. It interfaces with a mock backend API (JSONPlaceholder) and uses local state and `localStorage` to simulate persistence for CRUD operations.



## 3. Features
- **CRUD Operations**: Add, Edit, and Delete users with form validations.
- **Data Display**: Clean, responsive table displaying ID, First Name, Last Name, Email, and Department.
- **Advanced Data Handling**:
  - **Pagination**: Supports 10, 25, 50, and 100 rows per page.
  - **Filtering**: Multi-field filtering modal (First Name, Last Name, Email, Department).
  - **Sorting**: Ascending and descending sort on all columns.
  - **Global Search**: Search across all fields simultaneously.
- **Simulated Persistence**: Uses `localStorage` to persist added, edited, and deleted users across page reloads.
- **UI/UX**: 
  - Modern aesthetics using Tailwind CSS.
  - Dark mode support (persisted via localStorage).
  - Toast notifications for user actions.
  - Custom loaders and empty states.
  - fully responsive design (Mobile, Tablet, Desktop).

## 4. Tech Stack
- **Frontend Framework**: React 18, Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Testing**: Vitest, React Testing Library

## 5. Installation

1. Clone the repository from GitHub:
   ```bash
   git clone <your-github-repo-url>
   cd user-management-dashboard
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

## 6. Running Locally

To start the development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

## 7. Folder Structure

```
user-management-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── UserTable.jsx
│   │   ├── UserFormModal.jsx
│   │   ├── FilterModal.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Pagination.jsx
│   │   ├── Loader.jsx
│   │   ├── ErrorState.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ConfirmDeleteModal.jsx
│   │   ├── Toast.jsx
│   │   └── ThemeToggle.jsx
│   ├── hooks/
│   │   ├── useUsers.js
│   │   └── useLocalStorage.js
│   ├── services/
│   │   └── userService.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── validation.js
│   │   └── storage.js
│   ├── tests/
│   │   ├── validation.test.js
│   │   ├── filtering.test.js
│   │   └── sorting.test.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 8. API Details
The application uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) for mocking backend data.
- **GET**: Fetches the initial list of users.
- **POST/PUT/DELETE**: API calls are made and awaited, but because JSONPlaceholder does not persist these changes, the app handles the state update locally and stores changes in `localStorage` to simulate persistence.

## 9. Assumptions
- Since the API does not provide a `department` field, it is assigned cyclically from a predefined list.
- Since the API provides a single `name` field, it is split into `firstName` and `lastName` (assuming the first word is the first name and the rest is the last name).
- Local storage is used to maintain a delta of changes (added, edited, deleted) that is applied on top of the fresh API data on every reload.

## 10. Challenges Faced
- **Simulating Persistence**: JSONPlaceholder resets data, so creating a robust mechanism to merge fresh API data with local overrides without losing the "mock API" feel was complex.
- **Complex Filtering & Pagination Sync**: Ensuring that pagination resets to page 1 appropriately when filters or search queries change.

## 11. Future Improvements
- Implement a real backend with an actual database.
- Add debouncing to the global search to reduce re-renders.
- Add more comprehensive E2E tests using Cypress or Playwright.

## 12. Testing
Run the test suite using Vitest:
```bash
npm run test
```
The test suite covers:
- Form validation logic.
- Filtering logic.
- Sorting logic.

## 13. Deployment steps
1. Build the project for production:
   ```bash
   npm run build
   ```
2. The compiled assets will be in the `dist` folder.
3. Deploy the `dist` folder to your preferred hosting provider (e.g., Vercel, Netlify, GitHub Pages).

For example, to deploy to Vercel:
```bash
npm i -g vercel
vercel
```

## 14. Author

**Shubham Raj Chauhan**<br>
B.E. – Electronics and Communication Engineering (ECE)<br>
Bangalore Institute of Technology (BIT), Bangalore

📧 Email: shubhamrajchauhan07@gmail.com<br>
📍 Location: Bangalore, Karnataka, India

## 15. Thank You

Thank you for reviewing this project.

This User Management Dashboard demonstrates my understanding of modern frontend development using React, including REST API integration, CRUD operations, responsive UI development, client-side validation, local storage management, state handling, testing, and clean component-based architecture.

This project reflects my ability to build scalable, maintainable, and user-friendly web applications while following industry-standard development practices.

I sincerely appreciate your time and consideration.
