/*****************************************************************************
 * Metrics-Watcher
 *
 * Copyright 2012 Ben Bertola and iovation, Inc.
 *
 * To use this library:
 * 1. Call metricsWatcher.addXXX() for each graph you want on your page
 * 2. Call metricsWatcher.initGraphs() once to draw the initial graphs
 * 3. Call metricsWatcher.updateGraphs(jsonData) with JSON data from your
 *    metrics/servlet as often as you'd like your graphs to update
 *
 *****************************************************************************/

(function(metricsWatcher, $, undefined) {

	/**
	 * Add a Gauge type graph to your page.
	 *
	 * @param divId The id of the div to draw the graph in
	 * @param className The class name of your metrics data, from the metrics servlet
	 * @param metricName The metric name of your metrics data, from the metrics servlet
	 * @param title The user-displayed title of this graph
	 */
	metricsWatcher.addGauge = function(divId, className, metricName, title) {
		var metricInfo = new MetricInfo(divId, className, metricName, null, title, 'gauge');
		graphs.push(metricInfo);
	}

	/**
	 * Add a Meter type graph to your page.
	 *
	 * @param divId The id of the div to draw the graph in
	 * @param className The class name of your metrics data, from the metrics servlet
	 * @param metricName The metric name of your metrics data, from the metrics servlet
	 * @param max What the max value target is, used to determine the % width of progress bars for this graph
	 * @param title The user-displayed title of this graph
	 */
	metricsWatcher.addMeter = function(divId, className, metricName, max, title, eventType) {
		if (eventType == undefined) eventType = 'Calls';
		var metricInfo = new MetricInfo(divId, className, metricName, max, title, 'meter');
		metricInfo.eventType = eventType;
		graphs.push(metricInfo);
	}

	/**
	 * Add a Counter graph
	 *
	 * @param divId The id of the div to draw the graph in
	 * @param className The class name of your metrics data, from the metrics servlet
	 * @param metricName The metric name of your metrics data, from the metrics servlet
	 * @param max What the max value target is, used to determine the % width of progress bars for this graph
	 * @param title The user-displayed title of this graph
	 */
	metricsWatcher.addCounter = function(divId, className, metricName, max, title) {
		var metricInfo = new MetricInfo(divId, className, metricName, max, title, 'counter');
		graphs.push(metricInfo);
	}

	/**
	 * Add a linked Counter graph. Linked Counters differ from a plain counter graph in that both the numerator and denominator
	 * of a linked counter graph each come from individual Counter Metrics.
	 *
	 * @param divId The id of the div to draw the graph in
	 * @param className The class name of your metrics data, from the metrics servlet
	 * @param metricName The metric name of your metrics data, from the metrics servlet
	 * @param maxClassName
	 * @param maxMetricName
	 * @param title The user-displayed title of this graph
	 */
	metricsWatcher.addLinkedCounter = function(divId, className, metricName, maxClassName, maxMetricName, title) {
		var metricInfo = new MetricInfo(divId, className, metricName, null, title, "counter");
		metricInfo.maxClassName = maxClassName;
		metricInfo.maxMetricName = maxMetricName;

		metricInfo.getMax = function(json) {
			var maxNode = this.getMetricNode(this.maxClassName, this.maxMetricName, json);
			return maxNode["count"];
		};
		graphs.push(metricInfo);
	}

	/**
	 * Add a Timer graph. This will include a Meter, Timing Info, and a Histogram.
	 *
	 * @param divId The id of the div to draw the graph in
	 * @param className The class name of your metrics data, from the metrics servlet
	 * @param metricName The metric name of your metrics data, from the metrics servlet
	 * @param max The max target value for the Meter, showing frequency
	 * @param title The user-displayed title of this graph
	 * @param eventType a name for this event type
	 * @param durationMax The max target value for duration
	 */
	metricsWatcher.addTimer = function(divId, className, metricName, max, title, eventType, durationMax) {
		var timer = addTimerInternal(divId, className, metricName, max, title, eventType, durationMax, false);
		graphs.push(timer);
	}

	/**
	 * Add an ehcache graph.
	 *
	 * @param divId The id of the div to draw the graph in
	 * @param className The class name of your metrics data, from the metrics servlet
	 * @param title The user-displayed title of this graph
	 */
	metricsWatcher.addCache = function(divId, className, title) {
		var metricInfo = new MetricInfo(divId, className, null, null, title, "cache");

		metricInfo.components = {
			gauges : [
				new MetricInfo(null, className, "hits", null, "Hits", "gauge"),
				new MetricInfo(null, className, "misses", null, "Misses", "gauge"),
				new MetricInfo(null, className, "objects", null, "Objects", "gauge"),
				new MetricInfo(null, className, "eviction-count", null, "Eviction Count", "gauge"),
				new MetricInfo(null, className, "in-memory-hits", null, "In Memory Hits", "gauge"),
				new MetricInfo(null, className, "in-memory-misses", null, "In Memory Misses", "gauge"),
				new MetricInfo(null, className, "in-memory-objects", null, "In Memory Objects", "gauge"),
				new MetricInfo(null, className, "off-heap-hits", null, "Off Heap Hits", "gauge"),
				new MetricInfo(null, className, "off-heap-misses", null, "Off Heap Misses", "gauge"),
				new MetricInfo(null, className, "off-heap-objects", null, "Off Heap Objects", "gauge"),
				new MetricInfo(null, className, "on-disk-hits", null, "On Disk Hits", "gauge"),
				new MetricInfo(null, className, "on-disk-misses", null, "On Disk Misses", "gauge"),
				new MetricInfo(null, className, "on-disk-objects", null, "On Disk Objects", "gauge"),
				new MetricInfo(null, className, "mean-get-time", null, "Mean Get Time", "gauge"),
				new MetricInfo(null, className, "mean-search-time", null, "Mean Search Time", "gauge"),
				new MetricInfo(null, className, "searches-per-second", null, "Searches Per Sec", "gauge"),
				new MetricInfo(null, className, "writer-queue-size", null, "Writer Queue Size", "gauge"),
				new MetricInfo(null, className, "accuracy", null, "Accuracy", "gauge")
			]
		};
		metricInfo.getTimer = addTimerInternal(divId + "gettimer", className, "get", 1000, "Get", "get", 1000, true);
		metricInfo.putTimer = addTimerInternal(divId + "puttimer", className, "put", 1000, "Put", "put", 10000, true);

		graphs.push(metricInfo);
	}

	/**
	 * Add a JVM graph.
	 *
	 * @param divId The id of the div to draw the graph in
	 * @param className The class name of your metrics data, from the metrics servlet
	 * @param title The user-displayed title of this graph
	 */
	metricsWatcher.addJvm = function(divId, className, title) {
		var metricInfo = new MetricInfo(divId, className, null, null, title, "jvm");
		graphs.push(metricInfo);
	}

	/**
	 * Add a web server graph.
	 *
	 * @param divId The id of the div to draw the graph in
	 * @param className The class name of your metrics data, from the metrics servlet
	 * @param title The user-displayed title of this graph
	 */
	metricsWatcher.addWeb = function(divId, className, title) {
		var metricInfo = new MetricInfo(divId, className, null, null, title, "web");

		metricInfo.components = {
			meters : [
				new MetricInfo(divId + " td.responseCodesOkGraph", className, "responseCodes.ok", 10, "OK Responses", "meter"),
				new MetricInfo(divId + " td.responseCodesBadRequestGraph", className, "responseCodes.badRequest", 10, "Bad Requests", "meter"),
				new MetricInfo(divId + " td.responseCodesCreatedGraph", className, "responseCodes.created", 10, "Created Responses", "meter"),
				new MetricInfo(divId + " td.responseCodesNoContentGraph", className, "responseCodes.noContent", 10, "No Content Responses", "meter"),
				new MetricInfo(divId + " td.responseCodesNotFoundGraph", className, "responseCodes.notFound", 10, "Not Found Responses", "meter"),
				new MetricInfo(divId + " td.responseCodesOtherGraph", className, "responseCodes.other", 10, "Other Responses", "meter"),
				new MetricInfo(divId + " td.responseCodesServerErrorGraph", className, "responseCodes.serverError", 10, "Server Error Responses", "meter")
			],
			activeRequestsInfo : new MetricInfo(divId + " td.activeRequestsGraph", className, "activeRequests", 10, "Active Requests", "counter"),
			requestsInfo : addTimerInternal(divId + " td.requestsGraph", className, "requests", 100, "Requests", "requests", 100, true)
		};

		graphs.push(metricInfo);
	}

	/**
	 * Initialized each of the graphs that you have added through addXXX() calls,
	 * and draws them on the screen for the first time
	 */
	metricsWatcher.initGraphs = function() {
		// draw all graphs for the first time
		for (var i = 0; i < graphs.length; i++) {
			if (graphs[i].type == "gauge")
				drawGauge(graphs[i]);
			else if (graphs[i].type == "meter")
				drawMeter(graphs[i]);
			else if (graphs[i].type == "counter")
				drawCounter(graphs[i]);
			else if (graphs[i].type == "timer")
				drawTimer(graphs[i]);
			else if (graphs[i].type == "cache")
				drawCache(graphs[i]);
			else if (graphs[i].type == "jvm")
				drawJvm(graphs[i]);
			else if (graphs[i].type == "web")
				drawWeb(graphs[i]);
			else
				alert("Unknown meter info type: " + graphs[i].type);
		}
	}

	/**
	 * Update the existing graphs with new data. You can call this method as frequently as you would
	 * like to, and all graph info will be updated.
	 *
	 * @param json The root of the json node returned from your ajax call to the metrics servlet
	 */
	metricsWatcher.updateGraphs = function(json) {
		for (var i = 0; i < graphs.length; i++) {
			if (graphs[i].type == "gauge")
				updateGauge(graphs[i], json);
			else if (graphs[i].type == "meter")
				updateMeter(graphs[i], json);
			else if (graphs[i].type == "counter")
				updateCounter(graphs[i], json);
			else if (graphs[i].type == "timer")
				updateTimer(graphs[i], json);
			else if (graphs[i].type == "cache")
				updateCache(graphs[i], json);
			else if (graphs[i].type == "jvm")
				updateJvm(graphs[i], json);
			else if (graphs[i].type == "web")
				updateWeb(graphs[i], json);
			else
				alert("Unknown meter info type: " + graphs[i].type);
		}
	}

	/*
	 * Private Methods
	 */
	var graphs = [];

	function MetricInfo(divId, className, metricName, max, title, type) {
		this.divId = divId;
		this.className = className;
		this.metricName = metricName;
		this.max = max;
		this.title = title;
		this.type = type;

		this.getMax = function(json) {
			return this.max;
		};
		this.getMetricNode = function getMetricNode(className, metricName, jsonRoot) {
			return !jsonRoot[className] ? null : jsonRoot[className][metricName];
		};
	}

	function calculatePercentage(currentVal, maxVal) {
		var p = (currentVal / maxVal) * 100;
		return p.toFixed(0);
	}

	function formatNumber(varNumber, n) {
		if (!n) n = 1;
		return varNumber.toFixed(n);
	}

	function capitalizeFirstLetter(input) {
		return input.charAt(0).toUpperCase() + input.slice(1);
	}

	function addTimerInternal(divId, className, metricName, max, title, eventType, durationMax, isNested) {
		var metricInfo = new MetricInfo(divId, className, metricName, max, title, 'timer');

		metricInfo.getMeterInfo = function() {
			var myDivId = this.divId + " div.timerGraph td.meterGraph";
			var retVal = new MetricInfo(myDivId, this.className, this.metricName, this.max, "Frequency", 'meter');

			retVal.getMetricNode = function(className, metricName, jsonRoot) {
				return !jsonRoot[className] ? null : jsonRoot[className][metricName]["rate"];
			};

			retVal.eventType = eventType;
			return retVal;
		};

		metricInfo.getTimerStatsDivId = function() {
			return "#" + this.divId + " div.timerGraph td.timerStatsGraph";
		};
		metricInfo.getTimerHistogramDivId = function() {
			return "#" + this.divId + " div.timerGraph td.timerHistogram";
		};
		metricInfo.durationMax = durationMax;
		metricInfo.isNested = isNested;

		return metricInfo;
	}

	/*
	 * Counter methods
	 */
	function drawCounter(counterInfo) {
		var parentDiv = $("#" + counterInfo.divId);
		var html = "<div class='metricsWatcher counter counterGraph'><h3>" + counterInfo.title
				+ "</h3><div class='progress'><div class='bar' style='width: 0%;'></div></div></div>";
		parentDiv.html(html);
	}

	function updateCounter(counterInfo, json) {
		var metricData = counterInfo.getMetricNode(counterInfo.className, counterInfo.metricName, json);
		var pct = calculatePercentage(metricData.count, counterInfo.getMax(json));

		$("#" + counterInfo.divId + " div.progress div.bar").css("width", pct + "%");
		$("#" + counterInfo.divId + " div.progress div.bar").html(metricData.count + "/" + counterInfo.getMax(json));
	}

	/*
	 * Timer methods
	 */
	function drawTimer(timerInfo) {
		var parentDiv = $("#" + timerInfo.divId);

		var nested = (timerInfo.isNested) ? " nested" : "";
		var html = "<div class='metricsWatcher timer timerGraph" + nested + "'>"
				+ "<fieldset><legend><h1>" + timerInfo.title + "</h1></legend>"
				+ "<div class='timerContainer span12'>"
				+ "<table><tr>"
				+ "<td class='meterGraph span4'></td>"
				+ "<td class='timerStatsGraph span4'></td>"
				+ "<td class='timerHistogram span4'></td>"
				+ "</tr></table></div></fieldset>";
		parentDiv.html(html);

		drawMeter(timerInfo.getMeterInfo());
		drawDurationStats(timerInfo);
		drawDurationHistogram(timerInfo);
	}

	function drawDurationStats(timerInfo) {
		var html = "<h3>Duration</h3><p></p><div class='metricGraph'><table class='progressTable'>"
			+ addMeterRow("Min", "min")
			+ addMeterRow("Mean", "mean")
			+ addMeterRow("Median", "median")
			+ addMeterRow("Max", "max")
			+ addMeterRow("Std&nbsp;Dev", "std_dev")
			+ "</table></div>";
		var parentDiv = $(timerInfo.getTimerStatsDivId());
		parentDiv.html(html);
	}

	function drawDurationHistogram(timerInfo) {
		var html = "<h3>Histogram</h3><p>Percentiles</p><div class='metricGraph'><table class='progressTable'>"
			+ addMeterRow("99.9%", "p999")
			+ addMeterRow("99%", "p99")
			+ addMeterRow("98%", "p98")
			+ addMeterRow("95%", "p95")
			+ addMeterRow("75%", "p75")
			+ "</table></div>";
		var parentDiv = $(timerInfo.getTimerHistogramDivId());
		parentDiv.html(html);
	}

	function updateTimer(timerInfo, json) {
		updateMeter(timerInfo.getMeterInfo(), json);
		updateDurationStats(timerInfo, json);
		updateDurationHistogram(timerInfo, json);
	}

	function updateDurationStats(timerInfo, json) {
		var metricNode = timerInfo.getMetricNode(timerInfo.className, timerInfo.metricName, json);
		if (!metricNode) return;
		var metricData = metricNode["duration"];

		var timeUnitDiv = $(timerInfo.getTimerStatsDivId() + " p");
		timeUnitDiv.html(capitalizeFirstLetter(metricData["unit"]));

		updateDuration(timerInfo.getTimerStatsDivId(), metricData, "min", timerInfo.durationMax);
		updateDuration(timerInfo.getTimerStatsDivId(), metricData, "mean", timerInfo.durationMax);
		updateDuration(timerInfo.getTimerStatsDivId(), metricData, "median", timerInfo.durationMax);
		updateDuration(timerInfo.getTimerStatsDivId(), metricData, "max", timerInfo.durationMax);
		updateDuration(timerInfo.getTimerStatsDivId(), metricData, "std_dev", timerInfo.durationMax);
	}

	function updateDuration(timerStatsDivId, durationData, style, max) {
		$(timerStatsDivId + " tr." + style + " td.progressValue").html(formatNumber(durationData[style]));
		$(timerStatsDivId + " tr." + style + " td.progressBar div.progress div.bar")
			.css("width", calculatePercentage(durationData[style], max) + "%");
	}

	function updateDurationHistogram(timerInfo, json) {
		var metricNode = timerInfo.getMetricNode(timerInfo.className, timerInfo.metricName, json);
		if (!metricNode) return;
		var metricData = metricNode["duration"];

		updateDuration(timerInfo.getTimerHistogramDivId(), metricData, "p999", timerInfo.durationMax);
		updateDuration(timerInfo.getTimerHistogramDivId(), metricData, "p99", timerInfo.durationMax);
		updateDuration(timerInfo.getTimerHistogramDivId(), metricData, "p98", timerInfo.durationMax);
		updateDuration(timerInfo.getTimerHistogramDivId(), metricData, "p95", timerInfo.durationMax);
		updateDuration(timerInfo.getTimerHistogramDivId(), metricData, "p75", timerInfo.durationMax);
	}

	/*
	 * Meter methods
	 */
	function drawMeter(meterInfo) {
		var parentDiv = $("#" + meterInfo.divId);

		var html = "<div class='metricsWatcher metric metricGraph'><h3>" + meterInfo.title
			+ "</h3><p></p><table class='progressTable'>"
			+ addMeterRow("1&nbsp;min", "onemin")
			+ addMeterRow("5&nbsp;min", "fivemin")
			+ addMeterRow("15&nbsp;min", "fifteenmin")
			+ addMeterRow("Mean", "mean")
			+ "</table></div>";
		parentDiv.html(html);
	}

	function addMeterRow(type, className) {
		return "<tr class='" + className + "'><td class='progressLabel'>" + type + "</td>"
			+ "<td class='progressBar'><div class='progress'><div class='bar' style='width: 0%;'></div>"
			+ "</div></td><td class='progressValue'>0</td></tr>";
	}

	function updateMeter(meterInfo, json) {
		var metricData = meterInfo.getMetricNode(meterInfo.className, meterInfo.metricName, json);
		if (metricData) {
			updateMeterData(meterInfo, metricData);
		}
	}

	function updateMeterData(meterInfo, meterData) {
		// set the big counter
		var gaugeDiv = $("#" + meterInfo.divId + " p");

		// the type per unit
		var eventType = meterInfo.eventType;
		if (!eventType) {
			eventType = meterData["event_type"];
		}

		// some naive pluralization rules, can get more fancy if needed
		if (meterData.count > 1 && eventType === "get") {
			eventType = "gets";
		} else if (meterData.count > 1 && eventType === "put") {
			eventType = "puts";
		}

		var unit = meterData.unit;
		if (unit === "seconds") {
			unit = "second";
		}

		gaugeDiv.html(eventType + " per " + unit + " (" + meterData.count + " total)");

		// set the mean count
		setMeterRow(meterInfo, meterData, "mean", "mean");
		setMeterRow(meterInfo, meterData, "m1", "onemin");
		setMeterRow(meterInfo, meterData, "m5", "fivemin");
		setMeterRow(meterInfo, meterData, "m15", "fifteenmin");
	}

	function setMeterRow(meterInfo, meterData, rowType, rowStyle) {
		$("#" + meterInfo.divId + " tr." + rowStyle + " td.progressValue").html(formatNumber(meterData[rowType]));
		$("#" + meterInfo.divId + " tr." + rowStyle + " td.progressBar div.progress div.bar")
			.css("width", calculatePercentage(meterData[rowType], meterInfo.max) + "%");
	}

	/*
	 * Gauge methods
	 */
	function drawGauge(gaugeInfo) {
		var parentDiv = $("#" + gaugeInfo.divId);
		var html = "<div class='metricsWatcher metric metricGraph'><h3>" + gaugeInfo.title + "</h3><h1></h1></div>";
		parentDiv.html(html);
	}
	function updateGauge(gaugeInfo, json) {
		var metricData = gaugeInfo.getMetricNode(gaugeInfo.className, gaugeInfo.metricName, json);
		if (metricData) {
			updateGaugeData(gaugeInfo, metricData);
		}
	}
	function updateGaugeData(gaugeInfo, gaugeData) {
		var gaugeDiv = $("#" + gaugeInfo.divId + " h1");
		gaugeDiv.html(gaugeData.value);
	}

	/*
	 * GaugeTable methods
	 */
	function drawGaugeTable(divId, title, gauges) {
		var parentDiv = $("#" + divId);
		var html = "<div class='metricsWatcher metric metricGraph nested'>"
				+ "<fieldset><legend><h1>" + title + "</h1></legend>"
				+ "<div class='gaugeTableContainer'><table class='gaugeTable'></table></div></fieldset></div>";

		parentDiv.html(html);
	}
	function updateGaugeTable(divId, gauges, json) {
		var div = $("#" + divId + " table");

		var html = "";
		var length = gauges.length;
		for (var i = 0; i < length; i++) {
			var gauge = gauges[i];
			html += "<tr><td><h5>" + gauge.title + "</h5></td>"
				+ "<td><h4>" + gauge.getMetricNode(gauge.className, gauge.metricName, json).value
				+ "</h4></td></tr>";
		}
		div.html(html);
	}

	/*
	 * Cache methods
	 */
	function drawCache(cacheInfo) {
		var parentDiv = $("#" + cacheInfo.divId);

		var html = "<div class='metricsWatcher cache cacheGraph span12'>"
				+ "<fieldset><legend><h1>" + cacheInfo.title + "</h1></legend>"
				+ "<div class='cacheContainer span12'>"
				+ "	<div class='row-fluid'>"
				+ "		<div class='span3'><div id='" + cacheInfo.divId + "Statistics'></div></div>"
				+ "		<div class='span9'>"
				+ "			<div id='" + cacheInfo.divId + "gettimer'></div>"
				+ "			<div id='" + cacheInfo.divId + "puttimer'></div>"
				+ "		</div>"
				+ "	</div>"
				+ "</div></fieldset></div>";
		parentDiv.html(html);

		var length = cacheInfo.components.gauges.length;
		for (var i = 0; i < length; i++) {
			drawGauge(cacheInfo.components.gauges[i]);
		}
		drawTimer(cacheInfo.getTimer);
		drawTimer(cacheInfo.putTimer);
		drawGaugeTable(cacheInfo.divId + "Statistics", "Statistics", cacheInfo.components.gauges);
	}
	function updateCache(cacheInfo, json) {
		var length = cacheInfo.components.gauges.length;
		for (var i = 0; i < length; i++) {
			var gauge = cacheInfo.components.gauges[i];
			var data = gauge.getMetricNode(cacheInfo.className, gauge.metricName, json);
			if (data) {
				var gaugeDiv = $("#" + gauge.divId + " div.metricGraph h1");
				gaugeDiv.html(data.value);
			}
		}
		updateTimer(cacheInfo.getTimer, json);
		updateTimer(cacheInfo.putTimer, json);
		updateGaugeTable(cacheInfo.divId + "Statistics", cacheInfo.components.gauges, json);
	}

	/*
	 * JVM methods
	 */
	function drawJvm(jvmInfo) {
		var parentDiv = $("#" + jvmInfo.divId);
		var html = "<div class='metricsWatcher jvm metricGraph span12'>"
				+ "<fieldset><legend><h1>" + jvmInfo.title + "</h1></legend>"
				+ "<div class='jvmContainer span12'>"
				+ "	<div id='" + jvmInfo.divId + "Vm'></div>"
				+ "</div>"
				+ "</fieldset></div>";
		parentDiv.html(html);
	}

	function updateJvm(jvmInfo, json) {
		var vmDiv = $("#" + jvmInfo.divId + "Vm");
		var jvm = json[jvmInfo.className];
		var html = "<div class='row-fluid'>"
				+ "<div class='span3'><table class='jvmTable'>"
				+ "<tr><td class='rowName'><h5>Name</h5></td><td>" + jvm.vm.name + "</td></tr>"
				+ "<tr><td><h5>Version</h5></td><td>" + jvm.vm.version + "</td></tr>"
				+ "<tr><td><h5>Current Time</h5></td><td>" + jvm.current_time + "</td></tr>"
				+ "<tr><td><h5>Uptime</h5></td><td>" + jvm.uptime + "</td></tr>"
				+ "<tr><td><h5>FD Usage</h5></td><td>" + formatNumber(jvm.fd_usage, 2) + "</td></tr>"
				+ "<tr><td><h5>Daemon Threads</h5></td><td>" + jvm.daemon_thread_count + "</td></tr>"
				+ "<tr><td><h5>Threads</h5></td><td>" + jvm.thread_count + "</td></tr>"
				+ "</table></div>"
				+ "<div class='span3'><table class='jvmTable'>"
				+ "<tr><td><h5>Total Init</h5></td><td>" + jvm.memory.totalInit + "</td></tr>"
				+ "<tr><td><h5>Total Used</h5></td><td>" + jvm.memory.totalUsed + "</td></tr>"
				+ "<tr><td><h5>Total Max</h5></td><td>" + jvm.memory.totalMax + "</td></tr>"
				+ "<tr><td><h5>Total Committed</h5></td><td>" + jvm.memory.totalCommitted + "</td></tr>"
				+ "<tr><td><h5>Heap Init</h5></td><td>" + jvm.memory.heapInit + "</td></tr>"
				+ "<tr><td><h5>Heap Used</h5></td><td>" + jvm.memory.heapUsed + "</td></tr>"
				+ "<tr><td><h5>Heap Max</h5></td><td>" + jvm.memory.heapMax + "</td></tr>"
				+ "<tr><td><h5>Heap Committed</h5></td><td>" + jvm.memory.heapCommitted + "</td></tr>"
				+ "<tr><td><h5>Heap Usage</h5></td><td>" + formatNumber(jvm.memory.heap_usage, 2) + "</td></tr>"
				+ "<tr><td><h5>Non Heap Usage</h5></td><td>" + formatNumber(jvm.memory.non_heap_usage, 2) + "</td></tr>"
				+ "</table></div>"
				+ "<div class='span3'><table class='jvmTable'>"
				+ "<tr><td><h5>Code Cache</h5></td><td>" + formatNumber(jvm.memory.memory_pool_usages['Code Cache'], 2) + "</td></tr>"
				+ "<tr><td><h5>PS Eden Space</h5></td><td>" + formatNumber(jvm.memory.memory_pool_usages['PS Eden Space'], 2) + "</td></tr>"
				+ "<tr><td><h5>PS Old Gen</h5></td><td>" + formatNumber(jvm.memory.memory_pool_usages['PS Old Gen'], 2) + "</td></tr>"
				+ "<tr><td><h5>PS Perm Gen</h5></td><td>" + formatNumber(jvm.memory.memory_pool_usages['PS Perm Gen'], 2) + "</td></tr>"
				+ "<tr><td><h5>PS Survivor Space</h5></td><td>" + formatNumber(jvm.memory.memory_pool_usages['PS Survivor Space'], 2) + "</td></tr>"
				+ "<tr><td><h5>PS Mark Sweep Runs</h5></td><td>" + jvm['garbage-collectors']['PS MarkSweep'].runs + "</td></tr>"
				+ "<tr><td><h5>PS Mark Sweep Time</h5></td><td>" + jvm['garbage-collectors']['PS MarkSweep'].time + "</td></tr>"
				+ "<tr><td><h5>PS Scavenge Runs</h5></td><td>" + jvm['garbage-collectors']['PS Scavenge'].runs + "</td></tr>"
				+ "<tr><td><h5>PS Scavenge Time</h5></td><td>" + jvm['garbage-collectors']['PS Scavenge'].time + "</td></tr>"
				+ "</table></div>"
				+ "<div class='span3'><table class='jvmTable'>"
				+ "<tr><td><h5>Terminated</h5></td><td>" + jvm['thread-states'].terminated + "</td></tr>"
				+ "<tr><td><h5>Timed Waiting</h5></td><td>" + formatNumber(jvm['thread-states'].timed_waiting, 2) + "</td></tr>"
				+ "<tr><td><h5>Blocked</h5></td><td>" + formatNumber(jvm['thread-states'].blocked, 2) + "</td></tr>"
				+ "<tr><td><h5>Waiting</h5></td><td>" + formatNumber(jvm['thread-states'].waiting, 2) + "</td></tr>"
				+ "<tr><td><h5>Runnable</h5></td><td>" + formatNumber(jvm['thread-states'].runnable, 2) + "</td></tr>"
				+ "<tr><td><h5>New</h5></td><td>" + jvm['thread-states']['new'] + "</td></tr>"
				+ "</table></div></div>";

		vmDiv.html(html);
	}

	/*
	 * Web Server methods
	 */
	function drawWeb(webInfo) {
		var parentDiv = $("#" + webInfo.divId);
		var html = "<div class='metricsWatcher web metricGraph span12'>"
				+ "<fieldset><legend><h1>" + webInfo.title + "</h1></legend>"
				+ "<div class='webContainer span12'>"
				+ "	<div id='" + webInfo.divId + "Web'></div>"
				+ "<table><tr>"
				+ "<td colspan='4' class='requestsGraph span12'></td>"
				+ "</tr><tr>"
				+ "<td class='activeRequestsGraph span3'></td>"
				+ "<td class='responseCodesOkGraph span3'></td>"
				+ "<td class='responseCodesCreatedGraph span3'></td>"
				+ "<td class='responseCodesOtherGraph span3'></td>"
				+ "</tr><tr>"
				+ "<td class='responseCodesBadRequestGraph span3'></td>"
				+ "<td class='responseCodesNoContentGraph span3'></td>"
				+ "<td class='responseCodesNotFoundGraph span3'></td>"
				+ "<td class='responseCodesServerErrorGraph span3'></td>"
				+ "</tr></table>"
				+ "</div>"
				+ "</fieldset></div>";
		parentDiv.html(html);

		drawTimer(webInfo.components.requestsInfo);
		drawCounter(webInfo.components.activeRequestsInfo);

		var length = webInfo.components.meters.length;
		for (var i = 0; i < length; i++) {
			drawMeter(webInfo.components.meters[i]);
		}
	}

	function updateWeb(webInfo, json) {
		updateTimer(webInfo.components.requestsInfo, json);
		updateCounter(webInfo.components.activeRequestsInfo, json);

		var length = webInfo.components.meters.length;
		for (var i = 0; i < length; i++) {
			updateMeter(webInfo.components.meters[i], json);
		}
	}

}(window.metricsWatcher = window.metricsWatcher || {}, jQuery));
