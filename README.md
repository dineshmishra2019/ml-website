# ML Playground

A user-friendly, web-based interface for experimenting with common machine learning algorithms. Upload your own CSV dataset, select a model, and instantly see a simulated analysis and prediction results.
[![CI/CD - Build and Push](https://github.com/your-username/ml-website/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/your-username/ml-website/actions/workflows/ci-cd.yml)
![ML Playground Screenshot](./docs/screenshot.png)

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
    git clone https://github.com/your-username/ml-website.git
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

## 🐳 Running with Docker

You can also run this application inside a Docker container.

### Build the Image

First, build the Docker image from the `Dockerfile`:

```sh
docker build -t your-dockerhub-username/ml-playground .
```

### Run the Container

Once the image is built, run it as a container:

```sh
docker run -p 8080:80 your-dockerhub-username/ml-playground
```

The application will be available at http://localhost:8080.

---

## 📦 Deploying with Helm

A Helm chart is available in the `helm/` directory for easy deployment to Kubernetes.

### Prerequisites

- A Kubernetes cluster (e.g., Minikube, Docker Desktop, or a cloud provider)
- Helm installed

### Installation

This chart is published to GitHub Packages. To install it, you first need to log in to the GitHub Container Registry (ghcr.io).
1.  **Update the image repository:**
1.  **Log in to GHCR with Helm:**
    ```sh
    echo $CR_PAT | helm registry login ghcr.io --username your-username --password-stdin
    ```
    > **Note:** `$CR_PAT` should be a Personal Access Token (PAT) with `read:packages` scope.
2.  **Install the chart:**
2.  **Install the chart from the OCI registry:**
    Replace `your-username` with your GitHub username and specify the chart version you want to deploy.
    helm install my-release helm/ml-playground
    helm install my-release oci://ghcr.io/your-username/charts/ml-playground --version 0.1.0 \
      --set image.repository=your-dockerhub-username/ml-playground

    This will deploy the ML Playground application into your currently configured Kubernetes cluster.
    This will deploy the ML Playground application into your currently configured Kubernetes cluster. You can then access it using the instructions printed by Helm, typically by setting up port-forwarding or an Ingress controller.

## 🔄 CI/CD

This project uses GitHub Actions to automatically build and push the Docker image to Docker Hub and the Helm chart to GitHub Packages.

The pipeline is triggered on every push to the `main` branch. You can view the workflow status from the badge at the top of this README.
