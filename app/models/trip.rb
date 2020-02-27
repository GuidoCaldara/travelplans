class Trip < ApplicationRecord
  belongs_to :user
  has_many :activities

  def formatted_start_date
    start_date.strftime("%A, %b %d")
  end
  def formatted_end_date
    end_date.strftime("%A, %b %d")
  end
end
