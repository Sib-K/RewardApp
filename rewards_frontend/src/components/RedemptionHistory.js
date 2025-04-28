import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import { getRedemptionHistory } from '../api';
import './styles/RedemptionHistory.css';

function RedemptionHistory() {
  const { user } = useUser();
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
        try {
          const response = await getRedemptionHistory();
      
          // Sort by most recent first
          setHistory(
            response.data.sort(
              (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            )
          );
        } catch (err) {
          setError('Error fetching redemption history. Please try again later.');
        }
      };

    if (user.token) {
      fetchHistory();
    }
  }, [user.token, user.email]);

  return (
    <div className="history-container">
      <h2>Redemption History</h2>
      {error && <p className="history-error">{error}</p>}
      <div className="history-list">
        {history.length > 0 ? (
          history.map((redemption) => (
            <div className="history-card" key={redemption.id}>
              <h4>{redemption.reward?.title || 'Unknown Reward'}</h4>
              <p className="timestamp">
                Redeemed on: {new Date(redemption.updated_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No redemption history found.</p>
        )}
      </div>
    </div>
  );
}

export default RedemptionHistory;
