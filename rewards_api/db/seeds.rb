# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
user = User.create(name: "Alice", points: 1500)
Reward.create(title: "Amazon Gift Card", description: "$10 Amazon", cost: 500)
Reward.create(title: "Spotify Subscription", description: "1 Month", cost: 300)
Reward.create(title: "Coffee Mug", description: "Company Mug", cost: 200)
