class CreateTableTask < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.text :note
      t.boolean :completed, default: false
    end
  end
end
