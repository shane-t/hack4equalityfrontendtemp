(function () {
  "use strict";

  var Widget = {

     toLocation : { name : "", latitude : "", longitude : "" },

     fromLocation : { name : "", latitude : "", longitude : "" },

     $townTo : $('#town_to'),

     $townFrom : $('#town_from'),

     $canvas : $('canvas'),

     setToLocation : function (name, latitude, longitude) {

       this.toLocation.name = name;
       this.toLocation.latitude = latitude;
       this.toLocation.longitude = longitude;

       this.drawToLocationMap(this.toLocation);

     },

     setFromLocation : function (name, latitude, longitude) {

       this.fromLocation.name = name;
       this.fromLocation.latitude = latitude;
       this.fromLocation.longitude = longitude;

     },

     IMAGEEXTENTLEFT  : -10.4685637,
     IMAGEEXTENTRIGHT : -5.3709933,
     IMAGEEXTENTTOP   : 55.4453331,
     IMAGEEXTENTBOTTOM : 51.1499991,

     getXYForLngLat : function (  longitude, latitude ) {

       var x = this.$canvas.width() * ( longitude - this.IMAGEEXTENTLEFT ) / ( this.IMAGEEXTENTRIGHT - this.IMAGEEXTENTLEFT ),
         y = this.$canvas.height() * ( latitude - this.IMAGEEXTENTBOTTOM ) / ( this.IMAGEEXTENTTOP - this.IMAGEEXTENTBOTTOM );

       return [x, y];


     },

     drawToLocationMap : function ( loc ) {
      var xy = getXYForLngLat(loc.longitude, loc.latitude);

      ctx.fillStyle = "#F00";
      ctx.fillRect(xy[0], xy[1], 2, 2);

     },

     init : function () {
      this.canvas = Widget.$canvas.get(0);
      this.ctx = Widget.canvas.getContext('2d')

      this.$townTo.geocomplete( { country : 'ie' })
       .bind('geocode:result', function (e, loc) {
        Widget.setToLocation(loc.address_components[0].long_name, loc.geometry.location.k, loc.geometry.location.D);
       })
        
      this.$townFrom.geocomplete( { country : 'ie' });

     }

     

  };
  
  Widget.init();


   window.widget = Widget;

}());
