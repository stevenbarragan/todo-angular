module Api
  module V1
    class TasksController < ApplicationController
      skip_before_filter :verify_authenticity_token
      respond_to :json

      def index
        render json: Task.all
      end

      def show
        render json: Task.find(params[:id])
      end

      def create
        @task = Task.new(task_params)

        if @task.save
          render json: @task, status: :created, location: @test
        else
          render json: @test.errors, status: :unprocessable_entity
        end
      end

      def update
        @task = Task.find(params[:id])
        if @task.update(task_params)
          head :no_content
        else
          render json: @task.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @task = Task.find(params[:id])
        @task.destroy

        head :no_content
      end

      private

      def task_params
        params.permit(:note, :completed, :avatar)
      end
    end
  end
end
