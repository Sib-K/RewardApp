require 'rails_helper'

RSpec.describe "Rewards", type: :request do
  let!(:user) { create(:user) }
  let!(:reward) { create(:reward, cost: 200) }

  before do
    post '/login', params: { user: { email: user.email, password: 'password' } }
    @token = response.headers['Authorization']
  end

  it 'retrieves rewards' do
    get '/api/v1/rewards', headers: { 'Authorization': @token }
    expect(response).to have_http_status(:ok)
  end
end
