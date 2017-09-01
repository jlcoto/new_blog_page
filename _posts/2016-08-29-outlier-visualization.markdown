---
layout: post
title:  "Visualizing Outliers with d3.js"
date:   2016-08-29 00:24:55 +0100
category: Data Visualization
tags: [d3.js]
image: /img-post/outlier-large.jpg
---

I really like data visualization. I think many concepts could be easily explained with the right kind of visuals. That is why I was happy to attend the data visualization talk in the last PyData Berlin. Oddly enough, the visualizations presented were not created with matplotlib, bokeh, or any other of the known tools known to the Python community. They used d3.js.

d3.js is a visualization library written in JavaScript. What really caught my attention was the high flexibility, customization and interactivity the library offers. It also helps that graphs created are readily available to be seen on your normal browser. Advantage: final users do not need to download or run any software to see and manipulate the graphs.

Given such advantages, I thought: let's give it a try. I was further encouraged by the speaker. According  to him, it does not take that long to become a fairly good user of this library. So there I went...

After learning d3.js for almost a week, I would have to say the truth lies somewhere in the middle. There are many other things you want to have a grasp on before embarking into d3.js. For example, knowing some basics of HTML, CSS and SVG would definitely help. Knowing some basic JavaScript will be key when introducing interactivity to your graph.

While this might sound overwhelming, there are tons of materials and galleries you can check online. Perhaps the most known is [d3js.org](https://d3js.org/). I also found Scott Murray's [free online book](http://chimera.labs.oreilly.com/books/1230000000345) very good for clarifying the basics.

However, when it comes to learning, I think nothing replaces the getting your hands dirty approach. I thought about doing a graph to demonstrate the effect of an outlier in a regression. I also wanted the graph to be interactive. I created some data, which you can see in this [notebook](https://github.com/jlcoto/visualizations/blob/master/Outliers_d3.js.ipynb). The following step was to make an interactive graph with d3.js. Below, you can check how it looks like. I hope the future brings more graphs with it. I am particularly interested in maps and all the interactivity they bring with them ;)



<script src="https://d3js.org/d3.v4.min.js"></script>

<script type="text/javascript">
            //Width and height
            var w = 600;
            var h = 350;
            var padding = 30;
            var intro_outlier = true;

            d3.csv("/data/original_ds.csv", function(data) {
                data.forEach( function(d) {
                    d.ind_var = +d.ind_var;
                    d.dep_var = +d.dep_var;
                    d.pred_1 = +d.pred_1;
                    d.dep_var_2 = +d.dep_var_2;
                    d.pred_val_2 = +d.pred_val_2;
                });


            var xScale = d3.scaleLinear()
                        .domain([0, d3.max(data, function(d) {return d.ind_var; })])
                        .range([padding, w - padding*2]);

            var yScale = d3.scaleLinear()
                        .domain([0, d3.max(data, function(d) {return d.dep_var; })])
                        .range([h - padding, padding]);


            var xAxis = d3.axisBottom()
                            .scale(xScale)
                            .ticks(5);

            var yAxis = d3.axisLeft()
                        .scale(yScale)
                        .ticks(5);

            var svg = d3.select("div#example")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

            //Adding the scatter plot

            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr('cx', function(d) {
                    return xScale(d.ind_var);
                })
                .attr('cy', function(d) {
                    return yScale(d.dep_var);
                })
                .attr('r', 2.5)
                .attr("fill", "#1E69A0");

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (h - padding) + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .attr('transform', "translate(" + padding + ",0)" )
                .call(yAxis);

            //Adding the line

            var valueline = d3.line()
                    .x(function(d) { return xScale(d.ind_var); })
                    .y(function(d) { return yScale(d.pred_1); });

            var path = svg.append("path")
                .attr("class", "line")
                .attr("d", valueline(data))
                .attr("stroke", "#BB1A0C")
                .attr("stroke-width", "2.5")
                .attr("fill", "none");

            var outlier_intro = svg.append("text")
                    .text("Introducing/dropping outlier")
                    .attr('x', xScale(0.55) )
                    .attr('y', yScale(10) )
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "15px")
                    .attr('id', "outlier")
                    .attr('fill', "#767688" )
                    .attr('cursor', "pointer" );

            d3.select("#outlier")
                .on("click", function() {

                    if (intro_outlier) {
                         //Shifting yScale so it readapts to changes
                        // xScale.domain([0, d3.max(data, function(d) {return d.dep_var; })])
                        yScale.domain([0, d3.max(data, function(d) {return d.dep_var_2; })]);

                        // d3.selectAll('circle').remove();

                        svg.selectAll("circle")
                            .data(data)
                            .transition()
                            .duration(1500)
                            .attr('cx', function(d) {
                                return xScale(d.ind_var);
                            })
                            .attr('cy', function(d) {
                                return yScale(d.dep_var_2);
                            })
                            .attr('r', 3)
                            .attr("fill", "#1E69A0");

                        d3.selectAll('.y.axis')
                            .transition()
                            .duration(900)
                            .remove();

                        svg.append("g")
                            .attr('class', "y axis" )
                            .attr("transform", "translate(" + padding + ",0)")
                            .call(yAxis);


                        valueline.y(function(d) { return yScale(d.pred_1); });

                        path.transition()
                            .duration(3000)
                            .attr("d", valueline(data));

                        svg.select(".x.axis")
                            .transition()
                            .duration(1000)
                            .call(xAxis);

                        svg.select(".y.axis")
                            .transition()
                            .duration(1000)
                            .call(yAxis);

                        var valueline_comp = d3.line()
                            .x(function(d) { return xScale(d.ind_var); })
                            .y(function(d) { return yScale(d.pred_val_2); });

                        var comp_line = svg.append("path")
                            .attr("class", "comp_line")
                            .attr("d", valueline_comp(data))
                            .attr("stroke", "#2C2B95")
                            .attr("stroke-width", "2.5")
                            .attr("fill", "none");

                        var totalLength = path.node().getTotalLength();

                        comp_line
                            .attr("stroke-dasharray", totalLength + " " + totalLength)
                            .attr("stroke-dashoffset", totalLength)
                            .transition(d3.easeLinear)
                            .delay(1500)
                            .duration(1500)
                            .attr("stroke-dashoffset", 0);

                        var regression_text = svg.append("text")
                                .text("Original Regression")
                                .attr('class', "desc" )
                                .attr('x', xScale(7.5) )
                                .attr('y', yScale(5))
                                .attr("font-family", "sans-serif")
                                .attr("font-size", "10px")
                                .attr('id', "outlier")
                                .attr('fill', "#767688" );

                        var regression_out_text = svg.append("text")
                                .attr('class', "desc" )
                                .text("Outlier Regression")
                                .attr('x', xScale(7.5) )
                                .attr('y', yScale(15))
                                .attr("font-family", "sans-serif")
                                .attr("font-size", "10px")
                                .attr('id', "outlier")
                                .attr('fill', "#767688" );


                        intro_outlier = !true

                            } else {

                        yScale.domain([0, d3.max(data, function(d) {return d.dep_var; })]);

                        d3.selectAll('.y.axis')
                            .transition()
                            .duration(900)
                            .remove();

                        svg.append("g")
                            .attr('class', "y axis" )
                            .attr("transform", "translate(" + padding + ",0)")
                            .call(yAxis);

                        svg.select(".y.axis")
                            .transition()
                            .duration(1000)
                            .call(yAxis);

                        svg.selectAll("circle")
                            .attr('cx', function(d) {
                                return xScale(d.ind_var);
                            })
                        .attr('cy', function(d) {
                            return yScale(d.dep_var);
                            })

                        d3.selectAll('.comp_line')
                            .transition()
                            .duration(2000)
                            .remove();

                        d3.selectAll(".desc")
                            .transition()
                            .duration(1000)
                            .remove();

                        valueline.y(function(d) { return yScale(d.pred_1); });

                        path.transition()
                            .duration(2500)
                            .attr("d", valueline(data));

                        intro_outlier = true;
                            }
                });
            });

</script>

<div id="example">
</div>