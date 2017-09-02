---
layout: post
title:  "Visualizing Earthquakes with Folium"
date:   2016-10-29 00:24:55 +0100
tags: [folium, visualization]
image: /img-post/folium-post.jpg
---

Lately, I have been working with the significant earthquake database for a project. I always thought it would be really cool to see how the earthquakes spread out around the world. I used, for example, the geopandas plotting library for this purpose. However, the static images that I got as a result were not quite appealing to engage with, at least not from an exploratory analysis standpoint.

After doing a quick online search, I bumped into Folium. Folium makes the process of plotting maps extremely easy. It makes  Leaflet.js interactive map's advantages accessible with simple python. I was really impressed by how much one can accomplish with a few lines of code.

As I was saying, for my project, I wanted to plot the places where earthquakes took place. I am using the [significant earthquake database](https://www.ngdc.noaa.gov/nndc/struts/form?t=101650&s=1&d=1) from the U.S. National Oceanic and Atmospheric Administration. From these earthquakes, I wanted to plot those that occurred since the 1900s. This was my first attempt:

<div class="map_plotting">
    <iframe src="/img-post/first_attempt.html"  height="315" width="560" allowfullscreen="" frameborder="0">
    </iframe>
</div>

I obtained this map by simply working through one of the plenty of Folium's [documented examples](https://folium.readthedocs.io/en/latest/examples.html). Still, I was not very happy with the results. While I like the fact that my plot was using clustering, accumulating different points of data into one, the plot looks quite noisy. There are many data points that could be accumulated preventing this abundance of points. Also, using the green marker with the check seems like an odd choice to plot an earthquake event.

Let's start with the last problem. It turns out that choosing your own marker is quite simple. You can customize the color and select a shape of markers from the [bootstrap icon list](http://www.w3schools.com/icons/bootstrap_icons_glyphicons.asp). In my case, I went for a red asterisk.

The second solution involved a bit of Python and taking advantage of my dataset. In my dataset, along with the coordinates of latitude and longitude, I also had the regions where the earthquakes took place. I took this into account and generated a cluster per region. In the end this lead to a less busy plot, shown below:

<div class="map_plotting">
    <iframe src="/img-post/second_attempt.html"  height="315" width="560" allowfullscreen="" frameborder="0">
    </iframe>
</div>

As an aside, note that you can click on each of the markers and it will provide you with relevant information about the earthquake, as its date (in Year-Month-Day format) and magnitude.

As usual, if you want to follow along, you can take a look at the following [notebook](https://github.com/jlcoto/visualizations/blob/master/mapping/Plotting_earthquakes%20with%20Folium.ipynb). You can find the earthquake dataset [here](https://github.com/jlcoto/Udacity/tree/master/earthquake_project). A cool feature of the notebook is that it renders the plot directly to it, making tinkering and styling quite easy.

This post just scrapes the surface of what folium can offer. I'll definitely give it a closer look and keep you posted!











