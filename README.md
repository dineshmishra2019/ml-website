# ML Playground

A user-friendly, web-based interface for experimenting with common machine learning algorithms. Upload your own CSV dataset, select a model, and instantly see a simulated analysis and prediction results.

 <!-- You can replace this with a real screenshot -->

## ✨ Features

- **CSV Upload:** Easily upload your own datasets in `.csv` format.
- **Dataset Preview:** View the first few rows of your data to ensure it's loaded correctly.
- **Algorithm Selection:** Choose from a list of popular ML models:
  - Linear Regression
  - Logistic Regression
  - Decision Tree
  - Random Forest
- **Instant Analysis:** Get a layman-friendly summary of the selected model and key statistics about your dataset.
- **Simulated Metrics:** View mock performance metrics like Accuracy, Precision, Recall, and F1-Score.
- **Prediction Preview:** See a sample of predictions made by the model on your data.
- **Responsive Design:** Clean, modern UI that works on various screen sizes.

## 🛠️ Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **No ML Backend**: This project currently simulates the ML analysis on the frontend for demonstration purposes.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js (which includes npm) installed on your system.

- Node.js (v14 or later recommended)
- npm (v6 or later) or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/dineshmishra2019/ml-website.git
    cd ml-website
    ```

2.  **Install dependencies:**
    Using npm:
    ```sh
    npm install
    ```
    Or using yarn:
    ```sh
    yarn install
    ```

### Running the Application

Once the dependencies are installed, you can start the development server:

```sh
npm start
```

This will run the app in development mode. Open http://localhost:3000 to view it in your browser. The page will automatically reload if you make edits.

## 📖 How to Use

1.  **Upload Dataset**: Click on the "Upload Your Dataset" area and select a `.csv` file from your computer. The file should have a header row. For classification tasks, it's assumed there is a column named `label`.
2.  **Select an Algorithm**: Once the data is loaded, choose one of the four available ML algorithms.
3.  **Run Analysis**: Click the "Run Analysis & Predict" button.
4.  **View Results**: The analysis summary, performance metrics, and prediction table will appear below.

---