
# Google Sheets Clone - Zeotap Assignment

## Overview  
This is a web application mimicking the core functionalities and user interface of Google Sheets. Developed as part of Zeotap's software engineering intern assignment, the project implements a spreadsheet interface with support for mathematical functions, data quality checks, and user interactions.

---

## Features  

### 1. Spreadsheet Interface  
- **Google Sheets-like UI**: Toolbar, formula bar, and grid-based structure.  
- **Drag and Drop**: Seamless content dragging for cells and formulas.  
- **Dynamic Cell Updates**: Automatic recalculation of dependent cells.  
- **Basic Formatting**: Options for bold, italics, font size, and color.  
- **Row/Column Operations**: Add, delete, and resize rows or columns.

### 2. Mathematical Functions  
- **SUM**: Computes the sum of a range of cells.  
- **AVERAGE**: Calculates the average of a range of cells.  
- **MAX**: Finds the maximum value in a range.  
- **MIN**: Finds the minimum value in a range.  
- **COUNT**: Counts the number of numeric cells in a range.

### 3. Data Quality Functions  
- **TRIM**: Removes leading and trailing whitespaces.  
- **UPPER/LOWER**: Converts text to uppercase or lowercase.  
- **REMOVE_DUPLICATES**: Removes duplicate rows from a selected range.  
- **FIND_AND_REPLACE**: Searches and replaces text within a range.

### 4. Data Entry and Validation  
- **Data Input**: Supports numbers, text, and dates.  
- **Validation**: Ensures numeric cells only accept numbers.

### 5. Bonus Features  
- **Save and Load**: Users can save and reload their spreadsheets.  
- **Data Visualization**: Create charts and graphs from spreadsheet data.  
- **Formula Support**: Handles relative and absolute references.

---

## Tech Stack  

### Frontend  
- **React.js**: For building dynamic and reusable UI components.  
- **Tailwind CSS**: Rapid styling for a responsive and Google Sheets-like design.  

### Backend  
- **Node.js with Express.js**: Handles API requests and serves the application.  
- **MongoDB**: Stores spreadsheet data, including formulas and formatting.

### Testing  
- **Jest**: Unit testing for functions and components.

### Additional Tools  
- **Chart.js**: For data visualization.  
- **dotenv**: Environment variable management.  
- **ESLint & Prettier**: Code quality enforcement.

---

## Installation and Usage  

### Prerequisites  
- Node.js and npm/yarn installed.  
- MongoDB instance (local or remote).  

### Steps  
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/shreyash0019/google-sheets-clone-zeotap-assignment.git
   cd google-sheets-clone-zeotap-assignment
   ```

2. **Environment Setup**  
   Create a `.env` file in the root directory with the following:  
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/google-sheets-clone
   ```

3. **Install Dependencies**  
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

4. **Run the Application**  
   Start the backend:  
   ```bash
   npm start
   ```  
   Start the frontend:  
   ```bash
   npm run dev
   ```  

5. **Access the Application**  
   Open your browser and go to `http://localhost:5173`.

---

## Testing  
To run unit tests for mathematical and data quality functions:  
```bash
npm test
```

---

## Security and Performance Enhancements  
- **Security**:  
  - Input sanitization to prevent XSS attacks.  
  - JWT-based authentication for user sessions.  
- **Performance**:  
  - Virtualized rendering for large datasets.  
  - Dependency caching for efficient formula computations.







