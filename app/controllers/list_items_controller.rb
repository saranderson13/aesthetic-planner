class ListItemsController < ApplicationController

    def create
        item = ListItem.create(list_item_params)
        render json: item.list.to_json()
    end


    def update
        item = ListItem.find_by(id: list_item_params["id"])
        item.update(list_item_params)
        render json: item.list.to_json()
    end


    def destroy
        item = ListItem.find_by(id: list_item_params["id"])
        list = item.list
        item.delete
        render json: list.to_json()
    end


    private

    def list_item_params
        params.require(:list_item).permit(:id, :list_id, :name, :completed)
    end
    
end