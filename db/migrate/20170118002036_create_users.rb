class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string    :username
      t.string    :ign
      t.string    :friendcode

      t.timestamps
    end
  end
end
