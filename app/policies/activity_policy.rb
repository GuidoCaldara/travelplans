class ActivityPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    record.trip.user == user
  end

  def update?
    record.trip.user == user
  end

  def edit?
    record.trip.user == user
  end

  def destroy?
    record.trip.user == user
  end

end
