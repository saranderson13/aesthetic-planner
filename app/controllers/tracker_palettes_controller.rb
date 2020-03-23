class TrackerPalettesController < ApplicationController

    def index
        render json: TrackerPalette.all.to_json()
    end

    def update
        palette = TrackerPalette.find(palette_params.id)
        palette.update(palette_params)
        render json: TrackerPalette.all.to_json()
    end

    private

    def palette_params
        params.require(:palette).permit(:id, :name, :color_1, :color_2, :color_3, :color_4, :color_5, :color_6, :color_7)
    end

end
