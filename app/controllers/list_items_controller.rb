class ListItemsController < ApplicationController

    def update
        item = ListItem.find_by(id: list_item_params["id"])

        if item.user === current_user
            item.update(completed: list_item_params["completed"])
            lists = List.all
            render json: lists.to_json(
                include: json_include()
            )
        else
            render json: {
                status: 401,
                error: "You are not authorized to perform this action."
            }
        end
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