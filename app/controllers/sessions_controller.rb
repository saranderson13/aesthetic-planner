class SessionsController < ApplicationController


    def create
        @user = User.find_by(email: session_params["email"])

        if @user && @user.authenticate(session_params["password"])
            login!
            render json: {
                logged_in: true,
                user_info: @user.to_json()
            }
        else
            render json: {
                status: 401,
                errors: ['user credentials incorrect', 'verify credentials and try again, or sign up']
            }
        end
    end

    def is_logged_in?
        # session[:user_id] = 4
        if logged_in? && current_user
            render json: {
                logged_in: true,
                user_info: current_user.to_json()
            }
        else
            render json: {
                logged_in: false,
                user_info: nil
            }
        end
    end

    def destroy
        logout!
        render json: {
            status: 200,
            logged_in: false,
            message: 'successful logout'
        }
    end

    private

    def session_params
        params.require(:user).permit(:email, :password)
    end


    def json_include
        return [
            :events,
            :goals,
            # :trackers,
            :journal
        ]
    end


end