import React, { useState, useEffect } from 'react';
import './styles/Rewards.css'; 
import { getBalance, getRewards, redeemReward } from '../api';
import './styles/Rewards.css'; 

function Rewards({ userToken }) {
  const [rewards, setRewards] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [error, setError] = useState('');
  const [redeemedReward, setRedeemedReward] = useState(null);

  // Fetch rewards and user's balance
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await getRewards();
        setRewards(response.data);
      } catch (err) {
        setError('Error fetching rewards. Please try again later.');
      }
    };

    const fetchUserBalance = async () => {
      try {
        const response = await getBalance();
        setUserBalance(response.data.points);
      } catch (err) {
        setError('Error fetching balance. Please try again later.');
      }
    };

    fetchRewards();
    fetchUserBalance();
  }, [userToken]);

  // Handle redeeming a reward
  const handleRedeem = async (rewardId) => {
    try {
      const rewardToRedeem = rewards.find((reward) => reward.id === rewardId);
      if (rewardToRedeem && userBalance >= rewardToRedeem.cost) {
        await redeemReward(rewardId);
        setUserBalance(userBalance - rewardToRedeem.cost);
        setRedeemedReward(rewardToRedeem);
      } else {
        setError('Insufficient points to redeem this reward.');
      }
    } catch (err) {
      console.log(err);
      setError('Error redeeming reward. Please check your points balance.');
    }
  };

  return (
    <div className="rewards-panel">
      <h2>Redeem Rewards</h2>
      {error && <p className="error-message">{error}</p>}

      {/* Display user balance */}
      <div className="balance-section">
        <h3>Your Points Balance: <span>{userBalance}</span></h3>
        {redeemedReward && (
          <p className="redeemed-message">
            Congratulations! You redeemed the reward: <strong>{redeemedReward.name}</strong>
          </p>
        )}
      </div>

      {/* Display available rewards */}
      <div className="rewards-list">
        <h3>Available Rewards:</h3>
        <div className="reward-grid">
          {rewards.length > 0 ? (
            rewards.map((reward) => (
              <div key={reward.id} className="reward-item">
                <div className="reward-info">
                  <p><strong>{reward.title}</strong></p>
                  <p>{reward.cost} points</p>
                </div>
                <button
                  className="redeem-button"
                  onClick={() => handleRedeem(reward.id)}
                  disabled={userBalance < reward.cost}
                >
                  {userBalance >= reward.cost ? 'Redeem' : 'Insufficient Points'}
                </button>
              </div>
            ))
          ) : (
            <p>No rewards available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rewards;
