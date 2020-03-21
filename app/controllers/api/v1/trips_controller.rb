class Api::V1::TripsController < Api::V1::BaseController
  before_action :set_trip, only: [ :show ]
  def new
    @trip = Trip.new
  end

  def show
    authorize @trip
  end

  private

  def set_trip
    @trip = Trip.find(params[:id])
  end
end
