class TrackerPalettesController < ApplicationController

    def update

    end

    private

    def palette_params
        params.require(:palette).permit(:id, :color_1, :color_2, :color_3, :color_4, :color_5, :color_6, :color_7)
    end

end
