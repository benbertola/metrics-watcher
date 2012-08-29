metrics-watcher
===============

JavaScript library that graphs Metrics(http://metrics.codahale.com) and allows for realtime updating of graph data using the Metrics servlet.

This library depends on using the following other libraries in your applications:
- Metrics is a Java library used for monitoring your application performance and behaviors.  It provides many useful metric implementations such as a Timer, Counter, and Meter.
- Metrics-servlet allows you to expose this metric information as JSON data.

The Metrics-Watcher library can read data in this JSON format and will generate a dynamic HTML graph.
