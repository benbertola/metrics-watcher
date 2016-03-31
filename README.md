Metrics-Watcher
===============
JavaScript library that graphs Metrics(http://metrics.dropwizard.io) and allows for 
real time updating of graph data using the Metrics servlet.

This library depends on using the following other libraries in your applications:
- Metrics is a Java library used for monitoring your application performance and behaviors.  
	It provides many useful metric implementations such as a Timer, Counter, and Meter.
- Metrics-servlet allows you to expose this metric information as JSON data.
- Bootstrap(http://twitter.github.com/bootstrap/) is an open source UI framework written by Twitter and is used for Metrics-watcher layout and progress bars
- jQuery(http://jquery.com/).  Enough said.

You can find a working example in the examples folder, and view it's source to get a better idea of the usage.
You can also find an example of metrics-watcher integrated into a java webapp here: https://github.com/depsypher/flapjack
