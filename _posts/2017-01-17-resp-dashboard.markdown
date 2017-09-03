---
layout: post
title:  "Building a responsive dashboard with CSS and d3.js (I)"
date:   2017-01-17 00:24:55 +0100
tags: [d3.js, visualization]
image: /img-post/layout_template-wide-large.jpg
---

Dashboards are everywhere now partly because they can lead to better decision making. They allow to look at our data through a series of visualizations instead of looking at some cryptic numbers on a spreadsheet.

For this project, I connected the dots between two things I have been learning lately. On the one hand, I am very interested in responsive design.  I am learning how to use CSS to provide a seamless user experience, no matter what the device they might be using. On the other hand, I love visualizations. Lately, I have been learning D3.js and have being amazed by all the interactivity it offers.

The project, as you may have imagined, deals with making a responsive D3.js dashboard. The case I had in mind was the following: Imagine you work for a company and you have different users that need to access the dashboard. Some of them will do it on the fly, on their cell phones. Others will use tablets, laptops or desktops. How do you make sure all of them have the same harmonious experience?

I have divided this topic in two post. In this one, I will cover some CSS aspects in order to get the general layout of the dashboard. In the second post, I will cover the D3.js needed to make sure the visualizations you include to your layout are also responsive.

## Responsive CSS layout

### Flexbox is your friend

Flexbox allows us to arrange our content in a grid layer way. Additionally, it offers great customization in terms of layout. If you want to check out more, this is a [great resource](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

I'll be using flexbox for customizing three different layouts. We'll call it the small, medium and big layouts. The idea is that the small should be for small devices, like phones. As a rule in responsive design, we will think on mobile first. From there on, we will perform  modifications for the medium and big layouts. However, before checking at the layout specifications, let's see what data we'll be dealing with.

### Our content

It is a good practice to consider content and layout at the same time. After all, the layout should help make our content clear notwithstanding what device is accessed from. In our case, we will be be using a simple sales/cost per month graph of a made up company which, of course, has made up data.

Our dashboard will contain 6 graphs:

1. Total sales per month.
2. Total sales per region.
3. Stacked bar sales per region.
4. Total costs per month.
5. Total costs per region.
6. Stacked bar costs per region.

It is possible to observe a pattern here. We have two general graphs: total sales and total costs (1 and 4). The other two graphs are derived from these general graphs, offering further disaggregated information.

### Our layout

I decided that the graphs should have a minimum width of 400px. With this size, they should fit in a medium sized phone (like an Iphone6). Note that you can use your favorite browser developer tools to make sure everything fits as expected.

From then on, I chose two other breaking points. I choose the first one when the screen hits a width of 600px, and the last one when it hits 900px. Once again, these breaking points should be chosen taking into account the content and, furthermore,  the devices of your users. For example, if your users have small size screen cell phones, it may make sense to include an extra breaking point for a smaller width. In other words, choosing breaking points is not an exact science. You need to understand your content and users' needs.

Here is the layout I chose:

<div class="row img-spacing">
	<img src="/img-post/layout_template-wide-large.jpg" class="enlarge-img img-position img-fluid" alt="Dashboard layout for different screen widths">
</div>

For the small resolution, I decided not to give any relevance to the graphs in terms of height and width. All of the graphs are the same and should occupy 100% of the device's width. In the medium and big layouts we start seeing the changes. In particular, these deal with giving more relevance to our main graphs, general sales and costs, which will occupy a bigger portion of the width and height of the screen. I also decided to add some margins to the left and right of the graph once it hits the 900px breakpoint. I did this for preventing too stretched graphs.

Feel free to check out [here](https://htmlpreview.github.io/?https://github.com/jlcoto/visualizations/blob/master/dashboard/dashboard_layout/prototype.html) how this layout changes when you resize your screen. Also, you can find the code for the layout in [my repo](https://github.com/jlcoto/visualizations/tree/master/dashboard/dashboard_layout). Play around with different widths and box orders. Also, note that the widths and heights of the boxes are merely referral. We would have the chance to work on them when including our visualizations. Be sure to tune in for the next post!














