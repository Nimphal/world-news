var world = {
    activeEdge : false,

    create : function(params) {

        if (params){
            console.log(params);
            var projection = edges.getParam(params.projection, "mercator");
            var scale = edges.getParam(params.scale, 0.0);
            var rotation = edges.getParam(params.rotation, {"lambda": 0, "phi": 0});
        } else {
            var projection = "mercator";
            var scale = 0.0;
            var rotation = {"lambda": 0, "phi": 0};
        }

        var e = edges.newEdge({
            selector: "#world",
            template: world.newTemplate(),
            components : [
                edges.newRegionDataMap({
                    id: "world-map",
                    renderer : edges.d3.newGenericVectorMap({
                        width : 1950,
                        height : 1000,
                        projectionType : projection,
                        geojson : "/static/data/countries.geo.json",
                        mapScaleFit : "horizontal",
                        mapScaleBorder : scale,
                        defaultFill : "#CCAE45",
                        defaultStrokeWidth : 2,
                        defaultStroke : "#665238",
                        toolTipLeftOffset : 0,
                        toolTipTopOffset : 0,
                        rotate: rotation,
                        tooltipType : 'api',
                        urlTemplate: "https://content.guardianapis.com/search?api-key=468583bf-d69d-4a67-b615-02f1b692f9c7&order-by=newest&show-fields=thumbnail&q=",
                        mapTooltipTemplate: '<div id="news_tooltip" class="container"><div id="inside_div">' +
                        '<h3>{{CountryName}}</h3>' +
                        '<div class="row news-item"><div class="col-sm-2"><img src="{{results[0].fields.thumbnail}}"></div><div class="col-sm-10"><h4><a href="{{results[0].webUrl}}">{{results[0].webTitle}}</a></h4></div></div>' +
                        '<span class="tapered-line"></span>' +
                        '<div class="row news-item"><div class="col-sm-2"><img src="{{results[1].fields.thumbnail}}"></div><div class="col-sm-10"><h4><a href="{{results[1].webUrl}}">{{results[1].webTitle}}</a></h4></div></div>' +
                        '<span class="tapered-line"></span>' +
                        '<div class="row news-item"><div class="col-sm-2"><img src="{{results[2].fields.thumbnail}}"></div><div class="col-sm-10"><h4><a href="{{results[2].webUrl}}">{{results[2].webTitle}}</a></h4></div></div>' +
                        '</div></div>',
                        resultsNumber: 3
                    })
                })
            ]
        });

        world.activeEdge = e;

        world.clickHandlers();
    },

    newTemplate : function(params) {
        if (!params) { params = {} }
        world.Template.prototype = edges.newTemplate(params);
        return new world.Template(params);
    },
    Template : function(params) {
        var id = edges.getParam(params.id, "world-map");

        this.namespace = "world-template";

        this.draw = function(edge) {
            this.edge = edge;

            var frag = '<div class="row map-buttons">\
                            <div class="col-md-12">\
                                <div class="col-md-2">\
                                    <div class="dropdown">\
                                        <button class="btn btn-default dropdown-toggle" type="button" id="projectionMenu" data-toggle="dropdown" aria-expanded="true">\
                                            Projection\
                                            <span class="caret"></span>\
                                        </button>\
                                        <ul class="dropdown-menu" role="menu" aria-labelledby="projectionMenu">\
                                            <li role="presentation"><a id="mercator" role="menuitem" tabindex="-1" href="#">mercator</a></li>\
                                            <li role="presentation"><a id="orthographic" role="menuitem" tabindex="-1" href="#">orthographic</a></li>\
                                        </ul>\
                                    </div>\
                                </div>\
                                <div class="col-md-4">\
                                 <button class="btn btn-default" type="button" id="zoomIn" >ZoomIn</button>\
                                 <button class="btn btn-default" type="button" id="zoomOut" >ZoomOut</button>\
                                </div>\
                                <div class="col-md-4">\
                                 <button class="btn btn-default" type="button" id="rotateLeft" >Move Left</button>\
                                 <button class="btn btn-default" type="button" id="rotateRight" >Move Right</button>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="row">\
                            <div class="col-md-12">\
                                <div id="' + id + '"></div>\
                            </div>\
                        </div>';

            edge.context.html(frag);
        }
    },

    clickHandlers : function() {
        var self = this;
        $('#mercator').click(function(){
            world.create({projection:"mercator"});
        });

        $('#orthographic').click(function(){
            world.create({projection:"orthographic", scale: 0.5});
        });

        $('#zoomIn').click(function(){
            if (!self.defaultScale) {
                self.defaultScale = 0
            }
            self.defaultScale = self.defaultScale - 1;
            world.create({scale: self.defaultScale});
        });

        $('#zoomOut').click(function(){
            if (!self.defaultScale) {
                self.defaultScale = 0
            }
            self.defaultScale = self.defaultScale + 0.5;
            world.create({scale: self.defaultScale});
        });

        $('#rotateLeft').click(function(){
            world.create({rotation: {"lambda": 80, "phi": 0}});
        });

        $('#rotateRight').click(function(){
            world.create({rotation: {"lambda": -80, "phi": 0}});
        });

    }

};


jQuery(document).ready(function($) {
    world.create();

});
