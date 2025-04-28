class Api::V1::UsersController < ApplicationController
  def balance
    user = User.find(params[:id])
    render json: { points: user.points }
  end
end
