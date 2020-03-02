class ListItemsController < ApplicationController

    def update
        # binding.pry
        item = ListItem.find_by(id: list_item_params["id"])
        item.update(completed: list_item_params["completed"])
        lists = List.all
        render json: lists.to_json(
            include: json_include()
        )
    end


    private

    def list_item_params
        params.require(:list_item).permit(:id, :list_id, :name, :completed)
    end

    def json_include
        return [
            :list_items
        ]
    end
    
end