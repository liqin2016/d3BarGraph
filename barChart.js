
//graph margin and size 
var margin = {top: 20, right: 10, bottom: 100, left:50},
    width = 700 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;


var svg = d3.select("body")
    .append("svg")
      .attr ({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
      })
    .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.right + ")");

//second graph
var svg1 = d3.select("body")
	.append("svg")
	.attr ({
		"width": width + margin.right + margin.left,
		"height": height + margin.top + margin.bottom
	})
	.append("g")
	.attr("transform","translate(" + margin.left + "," + margin.right + ")");



// define x and y scales
var xScale = d3.scale.ordinal()
    .rangeRoundBands([0,width], 0.2, 0.2);

var yScale = d3.scale.linear()
    .range([height, 0]);



// define x axis and y axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");



//import json data
d3.json("sampleData.json", function (data){
	  data.forEach(function(d) {
	    d.name = d.name;
	    d.values.value1 = +d.values.value1;
	    d.values.sub.value2 = +d.values.sub.value2;
	    console.log(d.name);
	    console.log(d.values.value1);   
	  });

	  // Specify the domains of the x and y scales
	  xScale.domain(data.map(function(d) { return d.name; }) );
	  yScale.domain([0, d3.max(data, function(d) { return d.values.value1; } ) ]);

	  svg.selectAll('rect')
	    .data(data)
	    .enter()
	    .append('rect')
	    .attr("height", 0)
	    .attr("y", height)

		  //animation
	    .transition().duration(1000)   //every bar
	    .delay( function(d,i) { return i * 50; })   //delay between bars
	    .attr({
	      "x": function(d) { return xScale(d.name); },
	      "y": function(d) { return yScale(d.values.value1); },
	      "width": xScale.rangeBand(),
	      "height": function(d) { return  height - yScale(d.values.value1); }
	    })
	    .style("fill", "steelblue");


	        svg.selectAll('text')
	            .data(data)
	            .enter()
	            .append('text')
	            // .text(function(d){
	            //     return d.values.value1;
	            // })
	            .attr({
	                "x": function(d){ return xScale(d.name) +  xScale.rangeBand()/2; },
	                "y": function(d){ return yScale(d.values.value1)+ 12; },
	                "font-family": 'sans-serif',
	                "font-size": '13px',
	                "font-weight": 'bold',
	                "fill": 'white',
	                "text-anchor": 'middle'
	            });

	    // Draw xAxis and position the label
	    svg.append("g")
	        .attr("class", "x axis")
	        .attr("transform", "translate(0," + height + ")")
	        .call(xAxis)
	        .selectAll("text")
	        .attr("dx", "-.8em")
	        .attr("dy", ".25em")
	        .attr("transform", "rotate(-55)" )
	        .style("text-anchor", "end")
	        .attr("font-size", "10px");


	    // Draw yAxis and postion the label
	    svg.append("g")
	        .attr("class", "y axis")
	        .call(yAxis)
	        .append("text")
	        .attr("transform", "rotate(-45)")
	        .attr("x", -height/2)
	        .attr("dy", "-4em")
	        .style("text-anchor", "middle")
	        .text("Value1")
			.attr("transform","rotate(-90)")//text rotate
			.attr("text-anchor","end")
			.attr("dy","-4em");




	    //second graph
	// Specify the domains of the x and y scales
	xScale.domain(data.map(function(d) { return d.name; }) );
	yScale.domain([0, d3.max(data, function(d) { return d.values.sub.value2; } ) ]);

	svg1.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr("height", 0)
		.attr("y", height)

		//animation
		.transition().duration(1000)   //every bar
		.delay( function(d,i) { return i * 50; })   //delay between bars
		.attr({
			"x": function(d) { return xScale(d.name); },
			"y": function(d) { return yScale(d.values.sub.value2); },
			"width": xScale.rangeBand(),
			"height": function(d) { return  height - yScale(d.values.sub.value2); }
		})
		.style("fill", "steelblue");



	svg1.selectAll('text')
		.data(data)
		.enter()
		.append('text')
		// .text(function(d){
		//     return d.values.value1;
		// })
		.attr({
			"x": function(d){ return xScale(d.name) +  xScale.rangeBand()/2; },
			"y": function(d){ return yScale(d.values.sub.value2)+ 12; },
			"font-family": 'sans-serif',
			"font-size": '13px',
			"font-weight": 'bold',
			"fill": 'white',
			"text-anchor": 'middle'
		});

	// Draw xAxis and position the label
	svg1.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
		.attr("dx", "-.8em")
		.attr("dy", ".25em")
		.attr("transform", "rotate(-55)" )
		.style("text-anchor", "end")
		.attr("font-size", "10px");


	// Draw yAxis and postion the label
	svg1.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-45)")
		.attr("x", -height/2)
		.attr("dy", "-4em")
		.style("text-anchor", "middle")
		.text("Value2")
		.attr("transform","rotate(-90)")//text rotate
		.attr("text-anchor","end")
		.attr("dy","-4em");
});

