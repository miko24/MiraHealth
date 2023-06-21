package main

import (
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"syscall"
)

var bpmMetric = prometheus.NewGaugeVec(prometheus.GaugeOpts{
	Name: "bpm_metric",
	Help: "Beats per minute (bpm)",
},
	[]string{
		"MacAddress",
	},
)
var TempMetric = prometheus.NewGaugeVec(prometheus.GaugeOpts{
	Name: "Temp_metric",
	Help: "Body Temperature",
},
	[]string{
		"MacAddress",
	},
)

var PressureMetric = prometheus.NewGaugeVec(prometheus.GaugeOpts{
	Name: "Pressure_metric",
	Help: "Blood Temperature",
},
	[]string{
		"MacAddress",
	},
)

func init() {
	prometheus.MustRegister(bpmMetric)
	prometheus.MustRegister(TempMetric)
	prometheus.MustRegister(PressureMetric)
}

func main() {
	go consumeBPMFromKafka()

	http.Handle("/metrics", promhttp.Handler())

	go func() {
		err := http.ListenAndServe(":8080", nil)
		if err != nil {
			log.Fatal(err)
		}
	}()

	waitForShutdownSignal()
}

func consumeBPMFromKafka() {
	consumer, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers": "localhost:9092",
		"group.id":          "bpm-consumer",
		"auto.offset.reset": "earliest",
	})

	if err != nil {
		log.Fatal(err)
	}

	err = consumer.SubscribeTopics([]string{"bpm", "temp", "pressure"}, nil)
	if err != nil {
		log.Fatal(err)
	}
	go func() {
		for {
			msg, err := consumer.ReadMessage(-1)
			if err == nil {
				bpm, err := strconv.ParseFloat(string(msg.Value), 64)
				if err != nil {
					log.Printf("Failed to parse BPM value: %v", err)
				} else {
					if *(msg.TopicPartition.Topic) == "bpm" {
						bpmMetric.WithLabelValues(string(msg.Key)).Set(bpm)
					} else if *(msg.TopicPartition.Topic) == "temp" {
						TempMetric.WithLabelValues(string(msg.Key)).Set(bpm)
					} else {
						PressureMetric.WithLabelValues(string(msg.Key)).Set(bpm)
					}
				}
			} else {
				log.Printf("Failed to read message from Kafka: %v", elrr)
			}
		}
	}()

	// Wait indefinitely
	select {}
}

func waitForShutdownSignal() {
	signals := make(chan os.Signal, 1)
	signal.Notify(signals, os.Interrupt, syscall.SIGTERM)
	<-signals
}
