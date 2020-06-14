class SessionsController < ApplicationController


    def create
        user = currently_logging_in
        
        if !!user && user.authenticate(login_params[:password])
            session[:user_id] = user.id
            render json: user.to_json(
                include: json_include()
            )
        else

        end

    end


    def destroy
        
    end


    private

    def currently_logging_in
        User.find_by(login_params[:email])
    end


    def login_params
        params.permit(:email, :password, :password_confirmation)
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