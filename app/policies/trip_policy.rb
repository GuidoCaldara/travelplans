class TripPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def new?
    true
  end

  def create?
    true
  end

  def show?
    p record.user == user
    record.user == user
  end


  def update?
    record.user == user
  end

  def edit?
    record.user == user
  end

  def destroy?
    record.user == user
  end
end
