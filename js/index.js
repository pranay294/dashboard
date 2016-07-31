(function Module() {
   var selectedCoreTeam = "";
   var selectedApp = "";
   var selectedSprint = "";
   var selectedLocation = "";
   var selectedPlatform = "";
   
   /****************************************************
    * Function : Document.ready                        *
    * Brief    : Triggered when DOM elements are ready *
    * Param    : None                                  *
    ****************************************************/
   $(function() {
      registerEventsOnDomElements();
      initialize();
      showdate();
   });
   
   function showdate() {
      var date = new Date();
      var monthName = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec" ];
      var year = 1900 + date.getYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hour = date.getHours();
      var min = date.getMinutes();
      
      $(".dateTime").html( day + " " + monthName[month] + ", " + year + " " + hour + ":" + min  );
      setTimeout( function() { showdate(); }, 60*1000 );
   }

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
      
      $(".mask").on( "click", function() {
         $(".mask").hide();
         $(".maskData").hide();
      });
   };
   
   /****************************************************
    * Function : drawMenuItems                         *
    * Brief    : Add menu options to menu bar          *
    * Param    : menuItem                              *
    * Param    : name of menu class                    *
    ****************************************************/
   function drawMenuItems( menuItem, name ) {
      menuItem.sort();
      var dom = "<tr><td>All</td></tr>";
      for( var index = 0; index < menuItem.length; index++ ) {
         dom += "<tr><td>" + menuItem[index] + "</td></tr>";
      }
      $( "." + name + " table" ).html( dom );
   };
   
   /****************************************************
    * Function : initialize                            *
    * Brief    : Filter content based on content       *
    * Param    : None                                  *
    ****************************************************/
   function initialize() {
      var data = [];
      var pass = 0;
      var fail = 0;
      var testsPerSprint = {};
      var testsPerApp = {};
      var testsPerCoreTeam = {};
      var testsPerLocation = {};
      var testsPerPlatform = {};
      
      createMenu();
      
      for( var index = 0; index < APPLICATION_DATA.length; index++ ) {
         if ( ( APPLICATION_DATA[index].App_Name.indexOf( selectedApp ) > -1 ) &&
              ( APPLICATION_DATA[index].Pillar.indexOf( selectedCoreTeam ) > -1 ) &&
              ( APPLICATION_DATA[index].Sprint_Id.indexOf( selectedSprint ) > -1 ) &&
              ( APPLICATION_DATA[index].Executed_At.indexOf( selectedLocation ) > -1 ) &&
              ( APPLICATION_DATA[index].Platform.indexOf( selectedPlatform ) > -1 ) ) {
            data.push( APPLICATION_DATA[index] );
            if( !testsPerApp[ APPLICATION_DATA[index].App_Name ] ) {
               testsPerApp[ APPLICATION_DATA[index].App_Name ] = { Pass : 0, Fail : 0, PassData : [], FailData : [] };
            }
            if( !testsPerSprint[ APPLICATION_DATA[index].Sprint_Id ] ) {
               testsPerSprint[ APPLICATION_DATA[index].Sprint_Id ] = { Pass : 0, Fail : 0, PassData : [], FailData : [] };
            }
            if( !testsPerLocation[ APPLICATION_DATA[index].Executed_At ] ) {
               testsPerLocation[ APPLICATION_DATA[index].Executed_At ] = { Pass : 0, Fail : 0, PassData : [], FailData : [] };
            }
            if( !testsPerPlatform[ APPLICATION_DATA[index].Platform ] ) {
               testsPerPlatform[ APPLICATION_DATA[index].Platform ] = { Pass : 0, Fail : 0, PassData : [], FailData : [] };
            }  
            if( !testsPerCoreTeam[ APPLICATION_DATA[index].Pillar ] ) {
               testsPerCoreTeam[ APPLICATION_DATA[index].Pillar ] = { Pass : 0, Fail : 0, PassData : [], FailData : [] };
            }             
            
            if ( APPLICATION_DATA[index].Test_Result === "Pass" ) {
               pass++;
               testsPerSprint[ APPLICATION_DATA[index].Sprint_Id ].Pass++;
               testsPerSprint[ APPLICATION_DATA[index].Sprint_Id ].PassData.push({ 
                  App_Version: APPLICATION_DATA[index].App_Version,
                  Test_Case_Id: APPLICATION_DATA[index].Test_Case_Id,
                  OBS_ID: APPLICATION_DATA[index].OBS_ID,
                  Date: APPLICATION_DATA[index].Date
               });
               testsPerApp[ APPLICATION_DATA[index].App_Name ].Pass++;
               testsPerApp[ APPLICATION_DATA[index].App_Name ].PassData.push({ 
                  App_Version: APPLICATION_DATA[index].App_Version,
                  Test_Case_Id: APPLICATION_DATA[index].Test_Case_Id,
                  OBS_ID: APPLICATION_DATA[index].OBS_ID,
                  Date: APPLICATION_DATA[index].Date
               });
               testsPerLocation[ APPLICATION_DATA[index].Executed_At ].Pass++;
               testsPerLocation[ APPLICATION_DATA[index].Executed_At ].PassData.push({ 
                  App_Version: APPLICATION_DATA[index].App_Version,
                  Test_Case_Id: APPLICATION_DATA[index].Test_Case_Id,
                  OBS_ID: APPLICATION_DATA[index].OBS_ID,
                  Date: APPLICATION_DATA[index].Date
               });
               testsPerPlatform[ APPLICATION_DATA[index].Platform ].Pass++;
               testsPerPlatform[ APPLICATION_DATA[index].Platform ].PassData.push({ 
                  App_Version: APPLICATION_DATA[index].App_Version,
                  Test_Case_Id: APPLICATION_DATA[index].Test_Case_Id,
                  OBS_ID: APPLICATION_DATA[index].OBS_ID,
                  Date: APPLICATION_DATA[index].Date
               });
               testsPerCoreTeam[ APPLICATION_DATA[index].Pillar ].Pass++;
               testsPerCoreTeam[ APPLICATION_DATA[index].Pillar ].PassData.push({ 
                  App_Version: APPLICATION_DATA[index].App_Version,
                  Test_Case_Id: APPLICATION_DATA[index].Test_Case_Id,
                  OBS_ID: APPLICATION_DATA[index].OBS_ID,
                  Date: APPLICATION_DATA[index].Date
               });
            }
            else if ( APPLICATION_DATA[index].Test_Result === "Fail" ) {
               fail++;
               testsPerSprint[ APPLICATION_DATA[index].Sprint_Id ].Fail++;
               testsPerSprint[ APPLICATION_DATA[index].Sprint_Id ].FailData.push({ 
                  App_Version: APPLICATION_DATA[index].App_Version,
                  Test_Case_Id: APPLICATION_DATA[index].Test_Case_Id,
                  OBS_ID: APPLICATION_DATA[index].OBS_ID,
                  Date: APPLICATION_DATA[index].Date
               });               
               testsPerApp[ APPLICATION_DATA[index].App_Name ].Fail++;
               testsPerApp[ APPLICATION_DATA[index].App_Name ].FailData.push({ 
                  App_Version: APPLICATION_DATA[index].App_Version,
                  Test_Case_Id: APPLICATION_DATA[index].Test_Case_Id,
                  OBS_ID: APPLICATION_DATA[index].OBS_ID,
                  Date: APPLICATION_DATA[index].Date
               });
               testsPerLocation[ APPLICATION_DATA[index].Executed_At ].Fail++;
               testsPerLocation[ APPLICATION_DATA[index].Executed_At ].FailData.push({ 
                  App_Version: APPLICATION_DATA[index].App_Version,
                  Test_Case_Id: APPLICATION_DATA[index].Test_Case_Id,
                  OBS_ID: APPLICATION_DATA[index].OBS_ID,
                  Date: APPLICATION_DATA[index].Date
               });
               testsPerPlatform[ APPLICATION_DATA[index].Platform ].Fail++;
               testsPerPlatform[ APPLICATION_DATA[index].Platform ].FailData.push({ 
                  App_Version: APPLICATION_DATA[index].App_Version,
                  Test_Case_Id: APPLICATION_DATA[index].Test_Case_Id,
                  OBS_ID: APPLICATION_DATA[index].OBS_ID,
                  Date: APPLICATION_DATA[index].Date
               });
               testsPerCoreTeam[ APPLICATION_DATA[index].Pillar ].Fail++;
               testsPerCoreTeam[ APPLICATION_DATA[index].Pillar ].FailData.push({ 
                  App_Version: APPLICATION_DATA[index].App_Version,
                  Test_Case_Id: APPLICATION_DATA[index].Test_Case_Id,
                  OBS_ID: APPLICATION_DATA[index].OBS_ID,
                  Date: APPLICATION_DATA[index].Date
               });
            }
         }
      }
      $("#source").html("<li class='pieChart' value='" + pass + "'>Pass: " + pass + "</li><li class='pieChart' value='" + fail + "'>Fail: " + fail + "</li>");
      $("#target").html("");
		$("#source").pieChart("#target");
      
      $("#descriptions").html( "Overall Pass percentage: " + parseInt((100 * pass) / ( pass + fail)) + "%" + "<br/>" + "Total tests executed: " + parseInt( ( ( pass + fail) * 100 ) / APPLICATION_DATA.length ) + "%" );
    
      $("#container0").html( drawChart( testsPerCoreTeam, "Tests per Core Team", "Core" ) );
      $("#container1").html( drawChart( testsPerApp, "Tests per App", "App" ) );
      $("#container2").html( drawChart( testsPerSprint, "Tests per Sprint", "Sprint" ) );
      $("#container3").html( drawChart( testsPerLocation, "Tests per Location", "Location" ) );
      $("#container4").html( drawChart( testsPerPlatform, "Tests per Platform", "Platform" ) );
      
      $(".container .chart .chartdata").on( "click", function( ) {
         var id = $(this).attr("id");
         var resultType = id.substring( 0, 8 );
         id = id.substring( 8, id.length );
         $( ".mask" ).show();
         switch( $(this).attr("type") ) {
            case "Core" : $( ".maskData" ).html( drawDataInTable( testsPerCoreTeam[ id ][ resultType ], "Core Team", id ) ); break;
            case "App" : $( ".maskData" ).html( drawDataInTable( testsPerApp[ id ][ resultType ], "App", id ) ); break;
            case "Sprint" : $( ".maskData" ).html( drawDataInTable( testsPerSprint[ id ][ resultType ], "Sprint", id ) ); break;
            case "Location" : $( ".maskData" ).html( drawDataInTable( testsPerLocation[ id ][ resultType ], "Location", id ) ); break;
            case "Platform" : $( ".maskData" ).html( drawDataInTable( testsPerPlatform[ id ][ resultType ], "Platform", id ) ); break;
            default : break;
         }
         $( ".maskData" ).show();
      });    
   };
   
   /****************************************************
    * Function : drawDataInTable                       *
    * Brief    : Draw data in table                    *
    * Param    : data                                  *
    * Param    : prop                                  *
    * Param    : value                                 *
    ****************************************************/
   function drawDataInTable( data, prop, value ) {
      var response = "<div class='tableHeader'>" + prop + ": " + value + "</div>";
      response += "<table style='width:100%;text-align:left;border:1px solid black;'><tr><th>Date</th><th>App Version</th><th>Test Case ID</th><th>OBS ID</th></tr>";
      for( var index = 0; index < data.length; index++ ) {
         response += "<tr>";
         response += "<td>" + data[index].Date + "</td>";
         response += "<td>" + data[index].App_Version + "</td>";
         response += "<td>" + data[index].Test_Case_Id + "</td>";
         response += "<td>" + data[index].OBS_ID + "</td>";
         response += "</tr>";
      }
      response += "</table>";
      return response;
   };
   
   /****************************************************
    * Function : drawChart                             *
    * Brief    : Draw chart for data                   *
    * Param    : data                                  *
    ****************************************************/ 
   function drawChart( data , heading, type ) {
      var maxHeight = 280;
      var maxData = 0;
      var leftPos = 0;
      var barWidth = 40;
      var response = "<div class='label'>";
      response += "<span class='passLabel'></span>Pass<br/><br/>";
      response += "<span class='failLabel'></span>Fail";
      response += "</div>";
      response += "<div class='heading'>" + heading + "</div>";
      response += "<div class='chart'>";
      
      for( var prop1 in data ) {
         maxData = Math.max( maxData, data[prop1].Pass );
         maxData = Math.max( maxData, data[prop1].Fail );
      }
      
      for( var prop in data ) {
         response += "<div style='position:absolute;bottom:0px;left:" + leftPos + "px;text-align:center;width:" + ( 2 * barWidth + 3 ) + "px;height:30px;'>" + prop + "</div>";
         response += "<div type='" + type + "' class='chartdata' id='PassData" + prop + "' style='position:absolute;bottom:45px;left:" + leftPos + "px;float:left;background:#0096d6;font-weight:bold;padding:5px 0;color:#0f0;height:" + parseInt( ( data[prop].Pass * maxHeight ) / maxData ) +"px;width:" + barWidth + "px;'>" + data[prop].Pass + "</div>";
         leftPos += barWidth + 3;
         response += "<div type='" + type + "' class='chartdata' id='FailData" + prop + "' style='position:absolute;bottom:45px;left:" + leftPos + "px;float:left;background:#606060;font-weight:bold;padding:5px 0;color:#ece038;height:" + parseInt( ( data[prop].Fail * maxHeight ) / maxData ) +"px;width:" + barWidth + "px;'>" + data[prop].Fail + "</div>";
         leftPos += barWidth + 3;
      }
      
      response += "</div>";
      return response;
   };
 
   /****************************************************
    * Function : createMenu                            *
    * Brief    : Display Menu Bar                      *
    * Param    : None                                  *
    ****************************************************/ 
   function createMenu() {
      var apps = [];
      var coreTeams = [];
      var sprints = [];
      var locations = [];
      var platforms = [];
      for( var index = 0; index < APPLICATION_DATA.length; index++ ) {
         if ( coreTeams.indexOf( APPLICATION_DATA[index].Pillar ) === -1 ) {
            coreTeams.push( APPLICATION_DATA[index].Pillar );
         }
         if( APPLICATION_DATA[index].Pillar.indexOf( selectedCoreTeam ) > -1 ) {
            if ( apps.indexOf( APPLICATION_DATA[index].App_Name ) === -1 ) {
               apps.push( APPLICATION_DATA[index].App_Name );
            }
            if( APPLICATION_DATA[index].App_Name.indexOf( selectedApp ) > -1 ) {
               if ( sprints.indexOf( APPLICATION_DATA[index].Sprint_Id ) === -1 ) {
                  sprints.push( APPLICATION_DATA[index].Sprint_Id );
               }  
               if( APPLICATION_DATA[index].Sprint_Id.indexOf( selectedSprint ) > -1 ) {
                  if ( locations.indexOf( APPLICATION_DATA[index].Executed_At ) === -1 ) {
                     locations.push( APPLICATION_DATA[index].Executed_At );
                  }
                  if( APPLICATION_DATA[index].Platform.indexOf( selectedPlatform ) > -1 ) {
                     if ( platforms.indexOf( APPLICATION_DATA[index].Platform ) === -1 ) {
                        platforms.push( APPLICATION_DATA[index].Platform );
                     }                     
                  }
               }
            }
         }
      }
      drawMenuItems( apps, "menuTableApp" );
      drawMenuItems( coreTeams, "menuTableCoreTeam" );
      drawMenuItems( sprints, "menuTableSprint" );
      drawMenuItems( locations, "menuTableLocation" );
      drawMenuItems( platforms, "menuTablePlatform" ); 
      
      $("#spanCoreTeam").html( selectedCoreTeam );
      $("#spanApp").html( selectedApp );
      $("#spanSprint").html( selectedSprint );
      $("#spanLocation").html( selectedLocation );
      $("#spanPlatform").html( selectedPlatform );
      
      $(".menutable table td").on( "click", function() {
         switch ( $(this).parents("li").find(".name").html() ) {
            case "Core Team" : selectedCoreTeam = ( $(this).html() !== "All" ) ? $(this).html() : "";
               selectedApp = "";
               selectedLocation = "";
               selectedPlatform = "";
               selectedSprint = "";
               break;
            case "App"       : selectedApp      = ( $(this).html() !== "All" ) ? $(this).html() : ""; break;
            case "Sprint"    : selectedSprint   = ( $(this).html() !== "All" ) ? $(this).html() : ""; break;
            case "Location"  : selectedLocation = ( $(this).html() !== "All" ) ? $(this).html() : ""; break;
            case "Platform"  : selectedPlatform = ( $(this).html() !== "All" ) ? $(this).html() : ""; break;
            default          : break;
         }
         $(".menutable").hide();
         initialize();
      });
      $(".menutable table td").on( "mouseover", function() {
         $(this).parents("li").find("table").find("td").css("background","");
         $(this).css("background","#0096d6");
      });
      $(".content").on("click", function() {
         $(".menutable").hide();
      });     
   };
})();
