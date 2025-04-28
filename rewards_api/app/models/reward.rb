class Reward < ApplicationRecord
  validates :title, presence: true
  validates :cost, numericality: { greater_than_or_equal_to: 0 }
end
