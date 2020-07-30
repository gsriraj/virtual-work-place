package redis

import (
	"context"
	"log"
	"os"

	"github.com/go-redis/redis/v8"
)

var ctx = context.Background()
var ClientRedis *redis.Client

func InitRedis() {
	log.Println("Redis connecting...")
	ClientRedis = redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_URI"),
		Password: os.Getenv("REDIS_PASSWORD"),
		DB:       0,
	})

	_, err := ClientRedis.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}
	log.Println("Redis Connected.")
}
