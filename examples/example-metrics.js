var exampleMetricsData = {
	"jvm" : {
		"vm" : {
			"name" : "Java HotSpot(TM) 64-Bit Server VM",
			"version" : "1.7.0_12-ea-b08"
		},
		"memory" : {
			"totalInit" : 1.56598464E8,
			"totalUsed" : 2.71425792E8,
			"totalMax" : 2.06733312E9,
			"totalCommitted" : 4.30178304E8,
			"heapInit" : 1.32284608E8,
			"heapUsed" : 2.26097672E8,
			"heapMax" : 1.882783744E9,
			"heapCommitted" : 3.84565248E8,
			"heap_usage" : 0.12008690468064717,
			"non_heap_usage" : 0.24561513553966174,
			"memory_pool_usages" : {
				"Code Cache" : 0.06940968831380208,
				"PS Eden Space" : 0.22890443675397878,
				"PS Old Gen" : 0.03678635634274783,
				"PS Perm Gen" : 0.31169217824935913,
				"PS Survivor Space" : 0.7691026893028846
			}
		},
		"buffers" : {
			"direct" : {
				"count" : 12,
				"memoryUsed" : 93245,
				"totalCapacity" : 93245
			},
			"mapped" : {
				"count" : 0,
				"memoryUsed" : 0,
				"totalCapacity" : 0
			}
		},
		"daemon_thread_count" : 8,
		"thread_count" : 19,
		"current_time" : 1366858716386,
		"uptime" : 1622,
		"fd_usage" : 0.03037109375,
		"thread-states" : {
			"terminated" : 0.0,
			"timed_waiting" : 0.3684210526315789,
			"blocked" : 0.05263157894736842,
			"waiting" : 0.2631578947368421,
			"runnable" : 0.3157894736842105,
			"new" : 0.0
		},
		"garbage-collectors" : {
			"PS MarkSweep" : {
				"runs" : 0,
				"time" : 0
			},
			"PS Scavenge" : {
				"runs" : 9,
				"time" : 168
			}
		}
	},
	"com.yammer.metrics.web.WebappMetricsFilter" : {
		"activeRequests" : {
			"type" : "counter",
			"count" : 1
		},
		"requests" : {
			"type" : "timer",
			"duration" : {
				"unit" : "milliseconds",
				"min" : 2.294,
				"max" : 82.915,
				"mean" : 5.227328244274809,
				"std_dev" : 4.628786889456159,
				"median" : 4.195,
				"p75" : 6.525,
				"p95" : 9.404999999999992,
				"p98" : 11.562840000000001,
				"p99" : 14.805660000000001,
				"p999" : 82.915
			},
			"rate" : {
				"unit" : "seconds",
				"count" : 393,
				"mean" : 0.24297129485189825,
				"m1" : 1.1102940588110928,
				"m5" : 0.7385209716557819,
				"m15" : 0.35230681188271795
			}
		},
		"responseCodes.badRequest" : {
			"type" : "meter",
			"event_type" : "responses",
			"unit" : "seconds",
			"count" : 0,
			"mean" : 0.0,
			"m1" : 0.0,
			"m5" : 0.0,
			"m15" : 0.0
		},
		"responseCodes.created" : {
			"type" : "meter",
			"event_type" : "responses",
			"unit" : "seconds",
			"count" : 0,
			"mean" : 0.0,
			"m1" : 0.0,
			"m5" : 0.0,
			"m15" : 0.0
		},
		"responseCodes.noContent" : {
			"type" : "meter",
			"event_type" : "responses",
			"unit" : "seconds",
			"count" : 0,
			"mean" : 0.0,
			"m1" : 0.0,
			"m5" : 0.0,
			"m15" : 0.0
		},
		"responseCodes.notFound" : {
			"type" : "meter",
			"event_type" : "responses",
			"unit" : "seconds",
			"count" : 0,
			"mean" : 0.0,
			"m1" : 0.0,
			"m5" : 0.0,
			"m15" : 0.0
		},
		"responseCodes.ok" : {
			"type" : "meter",
			"event_type" : "responses",
			"unit" : "seconds",
			"count" : 393,
			"mean" : 0.24297061106871276,
			"m1" : 1.1102940588110928,
			"m5" : 0.7385209716557819,
			"m15" : 0.35230681188271795
		},
		"responseCodes.other" : {
			"type" : "meter",
			"event_type" : "responses",
			"unit" : "seconds",
			"count" : 0,
			"mean" : 0.0,
			"m1" : 0.0,
			"m5" : 0.0,
			"m15" : 0.0
		},
		"responseCodes.serverError" : {
			"type" : "meter",
			"event_type" : "responses",
			"unit" : "seconds",
			"count" : 0,
			"mean" : 0.0,
			"m1" : 0.0,
			"m5" : 0.0,
			"m15" : 0.0
		}
	},
	"flapjack.controller.AccountController" : {
		"account" : {
			"type" : "timer",
			"duration" : {
				"unit" : "milliseconds",
				"min" : 0.0,
				"max" : 0.0,
				"mean" : 0.0,
				"std_dev" : 0.0,
				"median" : 0.0,
				"p75" : 0.0,
				"p95" : 0.0,
				"p98" : 0.0,
				"p99" : 0.0,
				"p999" : 0.0
			},
			"rate" : {
				"unit" : "seconds",
				"count" : 0,
				"mean" : 0.0,
				"m1" : 0.0,
				"m5" : 0.0,
				"m15" : 0.0
			}
		},
		"setup" : {
			"type" : "timer",
			"duration" : {
				"unit" : "milliseconds",
				"min" : 0.0,
				"max" : 0.0,
				"mean" : 0.0,
				"std_dev" : 0.0,
				"median" : 0.0,
				"p75" : 0.0,
				"p95" : 0.0,
				"p98" : 0.0,
				"p99" : 0.0,
				"p999" : 0.0
			},
			"rate" : {
				"unit" : "seconds",
				"count" : 0,
				"mean" : 0.0,
				"m1" : 0.0,
				"m5" : 0.0,
				"m15" : 0.0
			}
		}
	},
	"flapjack.controller.HomeController" : {
		"home" : {
			"type" : "timer",
			"duration" : {
				"unit" : "milliseconds",
				"min" : 0.27,
				"max" : 203.655,
				"mean" : 17.283083333333334,
				"std_dev" : 58.69198244527151,
				"median" : 0.307,
				"p75" : 0.398,
				"p95" : 203.655,
				"p98" : 203.655,
				"p99" : 203.655,
				"p999" : 203.655
			},
			"rate" : {
				"unit" : "seconds",
				"count" : 12,
				"mean" : 0.007419750354485993,
				"m1" : 0.0139475309047349,
				"m5" : 0.013224303608414464,
				"m15" : 0.008722152653117914
			}
		},
		"metrics" : {
			"type" : "timer",
			"duration" : {
				"unit" : "milliseconds",
				"min" : 0.004,
				"max" : 0.063,
				"mean" : 0.007684210526315789,
				"std_dev" : 0.013408341647310236,
				"median" : 0.005,
				"p75" : 0.005,
				"p95" : 0.063,
				"p98" : 0.063,
				"p99" : 0.063,
				"p999" : 0.063
			},
			"rate" : {
				"unit" : "seconds",
				"count" : 19,
				"mean" : 0.011747941155690554,
				"m1" : 0.020344335734731676,
				"m5" : 0.014560081102031608,
				"m15" : 0.009611065256584193
			}
		}
	},
	"net.sf.ehcache.Cache.flapjack.flapjack.entity.Session" : {
		"accuracy" : {
			"type" : "gauge",
			"value" : "None"
		},
		"eviction-count" : {
			"type" : "gauge",
			"value" : 0
		},
		"get" : {
			"type" : "timer",
			"duration" : {
				"unit" : "microseconds",
				"min" : 59.0,
				"max" : 59.0,
				"mean" : 59.0,
				"std_dev" : 0.0,
				"median" : 59.0,
				"p75" : 59.0,
				"p95" : 59.0,
				"p98" : 59.0,
				"p99" : 59.0,
				"p999" : 59.0
			},
			"rate" : {
				"unit" : "seconds",
				"count" : 1,
				"mean" : 6.187187808579032E-4,
				"m1" : 3.859236662674537E-14,
				"m5" : 1.5696006611141136E-5,
				"m15" : 1.8623437656692206E-4
			}
		},
		"hits" : {
			"type" : "gauge",
			"value" : 1
		},
		"in-memory-hits" : {
			"type" : "gauge",
			"value" : 1
		},
		"in-memory-misses" : {
			"type" : "gauge",
			"value" : 0
		},
		"in-memory-objects" : {
			"type" : "gauge",
			"value" : 0
		},
		"mean-get-time" : {
			"type" : "gauge",
			"value" : 0.052
		},
		"mean-search-time" : {
			"type" : "gauge",
			"value" : 0
		},
		"misses" : {
			"type" : "gauge",
			"value" : 0
		},
		"objects" : {
			"type" : "gauge",
			"value" : 0
		},
		"off-heap-hits" : {
			"type" : "gauge",
			"value" : 0
		},
		"off-heap-misses" : {
			"type" : "gauge",
			"value" : 0
		},
		"off-heap-objects" : {
			"type" : "gauge",
			"value" : 0
		},
		"on-disk-hits" : {
			"type" : "gauge",
			"value" : 0
		},
		"on-disk-misses" : {
			"type" : "gauge",
			"value" : 0
		},
		"on-disk-objects" : {
			"type" : "gauge",
			"value" : 0
		},
		"put" : {
			"type" : "timer",
			"duration" : {
				"unit" : "microseconds",
				"min" : 1678.0,
				"max" : 1678.0,
				"mean" : 1678.0,
				"std_dev" : 0.0,
				"median" : 1678.0,
				"p75" : 1678.0,
				"p95" : 1678.0,
				"p98" : 1678.0,
				"p99" : 1678.0,
				"p999" : 1678.0
			},
			"rate" : {
				"unit" : "seconds",
				"count" : 1,
				"mean" : 6.187183723967767E-4,
				"m1" : 3.859236662674537E-14,
				"m5" : 1.5696006611141136E-5,
				"m15" : 1.8623437656692206E-4
			}
		},
		"searches-per-second" : {
			"type" : "gauge",
			"value" : 0
		},
		"writer-queue-size" : {
			"type" : "gauge",
			"value" : 0
		}
	},
	"net.sf.ehcache.Cache.flapjack.org.hibernate.cache.internal.StandardQueryCache" : {
		"accuracy" : {
			"type" : "gauge",
			"value" : "None"
		},
		"eviction-count" : {
			"type" : "gauge",
			"value" : 0
		},
		"get" : {
			"type" : "timer",
			"duration" : {
				"unit" : "microseconds",
				"min" : 130.0,
				"max" : 760.0,
				"mean" : 365.3333333333333,
				"std_dev" : 343.89727148282714,
				"median" : 206.0,
				"p75" : 760.0,
				"p95" : 760.0,
				"p98" : 760.0,
				"p99" : 760.0,
				"p999" : 760.0
			},
			"rate" : {
				"unit" : "seconds",
				"count" : 3,
				"mean" : 0.001856157587482192,
				"m1" : 1.1577709988023582E-13,
				"m5" : 4.70880198334234E-5,
				"m15" : 5.587031297007671E-4
			}
		},
		"hits" : {
			"type" : "gauge",
			"value" : 2
		},
		"in-memory-hits" : {
			"type" : "gauge",
			"value" : 2
		},
		"in-memory-misses" : {
			"type" : "gauge",
			"value" : 1
		},
		"in-memory-objects" : {
			"type" : "gauge",
			"value" : 1
		},
		"mean-get-time" : {
			"type" : "gauge",
			"value" : 0.346
		},
		"mean-search-time" : {
			"type" : "gauge",
			"value" : 0
		},
		"misses" : {
			"type" : "gauge",
			"value" : 1
		},
		"objects" : {
			"type" : "gauge",
			"value" : 1
		},
		"off-heap-hits" : {
			"type" : "gauge",
			"value" : 0
		},
		"off-heap-misses" : {
			"type" : "gauge",
			"value" : 0
		},
		"off-heap-objects" : {
			"type" : "gauge",
			"value" : 0
		},
		"on-disk-hits" : {
			"type" : "gauge",
			"value" : 0
		},
		"on-disk-misses" : {
			"type" : "gauge",
			"value" : 0
		},
		"on-disk-objects" : {
			"type" : "gauge",
			"value" : 0
		},
		"put" : {
			"type" : "timer",
			"duration" : {
				"unit" : "microseconds",
				"min" : 76.0,
				"max" : 463.0,
				"mean" : 269.5,
				"std_dev" : 273.6503243191939,
				"median" : 269.5,
				"p75" : 463.0,
				"p95" : 463.0,
				"p98" : 463.0,
				"p99" : 463.0,
				"p999" : 463.0
			},
			"rate" : {
				"unit" : "seconds",
				"count" : 2,
				"mean" : 0.0012374375433407859,
				"m1" : 7.718473325349074E-14,
				"m5" : 3.139201322228227E-5,
				"m15" : 3.724687531338441E-4
			}
		},
		"searches-per-second" : {
			"type" : "gauge",
			"value" : 0
		},
		"writer-queue-size" : {
			"type" : "gauge",
			"value" : 0
		}
	},
	"net.sf.ehcache.Cache.flapjack.org.hibernate.cache.spi.UpdateTimestampsCache" : {
		"accuracy" : {
			"type" : "gauge",
			"value" : "None"
		},
		"eviction-count" : {
			"type" : "gauge",
			"value" : 0
		},
		"get" : {
			"type" : "timer",
			"duration" : {
				"unit" : "microseconds",
				"min" : 38.0,
				"max" : 51.0,
				"mean" : 44.5,
				"std_dev" : 9.19238815542512,
				"median" : 44.5,
				"p75" : 51.0,
				"p95" : 51.0,
				"p98" : 51.0,
				"p99" : 51.0,
				"p999" : 51.0
			},
			"rate" : {
				"unit" : "seconds",
				"count" : 2,
				"mean" : 0.0012374324917621366,
				"m1" : 7.718473325349074E-14,
				"m5" : 3.139201322228227E-5,
				"m15" : 3.724687531338441E-4
			}
		},
		"hits" : {
			"type" : "gauge",
			"value" : 1
		},
		"in-memory-hits" : {
			"type" : "gauge",
			"value" : 1
		},
		"in-memory-misses" : {
			"type" : "gauge",
			"value" : 1
		},
		"in-memory-objects" : {
			"type" : "gauge",
			"value" : 1
		},
		"mean-get-time" : {
			"type" : "gauge",
			"value" : 0.0375
		},
		"mean-search-time" : {
			"type" : "gauge",
			"value" : 0
		},
		"misses" : {
			"type" : "gauge",
			"value" : 1
		},
		"objects" : {
			"type" : "gauge",
			"value" : 1
		},
		"off-heap-hits" : {
			"type" : "gauge",
			"value" : 0
		},
		"off-heap-misses" : {
			"type" : "gauge",
			"value" : 0
		},
		"off-heap-objects" : {
			"type" : "gauge",
			"value" : 0
		},
		"on-disk-hits" : {
			"type" : "gauge",
			"value" : 0
		},
		"on-disk-misses" : {
			"type" : "gauge",
			"value" : 0
		},
		"on-disk-objects" : {
			"type" : "gauge",
			"value" : 0
		},
		"put" : {
			"type" : "timer",
			"duration" : {
				"unit" : "microseconds",
				"min" : 62.0,
				"max" : 67.0,
				"mean" : 64.5,
				"std_dev" : 3.5355339059327373,
				"median" : 64.5,
				"p75" : 67.0,
				"p95" : 67.0,
				"p98" : 67.0,
				"p99" : 67.0,
				"p999" : 67.0
			},
			"rate" : {
				"unit" : "seconds",
				"count" : 2,
				"mean" : 0.0012374316495811653,
				"m1" : 7.718473325349074E-14,
				"m5" : 3.139201322228227E-5,
				"m15" : 3.724687531338441E-4
			}
		},
		"searches-per-second" : {
			"type" : "gauge",
			"value" : 0
		},
		"writer-queue-size" : {
			"type" : "gauge",
			"value" : 0
		}
	},
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
	"org.apache.log4j.Appender": {
		"all": {
			"type": "meter",
			"event_type": "statements",
			"unit": "seconds",
			"count": 20279,
			"mean": 10.46,
			"m1": 12.94,
			"m5": 10.111,
			"m15": 7.205
		},
		"debug": {
			"type": "meter",
			"event_type": "statements",
			"unit": "seconds",
			"count": 0,
			"mean": 0,
			"m1": 0,
			"m5": 0,
			"m15": 0
		},
		"error": {
			"type": "meter",
			"event_type": "statements",
			"unit": "seconds",
			"count": 1,
			"mean": 0.000005,
			"m1": 0,
			"m5": 0,
			"m15": 0
		},
		"fatal": {
			"type": "meter",
			"event_type": "statements",
			"unit": "seconds",
			"count": 0,
			"mean": 0,
			"m1": 0,
			"m5": 0,
			"m15": 0
		},
		"info": {
			"type": "meter",
			"event_type": "statements",
			"unit": "seconds",
			"count": 20265,
			"mean": 10.45,
			"m1": 12.94,
			"m5": 10.111,
			"m15": 7.205
		},
		"trace": {
			"type": "meter",
			"event_type": "statements",
			"unit": "seconds",
			"count": 0,
			"mean": 0,
			"m1": 0,
			"m5": 0,
			"m15": 0
		},
		"warn": {
			"type": "meter",
			"event_type": "statements",
			"unit": "seconds",
			"count": 13,
			"mean": 0.000067097483045059,
			"m1": 0,
			"m5": 0,
			"m15": 0
		}
	},
};
