class ListsController < ApplicationController

    def index
        lists = List.all
        render json: lists.to_json(
            include: json_include()
        )
    end


    def show
        list = List.find_by(id: params["id"])
        render json: list.to_json(
            include: json_include()
        )
    end


    def create
        list = List.create(name: list_params["name"])
        list_params["list_items"].each do |i|
            list.list_items.build(name: i)
        end
        list.save
        lists = List.all
        render json: lists.to_json(
            include: json_include()
        )
    end


    def update
        list = List.find_by(id: list_params["id"])
        list.update(name: list_params["name"])
        list.list_items.delete_all

        list_params["list_items"].each do |i|
            list.list_items.build(name: i)
        end

        list.save
        lists = List.all
        render json: lists.to_json(
            include: json_include()
        )
    end


    def destroy
        list = List.find_by(id: params["id"])
        list.destroy
        lists = List.all
        render json: lists.to_json(
            include: json_include()
        )
    end


    private

    def list_params
        params.require(:list).permit(:id, :checklist, :name, :list_items => [])
    end

    def json_include
        return [
            :list_items
        ]
    end

end
