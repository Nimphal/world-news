var world = {
    activeEdge : false,

    create : function() {

        var e = edges.newEdge({
            selector: "#world",
            template: world.newTemplate(),
            components : [
                edges.newRegionDataMap({
                    id: "world-map",
                    regionData : {
                        AFG : {
                            "Consumption" : 1000,
                            "Production" : 2000
                        },
                        AUS : {
                            "Consumption" : 3000,
                            "Production" : 4000
                        }
                    },
                    defaultRegionData : {
                        "Consumption" : 1,
                        "Production" : 2
                    },
                    renderer : edges.d3.newGenericVectorMap({
                        width : 1950,
                        height : 1000,
                        projectionType : "mercator",
                        geojson : "/static/data/countries.geo.json",
                        mapScaleFit : "horizontal",
                        mapScaleBorder : 0.0,
                        tooltipType : 'api',
                        urlTemplate: "https://content.guardianapis.com/search?api-key=468583bf-d69d-4a67-b615-02f1b692f9c7&order-by=newest&show-fields=thumbnail&q=",
                        mapTooltipTemplate: '<div id="news_tooltip" class="container"><div id="inside_div">' +
                        '<h3>{{CountryName}}</h3>' +
                        '<div class="row news-item"><div class="col-sm-2"><img src="{{results[0].fields.thumbnail}}"></div><div class="col-sm-8"><h4><a href="{{results[0].webUrl}}">{{results[0].webTitle}}</a></h4></div></div>' +
                        '<span class="tapered-line"></span>' +
                        '<div class="row news-item"><div class="col-sm-2"><img src="{{results[1].fields.thumbnail}}"></div><div class="col-sm-8"><h4><a href="{{results[1].webUrl}}">{{results[1].webTitle}}</a></h4></div></div>' +
                        '<span class="tapered-line"></span>' +
                        '<div class="row news-item"><div class="col-sm-2"><img src="{{results[2].fields.thumbnail}}"></div><div class="col-sm-8"><h4><a href="{{results[2].webUrl}}">{{results[2].webTitle}}</a></h4></div></div>' +
                        '</div></div>',
                        resultsNumber: 3
                    })
                })
            ]
        });

        world.activeEdge = e;
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

            var frag = '<div class="row">\
                <div class="col-md-12">\
                    <div id="' + id + '"></div>\
                </div>\
            </div>';

            edge.context.html(frag);
        }
    }
};


jQuery(document).ready(function($) {
    world.create();
});
