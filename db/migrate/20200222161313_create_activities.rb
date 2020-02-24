class CreateActivities < ActiveRecord::Migration[6.0]
  def change
    create_table :activities do |t|
      t.references :trip, null: false, foreign_key: true
      t.string :title
      t.text :notes
      t.string :automatic_picture
      t.float :latitude
      t.float :longitude
      t.string :location
      t.string :category

      t.timestamps
    end
  end
end
