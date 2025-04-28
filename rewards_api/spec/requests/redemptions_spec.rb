require 'rails_helper'

RSpec.describe "Redemptions", type: :request do
  let(:user) { create(:user) }
  let(:reward) { create(:reward, cost: 300) }

  before do
    post '/login', params: {
      user: { email: user.email, password: 'password' }
    }
    @token = response.headers['Authorization']
  end

  it 'redeems a reward successfully' do
    post '/api/v1/redemptions', params: { reward_id: reward.id },
         headers: { 'Authorization' => @token }

    expect(response).to have_http_status(:created)
  end

  it 'fails to redeem reward if insufficient points' do
    user.update(points: 100)
    post '/api/v1/redemptions', params: { reward_id: reward.id },
         headers: { 'Authorization' => @token }

    expect(response).to have_http_status(:unprocessable_entity)
    expect(response.body).to include('Not enough points')
  end
end
