class UsersController < ApplicationController

    def index
        render json: User.all.to_json()
    end

    
    def show
        user = User.all.find(params["id"])
        render json: user.to_json(
            include: json_include()
        )
    end


    def create

    end

    
    def update

    end


    def destroy

    end


    private

    def json_include
        return [
            :events,
            :goals,
            :trackers,
            :journal
        ]
    end

end
