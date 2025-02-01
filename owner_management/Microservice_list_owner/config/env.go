package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	PublicHost string
	Port       string
	DBUser     string
	DBPasswd   string
	DBAddress  string
	DBName     string
}

var Envs = InitConfig()

func InitConfig() Config {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return Config{
		PublicHost: getEnv("PUBLIC_HOST"),
		Port:       getEnv("PORT"),
		DBUser:     getEnv("DB_USER"),
		DBPasswd:   getEnv("DB_PASSWD"),
		DBAddress:  getEnv("DB_ADDR"),
		DBName:     getEnv("DB_NAME"),
	}
}

func getEnv(key string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		log.Fatalf("Missing required environment variable: %s", key)
	}
	return value
}
