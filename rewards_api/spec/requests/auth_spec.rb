require 'rails_helper'

RSpec.describe "Authentication", type: :request do
  it 'signs up a user' do
    post '/signup', params: {
      user: {
        name: 'Alice',
        email: 'alice@example.com',
        password: 'password'
      }
    }
    expect(response).to have_http_status(:ok)
  end

  it 'logs in a user' do
    user = create(:user, email: 'login@example.com', password: 'password')
    post '/login', params: {
      user: {
        email: 'login@example.com',
        password: 'password'
      }
    }
    expect(response).to have_http_status(:ok)
    expect(response.headers['Authorization']).to be_present
  end
end
