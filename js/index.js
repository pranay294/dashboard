(function Module() {
   var selectedCoreTeam = "";
   var selectedApp = "";
   var selectedSprint = "";
   var seletcedLocation = "";
   var selectedPlatform = "";
   
   /****************************************************
    * Function : Document.ready                        *
    * Brief    : Triggered when DOM elements are ready *
    * Param    : None                                  *
    ****************************************************/
   $(function() {
      registerEventsOnDomElements();
      initialize();
      filterContent();
   });

   /****************************************************
    * Function : registerEventsOnDomElements           *
    * Brief    : Events for actions on DOM elements    *
    * Param    : None                                  *
    ****************************************************/
   function registerEventsOnDomElements() {
      // Position the clicked container on top
      $(".container").on( "click", function() {
         $(".sideBox").css( "z-index", 0 );
         $(".mainBox").css( "z-index", 1 );
         $(this).css( "z-index", 2 );
      });
      
      $(".name").on( "click", function() {
         $( ".menuItems li .menutable").hide();
         $( this ).parent().find(".menutable").show();
      });
      
      $(".logo").on( "click", function() {
         location.reload();
      });
   };
   
   /****************************************************
    * Function : intialize                             *
    * Brief    : Initialize the DOM structure          *
    * Param    : None                                  *
    ****************************************************/
   function initialize() {
      var apps = [];
      var coreTeams = [];
      var sprints = [];
      var locations = [];
      var platforms = [];
      for( var index = 0; index < APPLICATION_DATA.length; index++ ) {
         if ( coreTeams.indexOf( APPLICATION_DATA[index].Pillar ) === -1 ) {
            coreTeams.push( APPLICATION_DATA[index].Pillar );
         }
         if ( apps.indexOf( APPLICATION_DATA[index].App_Name ) === -1 ) {
            apps.push( APPLICATION_DATA[index].App_Name );
         }
         if ( sprints.indexOf( APPLICATION_DATA[index].Sprint_Id ) === -1 ) {
            sprints.push( APPLICATION_DATA[index].Sprint_Id );
         }
         if ( locations.indexOf( APPLICATION_DATA[index].Executed_At ) === -1 ) {
            locations.push( APPLICATION_DATA[index].Executed_At );
         }
         if ( platforms.indexOf( APPLICATION_DATA[index].Platform ) === -1 ) {
            platforms.push( APPLICATION_DATA[index].Platform );
         }
      }
      drawMenuItems( apps, "menuTableApp" );
      drawMenuItems( coreTeams, "menuTableCoreTeam" );
      drawMenuItems( sprints, "menuTableSprint" );
      drawMenuItems( locations, "menuTableLocation" );
      drawMenuItems( platforms, "menuTablePlatform" );
      
      $(".menutable table td").on( "click", function() {
         switch ( $(this).parents("li").find(".name").html() ) {
            case "App"       : selectedApp      = ( $(this).html() !== "All" ) ? $(this).html() : ""; break;
            case "Core Team" : selectedCoreTeam = ( $(this).html() !== "All" ) ? $(this).html() : ""; break;
            case "Sprint"    : selectedSprint   = ( $(this).html() !== "All" ) ? $(this).html() : ""; break;
            case "Location"  : seletcedLocation = ( $(this).html() !== "All" ) ? $(this).html() : ""; break;
            case "Platform"  : selectedPlatform = ( $(this).html() !== "All" ) ? $(this).html() : ""; break;
            default          : break;
         }
         $(".menutable").hide();
         filterContent();
      });
      $(".menutable table td").on( "mouseover", function() {
         $(this).parents("li").find("table").find("td").css("background","");
         $(this).css("background","#0096d6");
      });
      $(".content").on("click", function() {
         $(".menutable").hide();
      });
   };
   
   /****************************************************
    * Function : drawMenuItems                         *
    * Brief    : Add menu options to menu bar          *
    * Param    : menuItem                              *
    * Param    : name of menu class                    *
    ****************************************************/
   function drawMenuItems( menuItem, name ) {
      var dom = "<tr><td>All</td></tr>";
      for( var index = 0; index < menuItem.length; index++ ) {
         dom += "<tr><td>" + menuItem[index] + "</td></tr>";
      }
      $( "." + name + " table" ).html( dom );
   };
   
   /****************************************************
    * Function : filterContent                         *
    * Brief    : Filter content based on content       *
    * Param    : None                                  *
    ****************************************************/
   function filterContent() {
      var data = [];
      var pass = 0;
      var fail = 0;
      var testsPerSprint = {};
      var testsPerApp = {};
      var testsPerCoreTeam = {};
      var testsPerLocation = {};
      var testsPerPlatform = {};
      for( var index = 0; index < APPLICATION_DATA.length; index++ ) {
         if ( ( APPLICATION_DATA[index].App_Name.indexOf( selectedApp ) > -1 ) &&
              ( APPLICATION_DATA[index].Pillar.indexOf( selectedCoreTeam ) > -1 ) &&
              ( APPLICATION_DATA[index].Sprint_Id.indexOf( selectedSprint ) > -1 ) &&
              ( APPLICATION_DATA[index].Executed_At.indexOf( seletcedLocation ) > -1 ) &&
              ( APPLICATION_DATA[index].Platform.indexOf( selectedPlatform ) > -1 ) ) {
            data.push( APPLICATION_DATA[index] );
            if( !testsPerApp[ APPLICATION_DATA[index].App_Name ] ) {
               testsPerApp[ APPLICATION_DATA[index].App_Name ] = { Pass : 0, Fail : 0 };
            }
            if( !testsPerSprint[ APPLICATION_DATA[index].Sprint_Id ] ) {
               testsPerSprint[ APPLICATION_DATA[index].Sprint_Id ] = { Pass : 0, Fail : 0 };
            }
            if( !testsPerLocation[ APPLICATION_DATA[index].Executed_At ] ) {
               testsPerLocation[ APPLICATION_DATA[index].Executed_At ] = { Pass : 0, Fail : 0 };
            }
            if( !testsPerPlatform[ APPLICATION_DATA[index].Platform ] ) {
               testsPerPlatform[ APPLICATION_DATA[index].Platform ] = { Pass : 0, Fail : 0 };
            }  
            if( !testsPerCoreTeam[ APPLICATION_DATA[index].Pillar ] ) {
               testsPerCoreTeam[ APPLICATION_DATA[index].Pillar ] = { Pass : 0, Fail : 0 };
            }             
            
            if ( APPLICATION_DATA[index].Test_Result === "Pass" ) {
               pass++;
               testsPerSprint[ APPLICATION_DATA[index].Sprint_Id ].Pass++;
               testsPerApp[ APPLICATION_DATA[index].App_Name ].Pass++;
               testsPerLocation[ APPLICATION_DATA[index].Executed_At ].Pass++;
               testsPerPlatform[ APPLICATION_DATA[index].Platform ].Pass++;
               testsPerCoreTeam[ APPLICATION_DATA[index].Pillar ].Pass++;
            }
            else {
               fail++;
               testsPerSprint[ APPLICATION_DATA[index].Sprint_Id ].Fail++;
               testsPerApp[ APPLICATION_DATA[index].App_Name ].Fail++;
               testsPerLocation[ APPLICATION_DATA[index].Executed_At ].Fail++;
               testsPerPlatform[ APPLICATION_DATA[index].Platform ].Fail++;
               testsPerCoreTeam[ APPLICATION_DATA[index].Pillar ].Fail++;
            }
         }
      }
      $("#source").html("<li class='pieChart' value='" + pass + "'>Pass: " + pass + "</li><li class='pieChart' value='" + fail + "'>Fail: " + fail + "</li>");
      $("#target").html("");
		$("#source").pieChart("#target");
      
      $("#descriptions").html( "Overall Pass percentage: " + parseInt((100 * pass) / ( pass + fail)) + "%");
      
      var arrayOfCoreTeams = [];
      for ( var key in testsPerCoreTeam ) {
         arrayOfCoreTeams.push( [[ testsPerCoreTeam[key].Pass, testsPerCoreTeam[key].Fail ], key ] );
      }
      
      var arrayOfApps = [];
      for ( var key in testsPerApp ) {
         arrayOfApps.push( [[ testsPerApp[key].Pass, testsPerApp[key].Fail ], key ] );
      }
      
      var arrayOfSprints = [];
      for ( var key in testsPerSprint ) {
         arrayOfSprints.push( [[ testsPerSprint[key].Pass, testsPerSprint[key].Fail ], key ] );
      }

      var arrayOfLocation = [];
      for ( var key in testsPerLocation ) {
         arrayOfLocation.push( [[ testsPerLocation[key].Pass, testsPerLocation[key].Fail ], key ] );
      }
      
      var arrayOfPlatform = [];
      for ( var key in testsPerPlatform ) {
         arrayOfPlatform.push( [[ testsPerPlatform[key].Pass, testsPerPlatform[key].Fail ], key ] );
      }
      
      $(".app").html('<div id="app"></div>');
      $(".coreteam").html('<div id="coreteam"></div>');
      $(".sprint").html('<div id="sprint"></div>');
      $(".location").html('<div id="location"></div>');
      $(".platform").html('<div id="platform"></div>');
      
      $('#sprint').jqBarGraph({data: arrayOfSprints,
         colors: ['#0096d6','#606060'],
         legends: ['Pass','Fail'],
         legend: true,
         width: $(".row").width() * 0.9,
         color: '#ffffff',
         type: 'multi',
         title: 'Tests per Sprint'
      });
      
      $('#location').jqBarGraph({data: arrayOfLocation,
         colors: ['#0096d6','#606060'],
         legends: ['Pass','Fail'],
         legend: true,
         width: $(".row").width() * 0.9,
         color: '#ffffff',
         type: 'multi',
         title: 'Tests per Location'
      });
      
      $('#platform').jqBarGraph({data: arrayOfPlatform,
         colors: ['#0096d6','#606060'],
         legends: ['Pass','Fail'],
         legend: true,
         width: $(".row").width() * 0.9,
         color: '#ffffff',
         type: 'multi',
         title: 'Tests per Platform'
      });
      
      $('#app').jqBarGraph({data: arrayOfApps,
         colors: ['#0096d6','#606060'],
         legends: ['Pass','Fail'],
         legend: true,
         width: $(".row").width() * 0.9,
         color: '#ffffff',
         type: 'multi',
         title: 'Tests per App'
      });

      $('#coreteam').jqBarGraph({data: arrayOfCoreTeams,
         colors: ['#0096d6','#606060'],
         legends: ['Pass','Fail'],
         legend: true,
         width: $(".row").width() * 0.9,
         color: '#ffffff',
         type: 'multi',
         title: 'Tests per Core Team'
      });      
   };
})();