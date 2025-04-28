Rails.application.routes.draw do
  # Health check route
  get "up" => "rails/health#show", as: :rails_health_check

  # API routes
  namespace :api do
    namespace :v1 do
      resources :users do
        get :balance, on: :member
        get :redemptions, to: "redemptions#history"
      end

      resources :rewards, only: [ :index ]
      resources :redemptions, only: [ :create ]
    end
  end

  # Devise routes for users - customized to avoid route name conflicts
  devise_for :users,
             path: "",
             path_names: {
               sign_in: "login",
               sign_out: "logout",
               registration: "signup"
             },
             controllers: {
               sessions: "users/sessions",
               registrations: "users/registrations"
             }
end
