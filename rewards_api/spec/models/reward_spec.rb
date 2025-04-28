require 'rails_helper'

RSpec.describe Reward, type: :model do
  it 'is valid with title and cost' do
    reward = Reward.new(title: 'Test Reward', cost: 100)
    expect(reward).to be_valid
  end

  it 'is invalid without a title' do
    reward = Reward.new(cost: 100)
    expect(reward).not_to be_valid
  end

  it 'is invalid with negative cost' do
    reward = Reward.new(title: 'Invalid', cost: -50)
    expect(reward).not_to be_valid
  end
end
