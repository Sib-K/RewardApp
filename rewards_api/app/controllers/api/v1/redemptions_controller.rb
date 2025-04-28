class Api::V1::RedemptionsController < ApplicationController
  before_action :authenticate_user!

  def create
    reward = Reward.find(params[:reward_id])

    current_user.with_lock do
      if current_user.points >= reward.cost
        current_user.points -= reward.cost
        current_user.save!
        redemption = Redemption.create!(user: current_user, reward: reward)
        render json: redemption, status: :created
      else
        render json: { error: "Not enough points" }, status: :unprocessable_entity
      end
    end
  end

  def history
    redemptions = current_user.redemptions.includes(:reward)
    render json: redemptions.as_json(include: :reward)
  end
end
