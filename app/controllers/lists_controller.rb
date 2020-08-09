class ListsController < ApplicationController

    def index
        # Shows all lists for a specified user.
        lists = User.find(params["user_id"]).lists
        render json: lists.to_json(
            include: json_include()
        )
    end


    def create
        if (list_params["userId"] === current_user.id)
            list = List.create(name: list_params["name"], checklist: list_params["checklist"], user: current_user)

            list_params["list_items"].uniq.each do |i|
                list.list_items.build(name: i)
            end

            list.save
            render json: current_user.lists.to_json(
                include: json_include()
            )
        else 
            render json: {
                status: 401,
                error: "You are not authorized to perform this action."
            }
        end
    end


    def update
        list = List.find_by(id: list_params["id"])
        if (list.user === current_user)
            list.update(name: list_params["name"], checklist: list_params["checklist"])

            # Find items that have been added. Then build new items from that list.
            newItems = list_params["list_items"].select { |l| !list.list_items.find_by(name: l) }
            newItems.each { |i| list.list_items.build(name: i) }

            # list.save

            # Generate array of all names on the original list, then extrapolate a list of item names that have been deleted.
            item_names = list.list_items.map { |i| i.name }
            deleted_items = item_names.select { |l| !list_params["list_items"].include?(l) }

            # Generate array of the objects to be deleted. Then destroy them.
            deletable_objects = list.list_items.select do |i|
                deleted_items.find { |ei| ei === i.name }
            end
            deletable_objects.each { |o| o.destroy }

            # Save and touch. 
            # Touch updates the 'updated time' if items have been updated, but not the list name.
            # This ensures that the list will be moved to the front of the queue.
            list.save
            list.touch
            render json: current_user.lists.to_json(
                include: json_include()
            )
        else
            render json: {
                status: 401,
                error: "You are not authorized to perform this action."
            }
        end
    end


    def destroy
        list = List.find_by(id: params["id"])

        if list.user === current_user
            list.destroy
            render json: current_user.lists.to_json(
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

    def list_params
        params.require(:list).permit(:id, :userId, :checklist, :name, :list_items => [])
    end

    def json_include
        return [
            :list_items
        ]
    end

end
