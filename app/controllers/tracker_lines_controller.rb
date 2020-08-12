class TrackerLinesController < ApplicationController

    def create
        tracker = Tracker.find(t_line_params["tracker_id"])
        if tracker.user === current_user
            line = TrackerLine.create(t_line_params)
    
            # Create tracker days
            days = line.days
            days.each { |d| d.tracker_days.build(tracker_line_id: line.id).save }

            trackers = current_user.list_trackers_in_month(tracker.month_id)
            render json: trackers.to_json(
                include: json_include()
            )
        else 
            render json: {
                status: 401,
                error: "You are not authorized to perform this action."
            }
        end
    end


    # NOT YET IMPLEMENTED
    # 
    # def update
    #     line = TrackerLine.find_by(id: t_line_params["id"])
    #     line.update(t_line_params)
    #     trackers = Tracker.all
    #     render json: trackers.to_json(
    #         include: json_include()
    #     )
    # end


    # def destroy
    #     line = TrackerLine.find_by(id: t_line_params["id"])
    #     line.delete
    #     trackers = Tracker.all
    #     render json: trackers.to_json(
    #         include: json_include()
    #     )
    # end


    private

    def t_line_params
        params.require(:tracker_line).permit(:id, :tracker_id, :name)
    end

    def json_include
        return {
            tracker_lines: { include: :tracker_days }
        }
    end

end