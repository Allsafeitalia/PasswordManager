import React, { useState, useEffect } from 'react';
import './App.css';
//import './Popup.css';

// Function to generate a random password
const generatePassword = (length = 12) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

function App() {
  const [entries, setEntries] = useState(() => {
    try {
      const savedEntries = JSON.parse(localStorage.getItem('passwordEntries'));
      return savedEntries ? savedEntries : [];
    } catch (error) {
      console.error('Failed to load entries from localStorage:', error);
      return [];
    }
  });
  const [site, setSite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [showGeneratePopup, setShowGeneratePopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [searchSite, setSearchSite] = useState('');
  const [foundEntry, setFoundEntry] = useState(null);

  // Save entries to local storage whenever entries change
  useEffect(() => {
    try {
      localStorage.setItem('passwordEntries', JSON.stringify(entries));
    } catch (error) {
      console.error('Failed to save entries to localStorage:', error);
    }
  }, [entries]);

  const handleAddEntry = () => {
    if (site && username && password) {
      const newEntry = { site, username, password };
      setEntries([...entries, newEntry]);
      setSite('');
      setUsername('');
      setPassword('');
    }
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(passwordLength);
    setPassword(newPassword);
  };

  const handleDeleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    alert('Entry successfully deleted!');
    setFoundEntry(null);
    setSearchSite('');
    setShowViewPopup(true);
  };

  const handleSearchEntry = () => {
    const entry = entries.find((entry) => entry.site.toLowerCase() === searchSite.toLowerCase());
    setFoundEntry(entry);
  };

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Password Manager</h1>

      <div className="main-controls" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="form-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
          <input
            type="text"
            placeholder="Site Name"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button className="animated-button" onClick={handleAddEntry} style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: 'white', cursor: 'pointer' }}>Add Entry</button>
        </div>
        <div className="button-group" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px', alignItems: 'center' }}>
          <button className="animated-button" onClick={() => setShowGeneratePopup(true)} style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer', width: '100%' }}>Generate Password</button>
          <button className="animated-button" onClick={() => setShowViewPopup(true)} style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#6c757d', color: 'white', cursor: 'pointer', width: '100%' }}>View Password</button>
        </div>
      </div>

      {showGeneratePopup && (
        <div className="popup-overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowGeneratePopup(false)}>
          <div className="popup-content" style={{ backgroundColor: 'white', borderRadius: '10px', padding: '30px', maxWidth: '400px', width: '90%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Generate Password</h2>
            <label htmlFor="passwordLength" style={{ display: 'block', marginBottom: '10px' }}>Password Length: {passwordLength}</label>
            <input
              type="range"
              id="passwordLength"
              min="4"
              max="32"
              value={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              style={{ width: '100%' }}
            />
            <button className="animated-button" onClick={handleGeneratePassword} style={{ marginTop: '20px', padding: '10px', width: '100%', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>Generate</button>
            <input type="text" value={password} readOnly style={{ marginTop: '20px', width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }} />
            <button className="animated-button" onClick={() => setShowGeneratePopup(false)} style={{ marginTop: '20px', padding: '10px', width: '100%', borderRadius: '5px', border: 'none', backgroundColor: '#6c757d', color: 'white', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}

      {showViewPopup && (
        <div className="popup-overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowViewPopup(false)}>
          <div className="popup-content" style={{ backgroundColor: 'white', borderRadius: '10px', padding: '30px', maxWidth: '400px', width: '90%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>View Password</h2>
            <input
              type="text"
              placeholder="Enter Site Name"
              value={searchSite}
              onChange={(e) => setSearchSite(e.target.value)}
              style={{ marginBottom: '20px', width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button className="animated-button" onClick={handleSearchEntry} style={{ marginBottom: '20px', padding: '10px', width: '100%', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>Search</button>
            {foundEntry && (
              <div style={{ marginBottom: '20px', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px', boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.1)' }}>
                <p><strong>Site:</strong> {foundEntry.site}</p>
                <p><strong>Username:</strong> {foundEntry.username}</p>
                <p><strong>Password:</strong> {foundEntry.password}</p>
                <button
                  className="animated-button"
                  onClick={() => handleDeleteEntry(entries.indexOf(foundEntry))}
                  style={{ marginTop: '20px', backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
                >
                  Delete Password
                </button>
              </div>
            )}
            <button className="animated-button" onClick={() => setShowViewPopup(false)} style={{ padding: '10px', width: '100%', borderRadius: '5px', border: 'none', backgroundColor: '#6c757d', color: 'white', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;