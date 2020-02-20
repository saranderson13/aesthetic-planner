class ListsController < ApplicationController

    def index
        lists = List.all
        render json: lists.to_json()
    end


    def show
        list = List.find_by(id: params["id"])
        render json: list.to_json()
    end


    def create
        list = List.Create(list_params)
        render json: list.to_json()
    end


    def update
        list = List.find_by(id: list_params["id"])
        list.update(list_params)
        render json: list.to_json()
    end


    def destroy
        list = List.find_by(id: list_params["id"])
        list.delete
        lists = List.all
        render json: lists.to_json()
    end


    private

    def list_params
        params.require(:list).permit(:id, :name, :checklist)

end