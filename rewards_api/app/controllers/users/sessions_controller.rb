class Users::SessionsController < Devise::SessionsController
    respond_to :json

    private

    def respond_with(resource, _opts = {})
      render json: {
        message: "Logged in successfully.",
        user: current_user,
        token: request.env["warden-jwt_auth.token"]
      }, status: :ok
    end

    def respond_to_on_destroy
      if current_user
        render json: { message: "Logged out successfully." }, status: :ok
      else
        render json: { message: "User was not logged in or already logged out." }, status: :unauthorized
      end
    end
end
