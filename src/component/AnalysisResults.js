import React from 'react';

const AnalysisResults = ({ analysisResults, predictionResults, columns }) => {
  return (
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
  );
};

export default AnalysisResults;