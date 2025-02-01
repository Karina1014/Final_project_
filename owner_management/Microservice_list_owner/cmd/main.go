package main

import (
	"database/sql"
	"log"

	"example.com/mo/cmd/api"
	"example.com/mo/config"
	"example.com/mo/db"
	"github.com/go-sql-driver/mysql"
)

// start service
func main() {

	db, err := db.NewMySQLDB(mysql.Config{
		User:                 config.Envs.DBUser,
		Passwd:               config.Envs.DBPasswd,
		Addr:                 config.Envs.DBAddress,
		DBName:               config.Envs.DBName,
		Net:                  "tcp",
		AllowNativePasswords: true,
		ParseTime:            true,
	})
	if err != nil {
		log.Fatal(err)
	}

	initStorage(db)

	server := api.NewApiServer(":8081", db)
	if err := server.Start(); err != nil {
		log.Fatal(err)

	}

}

func initStorage(db *sql.DB) {
	err := db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	log.Println("DB: succesfully connected!")

}
