class UsersController < ApplicationController

    def index
        @users = User.all
        if !!@users
            render json: @users.to_json()
        else
            render json: {
                status: 500,
                errors: ['no users found']
            }
        end
    end

    
    def show
        binding.pry
        @user = User.all.find(params["id"])
        if !!@user
            render json: @user.to_json(
                include: json_include()
            )
        else
            render json: {
                status: 500, 
                errors: ['user not found']
            }
        end
    end


    # def create
    #     @user = User.new(user_params)
    #     if @user.valid?
    #         # create all the user stuff
    #         @user.save
    #         login!
    #         render json: @user.to_json (
    #             include: json_include()
    #         )
    #     else
    #         render json: {
    #             status: 500,
    #             errors: @user.errors.messages
    #         }
    #     end
    # end

    
    def update

    end


    def destroy

    end


    private

    def user_params
        params.require(:user).permit(:user_id, :email, :password, :password_confirmation, :username, :name)
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
