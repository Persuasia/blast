class AddCommentstable < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :name
      t.string :address
      t.timestamps null: false
    end
  end
end
