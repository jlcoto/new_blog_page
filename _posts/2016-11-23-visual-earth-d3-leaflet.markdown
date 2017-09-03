---
layout: post
title:  "Plotting Earthquakes with D3.js + Leaflet"
date:   2016-11-23 00:24:55 +0100
tags: [d3.js, leaflet, visualization]
---

Last time, I wrote about how folium allows us to seamlessly integrate leaflet maps for visualization. This time, I wanted to challenge myself a bit more. I decided to use d3.js for visualizing earthquakes again. As I have pointed out in a [previous post](http://jose-coto.com/outlier-visualization), d3.js is a highly flexible JavaScript library that allows you to create visually appealing and interactive visualizations. This comes at a cost: learning how to work with it can take a while.

I am still learning d3.js, and thought it would be a good idea to share with you my trial and error process (admittedly, sometimes more error than trial) when doing the earthquake visualization. Here is the visualization. I later go through some of the steps I took to complete it.

<div class="map_plotting_big">
    <iframe src="http://htmlpreview.github.io/?https://github.com/jlcoto/Udacity/blob/master/earthquake_visualization/index_final.html"  height="750" width="960" allowfullscreen="" frameborder="0">
    </iframe>
</div>

## Objective

In the last [post](http://jose-coto.com/visualizing-earthquakes-folium), I used Folium to make a visualization of earthquakes around the world. You can obtain the data and the codebook [here](https://github.com/jlcoto/Udacity/tree/master/earthquake_project). The data comes from the US National Center For Environmental Information and is available [here](http://www.ngdc.noaa.gov/nndc/struts/form?t=101650&s=1&d=1).

The visualization showed significant earthquakes around the world since 1900s. While I was using the geography to point out where every earthquake had taken place, there was still one variable that was underused, to say the least. In my dataset I had the time for each event, however, in my previous visualization, all of the events where bunched up together. The user needed to check each of the pins on the map to find out when each earthquake took place. Additionally, I had data on the  number of deaths following an earthquake. However, this information was also disguised within the content of a given pin.

What I wanted, then, is to offer the user more freedom to explore the data, both in terms of geography and time. d3.js to the rescue!

## Working with d3.js and Leaflet

While both d3.js and Leaflet are JavaScript libraries, there are some things to be taken into account to work with them. Also, note that Leaflet itself offers a wide array of possibilities when mapping your data. Depending on your needs, it might be enough to work within leaflet. Also, be sure to check out [dc.js](https://dc-js.github.io/dc.js/) which offers good integration that might proved advantageous when customizing dashboards. I have not had the chance to give this library a proper look. It does seem to simplify what I did here. However, I was in for a challenge, and boy, did I have one!

Back to business. If you want to integrate Leaflet and d3.js be sure to check Mike Bostock's [post](https://bost.ocks.org/mike/leaflet/) on the topic. It took me some time to make both libraries work together. One mistake that I was making, and I hope you avoid, dealt with the type of data I was using. Note that Bostock's code is written to work with a geoJSON data format. Specifically, this geoJSON comes with an attribute called "features".  This attribute contains all of the characteristic of our geographic data.

How to get the geographic data in the right geoJSON format? Enter geoPandas. My data was already a Pandas data frame. Using geoPandas only involved declaring that the data were a geoPandas data frame. More difficult, however, was trying to pass these data to geoJSON. GeoPandas has a method for this, however it run into troubles when working with dates. My quick fix up was to pass the dates to strings and then pass it to geoJSON. This worked! I then did the dates conversion within the plotting with d3.js own methods.

## Binding the graphs

As you can see, the visualization connects the time layer to the geographic one. The selection in the lower scatter plot that contains the brush updates both the bigger scatter plot and the map. Getting to make this work was a bit of a challenge. I must confess, I am not very experienced with JavaScript and d3.js's many types of events. It took me some time googling and reading various stackerflow's threads to make this work.

I basically did the following. I obtained the data id of the points that were selected within the brush. I then made sure that those points were also reflected in the map. The main issue is that this update should be done once the brush selection was over. If you missed this last point, which I admittedly did in the beginning, your map would try to update each time the brush moves, even a millimeter! Essentially, this meant that my code was quite heavy to run and that my trusted old laptop started making the usual sounds, as it normally does, whenever I push it to its limits. I needed a different solution. I was happy to find it out with the `d3.event.type` method. This method follows the life of an event and gives you a flag (i.e. "end") as a signal that an event has ended.

With this "discovery", everything was easier. I created a function that fired up whenever the event ended. This function checks what points are within the brush selection and plots them on the map. I also kept the transitions to a minimum. My aim was to interfere as little as possible with the users' interaction.

## Summing up

Working on this project was both fun and challenging. Part of the fun dealt with designing the visualization. I really made an effort to have in mind the final user and how he/she might interact with the graph. The challenging part was working with d3.js and leaflet. I am not a master in neither. Of course, there are many of the parts where my code could use a bit of improving. However, this is part of the learning process. I was happy to challenge myself and to produce in the end a visualization I am happy with. I know that there is still lots to learn, but so far, I am enjoying the ride! If you want to check the code, visit [my repo](https://github.com/jlcoto/Udacity/tree/master/earthquake_visualization).





