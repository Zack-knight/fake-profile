import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const langDict = {
    'en': 0, 'es': 1, 'fr': 2, 'ar': 3, 'hi': 4
  };

  const [activeTab, setActiveTab] = useState('predict');
  const [inputs, setInputs] = useState({
    statuses_count: 0,
    followers_count: 0,
    friends_count: 0,
    favourites_count: 0,
    lang_num: 'en',
    listed_count: 0,
    geo_enabled: 0,
    profile_use_background_image: 0
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === 'lang_num' ? value : parseInt(value) || 0
    }));
  };

  const handlePredict = async () => {
    setError(null);
    try {
      const requestData = {
        ...inputs,
        lang_num: langDict[inputs.lang_num]
      };
      const response = await axios.post('http://localhost:5000/predict', requestData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="app-container">
      {/* Left Panel - Unchanged */}
      <div className="left-panel">
        <div className="logo-container">
          <div className="logo-placeholder">
            <img src="MCClogo.png" alt="College Logo" className="logo-img" />
            <h2>College Name</h2>
          </div>
        </div>

        <div className="nav-menu">
          <button className={`nav-btn ${activeTab === 'student' ? 'active' : ''}`} onClick={() => setActiveTab('student')}>
            Student Details
          </button>
          <button className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            Project Overview
          </button>
          <button className={`nav-btn ${activeTab === 'predict' ? 'active' : ''}`} onClick={() => setActiveTab('predict')}>
            Predict Profile
          </button>
        </div>

        <div className="student-info">
          <h3>Project By:</h3>
          <p>Name: Tanisha</p>
          <p>Roll No: 12345</p>
          <p>Department: IT</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeTab === 'student' && (
          <div className="tab-content">
            <h2>Student Details</h2>
            <div className="details-card">
              <p><strong>Name:</strong> Tanisha</p>
              <p><strong>Roll Number:</strong> 12345</p>
              <p><strong>Department:</strong> Computer Science</p>
              <p><strong>College:</strong> Mulund College of commerce</p>
              <p><strong>Project Guide:</strong> Prof. Jane Smith</p>
              <p><strong>Academic Year:</strong> 2023-2024</p>
            </div>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="tab-content">
            <h2>Project Overview</h2>
            <div className="details-card">
              <h3>Fake Profile Detection System</h3>
              <p>This project aims to identify fake social media profiles using machine learning techniques.</p>
              <h4>Technical Stack:</h4>
              <ul>
                <li>Frontend: React.js</li>
                <li>Backend: Python Flask</li>
                <li>Machine Learning: TensorFlow/Keras</li>
              </ul>
              <h4>Features Detected:</h4>
              <ol>
                <li>Statuses Count</li>
                <li>Followers-Friends Ratio</li>
                <li>Language Patterns</li>
                <li>Geotagging Behavior</li>
                <li>Profile Customization</li>
              </ol>
            </div>
          </div>
        )}

        {activeTab === 'predict' && (
          <div className="tab-content">
            <h2>Fake Profile Detector</h2>
            <div className="input-grid-container">
              {/* Compact Input Grid */}
              <div className="input-grid">
                {/* Column 1 */}
                <div className="input-column">
                  <div className="input-group">
                    <label>📝 Statuses Count</label>
                    <input
                      type="number"
                      name="statuses_count"
                      value={inputs.statuses_count}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-group">
                    <label>👥 Followers Count</label>
                    <input
                      type="number"
                      name="followers_count"
                      value={inputs.followers_count}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Column 2 */}
                <div className="input-column">
                  <div className="input-group">
                    <label>🤝 Friends Count</label>
                    <input
                      type="number"
                      name="friends_count"
                      value={inputs.friends_count}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-group">
                    <label>⭐ Favorites Count</label>
                    <input
                      type="number"
                      name="favourites_count"
                      value={inputs.favourites_count}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Column 3 */}
                <div className="input-column">
                  <div className="input-group">
                    <label>🌐 Language</label>
                    <select
                      name="lang_num"
                      value={inputs.lang_num}
                      onChange={handleInputChange}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="ar">Arabic</option>
                      <option value="hi">Hindi</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>📋 Listed Count</label>
                    <input
                      type="number"
                      name="listed_count"
                      value={inputs.listed_count}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Column 4 */}
                <div className="input-column">
                  <div className="input-group">
                    <label>📍 Geo Enabled</label>
                    <select
                      name="geo_enabled"
                      value={inputs.geo_enabled}
                      onChange={handleInputChange}
                    >
                      <option value={0}>No</option>
                      <option value={1}>Yes</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>🖼️ Profile BG</label>
                    <select
                      name="profile_use_background_image"
                      value={inputs.profile_use_background_image}
                      onChange={handleInputChange}
                    >
                      <option value={0}>Not Used</option>
                      <option value={1}>Used</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="predict-btn" onClick={handlePredict}>
                🚀 Analyze Profile
              </button>
            </div>

            {error && (
              <div className="error-message">
                ⚠️ Error: {error}
              </div>
            )}

            {result && (
              <div className={`result-card ${result.is_fake ? 'fake' : 'real'}`}>
                <h3>{result.is_fake ? '🤖 FAKE ACCOUNT' : '👤 GENUINE ACCOUNT'}</h3>
                <p><strong>Probability:</strong> {result.probability.toFixed(4)}</p>
                <div className="result-details">
                  <p><strong>Language:</strong> {inputs.lang_num} (Code: {langDict[inputs.lang_num]})</p>
                  <p><strong>Geo Enabled:</strong> {inputs.geo_enabled ? 'Yes' : 'No'}</p>
                  <p><strong>Profile BG:</strong> {inputs.profile_use_background_image ? 'Used' : 'Not Used'}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;