require "net/http"
require "json"

module Types
  class QueryType < Types::BaseObject
    field :dogs, [ DogType ], null: false
    field :owners, [ OwnerType ], null: false
    field :vaccines, [ VaccineType ], null: false
    def dogs
      url = URI("http://localhost:4001/api/dogs/list")
      response = Net::HTTP.get(url)
      json_response = JSON.parse(response)
      unless json_response.is_a?(Hash) && json_response["dogs"].is_a?(Array)
        raise "API response is not in expected format: #{json_response.inspect}"
      end
      json_response["dogs"].map do |dog|
        {
          id: dog["id"],
          name_dog: dog["nameDog"],
          breed: dog["breed"],
          age: dog["age"],
          gener: dog["gener"],
          image: dog["image"]
        }
      end
    end
    def owners
      url = URI("http://localhost:8081/api/v1/listOwners")
      response = Net::HTTP.get(url)
      json_response = JSON.parse(response)

      unless json_response.is_a?(Array)
        raise "API response is not in expected format: #{json_response.inspect}"
      end
      json_response.map do |owner|
        {
          id_card: owner["id_card"],
          first_name: owner["firstName"],
          last_name: owner["lastName"],
          address: owner["address"],
          email: owner["email"],
          phone: owner["phone"]
        }
      end
    end
    def vaccines
      url = URI("http://localhost:3002/api/vaccines")
      response = Net::HTTP.get(url)
      json_response = JSON.parse(response)

      unless json_response.is_a?(Array)
        raise GraphQL::ExecutionError, "API response is not in expected format: #{json_response.inspect}"
      end

      json_response.map do |vaccine|
        {
          id: vaccine["id_vaccine"],
          name: vaccine["name"],
          description: vaccine["description"],
          dose: vaccine["dose"]
        }
      end
    end
  end
end
