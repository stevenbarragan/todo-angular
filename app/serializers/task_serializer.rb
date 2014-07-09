class TaskSerializer < ActiveModel::Serializer
  attributes :id, :note, :completed, :avatar
  
  def avatar
    object.avatar? ? object.avatar.url : nil
  end
end
