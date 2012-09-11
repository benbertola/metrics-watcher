
var exampleMetricsData = {
		"com.iovation.metrics.watcher.example.ConnectionPool": {
			"connectionsCreatedCounter": {
				"type": "counter",
				"count": 100
			},
			"connectionsInUseCounter": {
				"type": "counter",
				"count": 95
			}
		},
		"com.iovation.metrics.watcher.example.Dao": {
			"dao-writes-meter": {
				"type": "meter",
				"event_type": "writes",
				"unit": "seconds",
				"count": 19878,
				"mean": 415.593525697648,
				"m1": 249.3169456082525,
				"m5": 56.43627258416915,
				"m15": 19.2144864490242
			}
		},

		"com.iovation.metrics.watcher.example.Service": {
			"requestsTimer": {
				"type": "timer",
				"duration": {
					"unit": "milliseconds",
					"min": 0.412,
					"max": 54.25,
					"mean": 6.141547368421053,
					"std_dev": 9.148429508846602,
					"median": 2.152,
					"p75": 8.667,
					"p95": 32.48379999999998,
					"p98": 42.50803999999998,
					"p99": 54.25,
					"p999": 54.25
				},
				"rate": {
					"unit": "seconds",
					"count": 95,
					"mean": 120.0827770126312752,
					"m1": 110.1128301961599272,
					"m5": 100.2942094879730006,
					"m15": 100.10298190692116876
				}
			}
		}
	};
