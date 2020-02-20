class GoalsController < ApplicationController

    def index
        goals = Goal.all
        render json: goals.to_json()
    end


    def show
        goal = Goal.find_by(id: params["id"])
        render json: goal.to_json()
    end


    def create
        goal = Goal.create(goal_params)
        owner = goal.goalable
        render json: owner.goals.to_json()
    end


    def update
        goal = Goal.find_by(id: goal_params["id"])
        goal.update(goal_params)
        owner = goal.goalable
        render json: owner.goals.to_json()
    end


    def destroy
        goal = Goal.find_by(id: goal_params["id"])
        owner = goal.goalable
        goal.delete
        render json: owner.goals.to_json()
    end


    private

    def goal_params
        params.require(:goal).permit(:id, :goalable_type, :goalable_id, :content)
    end

end