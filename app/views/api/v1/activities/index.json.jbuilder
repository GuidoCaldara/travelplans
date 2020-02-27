json.array! @activities do |restaurant|
  json.extract! restaurant, :id, :done, :title, :notes, :automatic_picture, :latitude, :longitude, :location, :category
end
