class User < ApplicationRecord
  devise :database_authenticatable,
       :registerable,
       :recoverable,
       :rememberable,
       :validatable,
       :jwt_authenticatable,
       jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  has_many :redemptions

  validates :name, presence: true

  after_initialize :set_default_points, if: :new_record?

  def set_default_points
    self.points ||= 2000
  end
end
