package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"strconv"
	"time"

	kafka "github.com/segmentio/kafka-go"
)

var intervals = [][]int{[]int{54, 59}, []int{60, 64}, []int{65, 68}, []int{69, 72}, []int{73, 76}, []int{77, 82}, []int{83, 100}}

var temp_intervals = [][]int{[]int{36, 38}, []int{38, 41}}

var Pressure_intervals = [][]int{[]int{50, 119}, []int{120, 139}, []int{140, 159}, []int{160, 180}, []int{181, 200}}

var current_interval_index = 4

var current_temp_interval = 0

var current_pressure_interval = 0

func change_current_interval() {
	current_interval_index = rand.Intn(len(intervals))
	current_temp_interval = rand.Intn(len(temp_intervals))
	current_pressure_interval = rand.Intn(len(Pressure_intervals))
}
func change_interval(ticker *time.Ticker) {
	for {
		select {
		case <-ticker.C:
			change_current_interval()
		}
	}
}
func main() {
	topic := "bpm"
	tempTopic := "temp"
	pressureTopic := "pressure"
	partition := 0
	ticker := time.NewTicker(1 * time.Minute)
	go change_interval(ticker)
	go sendHeartbeats(topic, partition)
	go sendHeartbeats(tempTopic, partition)
	go sendHeartbeats(pressureTopic, partition)

	select {}
}

func sendHeartbeats(topic string, partition int) {
	conn, err := kafka.DialLeader(context.Background(), "tcp", "localhost:9092", topic, partition)
	if err != nil {
		log.Fatal("failed to dial leader:", err)
	}

	defer func() {
		if err := conn.Close(); err != nil {
			log.Fatal("failed to close writer:", err)
		}
	}()

	for {
		err = conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
		if err != nil {
			log.Fatal("failed to set write deadline:", err)
		}
		var data string
		if topic == "bpm" {
			data = simulateHeartbeat()
		} else if topic == "temp" {
			data = simulateTemperature()
		} else {
			data = simulatePressure()
		}
		fmt.Println(data)
		// Simulate heartbeat value (replace with your own logic)
		_, err = conn.WriteMessages(
			kafka.Message{
				Value: []byte(data),
				Key:   []byte("MAC1"),
			},
		)
		if err != nil {
			log.Fatal("failed to write messages:", err)
		}

		// Sleep for 1 second before sending the next heartbeat
		time.Sleep(1 * time.Second)
	}
}

func simulateHeartbeat() string {
	min := intervals[current_interval_index][0]
	max := intervals[current_interval_index][1]
	bpm := rand.Intn(max-min) + min
	return strconv.Itoa(bpm)
}

func simulateTemperature() string {
	min := temp_intervals[current_temp_interval][0]
	max := temp_intervals[current_temp_interval][1]
	temp := rand.Intn(max-min) + min
	return strconv.Itoa(temp)
}
func simulatePressure() string {
	min := Pressure_intervals[current_pressure_interval][0]
	max := Pressure_intervals[current_pressure_interval][1]
	pressure := rand.Intn(max-min) + min
	return strconv.Itoa(pressure)
}
