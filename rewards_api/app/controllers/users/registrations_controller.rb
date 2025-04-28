class Users::RegistrationsController < Devise::RegistrationsController
    respond_to :json

    def create
      build_resource(sign_up_params)

      resource.save
      if resource.persisted?
        sign_in(resource, store: false)
        render json: {
          status: { code: 200, message: "Signed up & logged in successfully." },
          user: resource
        }
      else
        render json: {
          status: { code: 422, message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }
        }, status: :unprocessable_entity
      end
    end

    private

    def sign_up_params
      params.require(:user).permit(:name, :email, :password)
    end
end
