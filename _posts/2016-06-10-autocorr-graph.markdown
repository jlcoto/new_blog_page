---
layout: post
title:  "Plotting autocorrelation with matplotlib"
date:   2016-06-10 00:24:55 +0100
category: Data Visualization
tags: [time series, matplotlib]
image: /img-post/autocorr-large.jpg
---

Part of time series analysis deals with pinning down the stochastic process that generated the data. If we know how this process looks like, we will be better able to predict its future values.

As it is usually the case, it turns out that this is easier said than done. Pinning down the "right" process is a highly complex thing. Part of the initial process entails checking the degree of autocorrelation of the variable we are estimating.

Graphs can be fairly informative for this purpose. They convey a clear idea about what periods have a heavy influence on our process. `matplotlib` offers a direct way of plotting the autocorrelation [graph](http://matplotlib.org/api/pyplot_api.html). However, I was not exactly happy with the format nor the options given.

I used a bit of numpy and matplotlib to generate my own autocorrelation graphs. The code is simple and you can find it in my [github](https://github.com/jlcoto/econometrics/blob/master/lag_graph.py).

Easy example: First I created the following MA(3) process:

$$y_t = 0.8\varepsilon_{t-1}- 0.7\varepsilon_{t-2} +  0.5\varepsilon_{t-3} $$

Simply put, this means that the next period will be heavily and positively influenced by what happens three periods before.

<div class="row">
	<img src="/img-post/MA3_process-large.jpg" alt="MA(3) process" class="enlarge-img img-position">
</div>
In the graph, we should observe three significant spikes, corresponding to those first three periods.

<div class="row">
<img src="/img-post/autocorr-large.jpg" alt="Autocorrelation Plot" class="enlarge-img img-position">
</div>

Feel free to play around with the code, extend it, and let me know what you think!







