module Resolvers
  class DogsResolver < GraphQL::Schema::Resolver
    type [ Types::DogType ], null: false

    def resolve
      Dog.all
    end
  end
  class VaccinesResolver < GraphQL::Schema::Resolver
    type [ Types::VaccineType ], null: false

    def resolve
      vaccines
    end
  end
  class OnwerResolver < GraphQL::Schema::Resolver
    type [ Types::OwnerType ], null: false

    def resolve
      Owner.all
    end
  end
end
