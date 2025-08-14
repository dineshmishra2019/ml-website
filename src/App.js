import React, { useState } from 'react';
import Modal from '../component/Modal';
import AnalysisResults from '../component/AnalysisResults';

// A simple, custom CSV parser to avoid external dependencies.
// This function reads a CSV string and returns an array of objects.
const parseCSV = (csvText) => {
  const lines = csvText.trim().split('\n');
  if (lines.length === 0) return { data: [], fields: [] };
  
  const fields = lines[0].split(',').map(field => field.trim());
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(value => value.trim());
    if (values.length !== fields.length) continue; // Skip malformed rows
    
    const rowObject = {};
    fields.forEach((field, index) => {
      let value = values[index];
      // Simple type conversion for numbers
      if (!isNaN(value) && value !== '') {
        value = Number(value);
      }
      rowObject[field] = value;
    });
    data.push(rowObject);
  }
  
  return { data, fields };
};

const mlAlgorithms = [
  'Linear Regression',
  'Logistic Regression',
  'Decision Tree',
  'Random Forest',
];

const App = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [predictionResults, setPredictionResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvText = event.target.result;
        const { data, fields } = parseCSV(csvText);
        
        setData(data);
        setColumns(fields);
        // Reset other states
        setAnalysisResults(null);
        setPredictionResults(null);
        setSelectedAlgorithm('');
      };
      reader.readAsText(uploadedFile);
    }
  };

  const handleRunAnalysis = () => {
    if (!data || !selectedAlgorithm) {
      setError('Please upload a dataset and select an algorithm first.');
      return;
    }

    setIsLoading(true);
    // Simulate a network request and model training time
    setTimeout(() => {
      // Here, you would normally send the data and selected algorithm to a backend
      // for actual processing. For this demo, we'll use mock data.
      
      // Simulate analysis results with more detail
      const mockAnalysis = {
        summary: `Analysis complete for ${file.name} using ${selectedAlgorithm}. The model has been trained on the data.`,
        dataStatistics: {
          rows: data.length,
          columns: columns.length,
          features: columns.filter(c => c !== 'label').join(', '),
          target: 'label',
        },
        // We'll create mock metrics for the prediction
        predictionMetrics: {
          accuracy: (Math.random() * (0.95 - 0.75) + 0.75).toFixed(2),
          precision: (Math.random() * (0.9 - 0.7) + 0.7).toFixed(2),
          recall: (Math.random() * (0.92 - 0.72) + 0.72).toFixed(2),
          f1_score: (Math.random() * (0.91 - 0.71) + 0.71).toFixed(2),
        }
      };
      setAnalysisResults(mockAnalysis);
      
      // Simulate prediction results
      const mockPredictions = data.map((item, index) => ({
        ...item,
        // For a binary classification task, we can just flip the label for some rows
        prediction: index % 3 === 0 ? (item.label === 1 ? 0 : 1) : item.label
      }));
      setPredictionResults(mockPredictions);
      
      setIsLoading(false);
    }, 2000); // 2 second delay
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8 font-inter">
      {error && <Modal message={error} onClose={() => setError(null)} />}
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white mb-4">ML Playground</h1>
          <p className="text-lg text-gray-400">
            Upload your dataset, select an algorithm, and see the magic happen.
          </p>
        </header>

        <section className="bg-gray-800 p-8 rounded-2xl shadow-xl mb-8">
          <h2 className="text-3xl font-bold mb-6 text-white">1. Upload Your Dataset</h2>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-grow w-full">
              <label htmlFor="file-upload" className="flex justify-center items-center px-4 py-6 bg-gray-700 text-gray-300 rounded-xl cursor-pointer hover:bg-gray-600 transition-colors duration-200 border-2 border-dashed border-gray-600">
                <span className="text-center">
                  {file ? `File selected: ${file.name}` : 'Click to select a CSV file'}
                </span>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".csv"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {data && (
              <div className="w-full md:w-auto text-center md:text-right">
                <span className="text-sm text-green-400 font-medium">Dataset loaded successfully!</span>
                <p className="text-xs text-gray-400 mt-1">{data.length} rows, {columns.length} columns</p>
              </div>
            )}
          </div>
          {data && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Dataset Preview</h3>
              <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full bg-gray-700 rounded-xl overflow-hidden">
                  <thead className="bg-gray-600">
                    <tr>
                      {columns.map((col) => (
                        <th key={col} className="px-4 py-2 text-left text-sm font-medium text-gray-300">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(0, 5).map((row, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-700/80'} hover:bg-gray-600 transition-colors duration-200`}>
                        {columns.map((col) => (
                          <td key={`${index}-${col}`} className="px-4 py-2 text-sm text-gray-300">{row[col]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        <section className="bg-gray-800 p-8 rounded-2xl shadow-xl mb-8">
          <h2 className="text-3xl font-bold mb-6 text-white">2. Select an Algorithm</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mlAlgorithms.map((algo) => (
              <button
                key={algo}
                onClick={() => setSelectedAlgorithm(algo)}
                className={`p-4 rounded-xl border-2 transition-colors duration-200 ${
                  selectedAlgorithm === algo
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span className="text-lg font-medium">{algo}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="text-center mb-12">
          <button
            onClick={handleRunAnalysis}
            disabled={!data || !selectedAlgorithm || isLoading}
            className={`px-8 py-4 rounded-xl text-xl font-bold transition-all duration-300
              ${data && selectedAlgorithm && !isLoading
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transform hover:scale-105'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
          >
            {isLoading ? 'Running Analysis...' : 'Run Analysis & Predict'}
          </button>
        </div>

        {isLoading && (
          <div className="text-center mt-8">
            <svg className="animate-spin h-10 w-10 text-emerald-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-400 mt-4">Analyzing data and training the model...</p>
          </div>
        )}

        {analysisResults && (
          <section className="bg-gray-800 p-8 rounded-2xl shadow-xl mb-8">
            <h2 className="text-3xl font-bold mb-6 text-white">3. Analysis & Prediction Results</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Box 1: Model Summary */}
              <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600">
                <h3 className="text-xl font-semibold mb-4 text-white">Model Analysis Summary</h3>
                <p className="text-gray-300 mb-4">{analysisResults.summary}</p>
                <ul className="space-y-2 text-gray-400">
                  <li><span className="font-semibold text-gray-200">Rows:</span> {analysisResults.dataStatistics.rows}</li>
                  <li><span className="font-semibold text-gray-200">Columns:</span> {analysisResults.dataStatistics.columns}</li>
                  <li><span className="font-semibold text-gray-200">Features:</span> {analysisResults.dataStatistics.features}</li>
                  <li><span className="font-semibold text-gray-200">Target:</span> {analysisResults.dataStatistics.target}</li>
                </ul>
              </div>

              {/* Box 2: Prediction Metrics */}
              <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600">
                <h3 className="text-xl font-semibold mb-4 text-white">Prediction Metrics</h3>
                <p className="text-gray-400 mb-4">Performance of the selected algorithm.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-600 p-4 rounded-lg text-center">
                    <p className="text-lg font-bold text-emerald-400">{analysisResults.predictionMetrics.accuracy}</p>
                    <p className="text-sm text-gray-300">Accuracy</p>
                  </div>
                  <div className="bg-gray-600 p-4 rounded-lg text-center">
                    <p className="text-lg font-bold text-yellow-400">{analysisResults.predictionMetrics.precision}</p>
                    <p className="text-sm text-gray-300">Precision</p>
                  </div>
                  <div className="bg-gray-600 p-4 rounded-lg text-center">
                    <p className="text-lg font-bold text-red-400">{analysisResults.predictionMetrics.recall}</p>
                    <p className="text-sm text-gray-300">Recall</p>
                  </div>
                  <div className="bg-gray-600 p-4 rounded-lg text-center">
                    <p className="text-lg font-bold text-blue-400">{analysisResults.predictionMetrics.f1_score}</p>
                    <p className="text-sm text-gray-300">F1 Score</p>
                  </div>
                </div>
              </div>

              {/* Box 3: Predictions Table */}
              <div className="lg:col-span-1 bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600">
                <h3 className="text-xl font-semibold mb-4 text-white">Predictions</h3>
                <div className="overflow-x-auto rounded-xl">
                  <table className="min-w-full bg-gray-600 rounded-xl overflow-hidden">
                    <thead className="bg-gray-500">
                      <tr>
                        {columns.map((col) => (
                          <th key={col} className="px-4 py-2 text-left text-sm font-medium text-gray-300">{col}</th>
                        ))}
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Prediction</th>
                      </tr>
                    </thead>
                    <tbody>
                      {predictionResults.slice(0, 5).map((row, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-600' : 'bg-gray-600/80'} hover:bg-gray-500 transition-colors duration-200`}>
                          {columns.map((col) => (
                            <td key={`${index}-${col}`} className="px-4 py-2 text-sm text-gray-300">{row[col]}</td>
                          ))}
                          <td className="px-4 py-2 text-sm text-gray-300">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.prediction === row.label ? 'bg-green-600' : 'bg-red-600'}`}>
                              {row.prediction}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default App;
