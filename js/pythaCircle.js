// TODO: PROJECT IS DUE IN 1 HOUR MESSY CODE INCOMING GOTTA REFACTOR GO
var PythaCircle = (function () {

	// private variables and functions
	var radius = window.innerHeight / 3;
	var dimension = [window.innerWidth, window.innerHeight];
	var svgContainer = d3.select("body").append("svg")
										.attr("width", dimension[0])
										.attr("height", dimension[1]);

	var bgCircle = svgContainer.append("circle")
										.attr("cx", dimension[0]/2)
										.attr("cy", dimension[1]/2)
										.attr("r", radius)
										.attr("stroke", "#467466")
										.attr("fill", "#1C1624");
	var bgPivot = svgContainer.append("circle")
										.attr("cx", dimension[0]/2)
										.attr("cy", dimension[1]/2)
										.attr("r", radius/30)
										.attr("stroke", "#467466")
										.attr("fill", "#467466");

	var polygon = 	svgContainer.append("polygon")
		.attr("fill", "#75BE99")
		.attr("stroke", "#75BE99");
	var path = svgContainer.append("path")
		.attr("stroke", "#75BE99");
	var notesPlaying = [];

	// input: fraction. output: Location on circle edge
	function fractionToLoc(fract)
	{
		var dx = radius * Math.sin(fract * 2 * Math.PI); // TAU FTW
		var dy = - radius * Math.cos(fract * 2 * Math.PI);
		return {
			x:dimension[0] / 2 + dx,
			y:dimension[1] / 2 + dy
		};
	}

	function drawPolygon()
	{
		// arrange vertexes
		notesPlaying.sort(function(a, b){return a-b});
		//console.log(notesPlaying);
		//meh.
		polygon.attr("points",function() {
				var points = "";
				for (var i=0;i<notesPlaying.length;i++)
				{
					//console.log(notesPlaying[i]);
					var index = i;
					if ( !d3.select("#note" + notesPlaying[index]).attr ) index += pythaRatios.length;
					points += d3.select("#note" + notesPlaying[index]).attr("cx");
					points += ",";
					points += d3.select("#note" + notesPlaying[index]).attr("cy");
					points += " ";
				}
				return points;
			});
	}

	// constructor
	var PythaCircle = function () {
		// DRAW THE FUCKING CIRCLES FOR THE FUCKING NOTES
		for (var i=0; i<pythaRatios.length; i++)
		{
			var loc = fractionToLoc(pythaRatios[i][0] / pythaRatios[i][1]);
			svgContainer.append("circle")
						.attr("cx", loc.x)
						.attr("cy", loc.y)
						.attr("r", radius / 10)
						.attr("stroke", "#467466")
						.attr("fill", "#1C1624")
						.attr("id", "note"+i);
		}
	};
	// prototype
	PythaCircle.prototype = {
		constructor: PythaCircle,

		addNodeDraw : function (i) {
			// highlight circle
			var index = notesPlaying.indexOf(i);
			if (index <= -1)
			{
				notesPlaying.push(i);
			}

			if (i >= pythaRatios.length) {
				i -= pythaRatios.length;
			}
			d3.select("#note"+i).attr("fill", "#A8CEAC");

			drawPolygon();
		},

		removeNodeDraw : function (i) {
			var index = notesPlaying.indexOf(i);
			if (index > -1)
			{
				notesPlaying.splice(index, 1);
			}
			// highlight circle
			if (i >= pythaRatios.length) {
				i -= pythaRatios.length;
			}
			d3.select("#note" + i).attr("fill", "#1C1624");

			drawPolygon();
		},

	};

	return PythaCircle;
})();
