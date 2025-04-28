require 'rails_helper'

RSpec.describe Redemption, type: :model do
  it 'belongs to a user and reward' do
    user = User.create(name: 'User', email: 'user@example.com', password: 'password')
    reward = Reward.create(title: 'Item', cost: 200)
    redemption = Redemption.new(user: user, reward: reward)
    expect(redemption).to be_valid
  end
end
