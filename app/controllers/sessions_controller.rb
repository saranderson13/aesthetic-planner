class SessionsController < ApplicationController

    def new

    end


    def create

    end


    def destroy
        
    end


    private

    def currently_logging_in

    end


    def login_params
        params.permit(:email, :password, :password_confirmation)
    end


end