class AddPictureToTrips < ActiveRecord::Migration[6.0]
  def change
    add_column :trips, :picture, :string
  end
end
