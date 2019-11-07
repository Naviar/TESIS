(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ "./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src/index.js?!./src/styles.css":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [[module.i, "/*!\nFullCalendar Core Package v4.1.0\nDocs & License: https://fullcalendar.io/\n(c) 2019 Adam Shaw\n*/\n.fc {\n  direction: ltr;\n  text-align: left; }\n.fc-rtl {\n  text-align: right; }\nbody .fc {\n  /* extra precedence to overcome jqui */\n  font-size: 1em; }\n/* Colors\n--------------------------------------------------------------------------------------------------*/\n.fc-highlight {\n  /* when user is selecting cells */\n  background: #bce8f1;\n  opacity: .3; }\n.fc-bgevent {\n  /* default look for background events */\n  background: #8fdf82;\n  opacity: .3; }\n.fc-nonbusiness {\n  /* default look for non-business-hours areas */\n  /* will inherit .fc-bgevent's styles */\n  background: #d7d7d7; }\n/* Popover\n--------------------------------------------------------------------------------------------------*/\n.fc-popover {\n  position: absolute;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15); }\n.fc-popover .fc-header {\n  /* TODO: be more consistent with fc-head/fc-body */\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2px 4px; }\n.fc-rtl .fc-popover .fc-header {\n  flex-direction: row-reverse; }\n.fc-popover .fc-header .fc-title {\n  margin: 0 2px; }\n.fc-popover .fc-header .fc-close {\n  cursor: pointer;\n  opacity: 0.65;\n  font-size: 1.1em; }\n/* Misc Reusable Components\n--------------------------------------------------------------------------------------------------*/\n.fc-divider {\n  border-style: solid;\n  border-width: 1px; }\nhr.fc-divider {\n  height: 0;\n  margin: 0;\n  padding: 0 0 2px;\n  /* height is unreliable across browsers, so use padding */\n  border-width: 1px 0; }\n.fc-bg,\n.fc-bgevent-skeleton,\n.fc-highlight-skeleton,\n.fc-mirror-skeleton {\n  /* these element should always cling to top-left/right corners */\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0; }\n.fc-bg {\n  bottom: 0;\n  /* strech bg to bottom edge */ }\n.fc-bg table {\n  height: 100%;\n  /* strech bg to bottom edge */ }\n/* Tables\n--------------------------------------------------------------------------------------------------*/\n.fc table {\n  width: 100%;\n  box-sizing: border-box;\n  /* fix scrollbar issue in firefox */\n  table-layout: fixed;\n  border-collapse: collapse;\n  border-spacing: 0;\n  font-size: 1em;\n  /* normalize cross-browser */ }\n.fc th {\n  text-align: center; }\n.fc th,\n.fc td {\n  border-style: solid;\n  border-width: 1px;\n  padding: 0;\n  vertical-align: top; }\n.fc td.fc-today {\n  border-style: double;\n  /* overcome neighboring borders */ }\n/* Internal Nav Links\n--------------------------------------------------------------------------------------------------*/\na[data-goto] {\n  cursor: pointer; }\na[data-goto]:hover {\n  text-decoration: underline; }\n/* Fake Table Rows\n--------------------------------------------------------------------------------------------------*/\n.fc .fc-row {\n  /* extra precedence to overcome themes forcing a 1px border */\n  /* no visible border by default. but make available if need be (scrollbar width compensation) */\n  border-style: solid;\n  border-width: 0; }\n.fc-row table {\n  /* don't put left/right border on anything within a fake row.\n     the outer tbody will worry about this */\n  border-left: 0 hidden transparent;\n  border-right: 0 hidden transparent;\n  /* no bottom borders on rows */\n  border-bottom: 0 hidden transparent; }\n.fc-row:first-child table {\n  border-top: 0 hidden transparent;\n  /* no top border on first row */ }\n/* Day Row (used within the header and the DayGrid)\n--------------------------------------------------------------------------------------------------*/\n.fc-row {\n  position: relative; }\n.fc-row .fc-bg {\n  z-index: 1; }\n/* highlighting cells & background event skeleton */\n.fc-row .fc-bgevent-skeleton,\n.fc-row .fc-highlight-skeleton {\n  bottom: 0;\n  /* stretch skeleton to bottom of row */ }\n.fc-row .fc-bgevent-skeleton table,\n.fc-row .fc-highlight-skeleton table {\n  height: 100%;\n  /* stretch skeleton to bottom of row */ }\n.fc-row .fc-highlight-skeleton td,\n.fc-row .fc-bgevent-skeleton td {\n  border-color: transparent; }\n.fc-row .fc-bgevent-skeleton {\n  z-index: 2; }\n.fc-row .fc-highlight-skeleton {\n  z-index: 3; }\n/*\nrow content (which contains day/week numbers and events) as well as \"mirror\" (which contains\ntemporary rendered events).\n*/\n.fc-row .fc-content-skeleton {\n  position: relative;\n  z-index: 4;\n  padding-bottom: 2px;\n  /* matches the space above the events */ }\n.fc-row .fc-mirror-skeleton {\n  z-index: 5; }\n.fc .fc-row .fc-content-skeleton table,\n.fc .fc-row .fc-content-skeleton td,\n.fc .fc-row .fc-mirror-skeleton td {\n  /* see-through to the background below */\n  /* extra precedence to prevent theme-provided backgrounds */\n  background: none;\n  /* in case <td>s are globally styled */\n  border-color: transparent; }\n.fc-row .fc-content-skeleton td,\n.fc-row .fc-mirror-skeleton td {\n  /* don't put a border between events and/or the day number */\n  border-bottom: 0; }\n.fc-row .fc-content-skeleton tbody td,\n.fc-row .fc-mirror-skeleton tbody td {\n  /* don't put a border between event cells */\n  border-top: 0; }\n/* Scrolling Container\n--------------------------------------------------------------------------------------------------*/\n.fc-scroller {\n  -webkit-overflow-scrolling: touch; }\n/* TODO: move to timegrid/daygrid */\n.fc-scroller > .fc-day-grid,\n.fc-scroller > .fc-time-grid {\n  position: relative;\n  /* re-scope all positions */\n  width: 100%;\n  /* hack to force re-sizing this inner element when scrollbars appear/disappear */ }\n/* Global Event Styles\n--------------------------------------------------------------------------------------------------*/\n.fc-event {\n  position: relative;\n  /* for resize handle and other inner positioning */\n  display: block;\n  /* make the <a> tag block */\n  font-size: .85em;\n  line-height: 1.4;\n  border-radius: 3px;\n  border: 1px solid #3788d8; }\n.fc-event,\n.fc-event-dot {\n  background-color: #3788d8;\n  /* default BACKGROUND color */ }\n.fc-event,\n.fc-event:hover {\n  color: #fff;\n  /* default TEXT color */\n  text-decoration: none;\n  /* if <a> has an href */ }\n.fc-event[href],\n.fc-event.fc-draggable {\n  cursor: pointer;\n  /* give events with links and draggable events a hand mouse pointer */ }\n.fc-not-allowed,\n.fc-not-allowed .fc-event {\n  /* to override an event's custom cursor */\n  cursor: not-allowed; }\n.fc-event .fc-content {\n  position: relative;\n  z-index: 2; }\n/* resizer (cursor AND touch devices) */\n.fc-event .fc-resizer {\n  position: absolute;\n  z-index: 4; }\n/* resizer (touch devices) */\n.fc-event .fc-resizer {\n  display: none; }\n.fc-event.fc-allow-mouse-resize .fc-resizer,\n.fc-event.fc-selected .fc-resizer {\n  /* only show when hovering or selected (with touch) */\n  display: block; }\n/* hit area */\n.fc-event.fc-selected .fc-resizer:before {\n  /* 40x40 touch area */\n  content: \"\";\n  position: absolute;\n  z-index: 9999;\n  /* user of this util can scope within a lower z-index */\n  top: 50%;\n  left: 50%;\n  width: 40px;\n  height: 40px;\n  margin-left: -20px;\n  margin-top: -20px; }\n/* Event Selection (only for touch devices)\n--------------------------------------------------------------------------------------------------*/\n.fc-event.fc-selected {\n  z-index: 9999 !important;\n  /* overcomes inline z-index */\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); }\n.fc-event.fc-selected:after {\n  content: \"\";\n  position: absolute;\n  z-index: 1;\n  /* same z-index as fc-bg, behind text */\n  /* overcome the borders */\n  top: -1px;\n  right: -1px;\n  bottom: -1px;\n  left: -1px;\n  /* darkening effect */\n  background: #000;\n  opacity: .25; }\n/* Event Dragging\n--------------------------------------------------------------------------------------------------*/\n.fc-event.fc-dragging.fc-selected {\n  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3); }\n.fc-event.fc-dragging:not(.fc-selected) {\n  opacity: .75; }\n/* Horizontal Events\n--------------------------------------------------------------------------------------------------*/\n/* bigger touch area when selected */\n.fc-h-event.fc-selected:before {\n  content: \"\";\n  position: absolute;\n  z-index: 3;\n  /* below resizers */\n  top: -10px;\n  bottom: -10px;\n  left: 0;\n  right: 0; }\n/* events that are continuing to/from another week. kill rounded corners and butt up against edge */\n.fc-ltr .fc-h-event.fc-not-start,\n.fc-rtl .fc-h-event.fc-not-end {\n  margin-left: 0;\n  border-left-width: 0;\n  padding-left: 1px;\n  /* replace the border with padding */\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0; }\n.fc-ltr .fc-h-event.fc-not-end,\n.fc-rtl .fc-h-event.fc-not-start {\n  margin-right: 0;\n  border-right-width: 0;\n  padding-right: 1px;\n  /* replace the border with padding */\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0; }\n/* resizer (cursor AND touch devices) */\n/* left resizer  */\n.fc-ltr .fc-h-event .fc-start-resizer,\n.fc-rtl .fc-h-event .fc-end-resizer {\n  cursor: w-resize;\n  left: -1px;\n  /* overcome border */ }\n/* right resizer */\n.fc-ltr .fc-h-event .fc-end-resizer,\n.fc-rtl .fc-h-event .fc-start-resizer {\n  cursor: e-resize;\n  right: -1px;\n  /* overcome border */ }\n/* resizer (mouse devices) */\n.fc-h-event.fc-allow-mouse-resize .fc-resizer {\n  width: 7px;\n  top: -1px;\n  /* overcome top border */\n  bottom: -1px;\n  /* overcome bottom border */ }\n/* resizer (touch devices) */\n.fc-h-event.fc-selected .fc-resizer {\n  /* 8x8 little dot */\n  border-radius: 4px;\n  border-width: 1px;\n  width: 6px;\n  height: 6px;\n  border-style: solid;\n  border-color: inherit;\n  background: #fff;\n  /* vertically center */\n  top: 50%;\n  margin-top: -4px; }\n/* left resizer  */\n.fc-ltr .fc-h-event.fc-selected .fc-start-resizer,\n.fc-rtl .fc-h-event.fc-selected .fc-end-resizer {\n  margin-left: -4px;\n  /* centers the 8x8 dot on the left edge */ }\n/* right resizer */\n.fc-ltr .fc-h-event.fc-selected .fc-end-resizer,\n.fc-rtl .fc-h-event.fc-selected .fc-start-resizer {\n  margin-right: -4px;\n  /* centers the 8x8 dot on the right edge */ }\n/* DayGrid events\n----------------------------------------------------------------------------------------------------\nWe use the full \"fc-day-grid-event\" class instead of using descendants because the event won't\nbe a descendant of the grid when it is being dragged.\n*/\n.fc-day-grid-event {\n  margin: 1px 2px 0;\n  /* spacing between events and edges */\n  padding: 0 1px; }\ntr:first-child > td > .fc-day-grid-event {\n  margin-top: 2px;\n  /* a little bit more space before the first event */ }\n.fc-mirror-skeleton tr:first-child > td > .fc-day-grid-event {\n  margin-top: 0;\n  /* except for mirror skeleton */ }\n.fc-day-grid-event .fc-content {\n  /* force events to be one-line tall */\n  white-space: nowrap;\n  overflow: hidden; }\n.fc-day-grid-event .fc-time {\n  font-weight: bold; }\n/* resizer (cursor devices) */\n/* left resizer  */\n.fc-ltr .fc-day-grid-event.fc-allow-mouse-resize .fc-start-resizer,\n.fc-rtl .fc-day-grid-event.fc-allow-mouse-resize .fc-end-resizer {\n  margin-left: -2px;\n  /* to the day cell's edge */ }\n/* right resizer */\n.fc-ltr .fc-day-grid-event.fc-allow-mouse-resize .fc-end-resizer,\n.fc-rtl .fc-day-grid-event.fc-allow-mouse-resize .fc-start-resizer {\n  margin-right: -2px;\n  /* to the day cell's edge */ }\n/* Event Limiting\n--------------------------------------------------------------------------------------------------*/\n/* \"more\" link that represents hidden events */\na.fc-more {\n  margin: 1px 3px;\n  font-size: .85em;\n  cursor: pointer;\n  text-decoration: none; }\na.fc-more:hover {\n  text-decoration: underline; }\n.fc-limited {\n  /* rows and cells that are hidden because of a \"more\" link */\n  display: none; }\n/* popover that appears when \"more\" link is clicked */\n.fc-day-grid .fc-row {\n  z-index: 1;\n  /* make the \"more\" popover one higher than this */ }\n.fc-more-popover {\n  z-index: 2;\n  width: 220px; }\n.fc-more-popover .fc-event-container {\n  padding: 10px; }\n/* Now Indicator\n--------------------------------------------------------------------------------------------------*/\n.fc-now-indicator {\n  position: absolute;\n  border: 0 solid red; }\n/* Utilities\n--------------------------------------------------------------------------------------------------*/\n.fc-unselectable {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-touch-callout: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }\n/*\nTODO: more distinction between this file and common.css\n*/\n/* Colors\n--------------------------------------------------------------------------------------------------*/\n.fc-unthemed th,\n.fc-unthemed td,\n.fc-unthemed thead,\n.fc-unthemed tbody,\n.fc-unthemed .fc-divider,\n.fc-unthemed .fc-row,\n.fc-unthemed .fc-content,\n.fc-unthemed .fc-popover,\n.fc-unthemed .fc-list-view,\n.fc-unthemed .fc-list-heading td {\n  border-color: #ddd; }\n.fc-unthemed .fc-popover {\n  background-color: #fff; }\n.fc-unthemed .fc-divider,\n.fc-unthemed .fc-popover .fc-header,\n.fc-unthemed .fc-list-heading td {\n  background: #eee; }\n.fc-unthemed td.fc-today {\n  background: #fcf8e3; }\n.fc-unthemed .fc-disabled-day {\n  background: #d7d7d7;\n  opacity: .3; }\n/* Icons\n--------------------------------------------------------------------------------------------------\nfrom https://feathericons.com/ and built with IcoMoon\n*/\n@font-face {\n  font-family: 'fcicons';\n  src: url(\"data:application/x-font-ttf;charset=utf-8;base64,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\") format(\"truetype\");\n  font-weight: normal;\n  font-style: normal; }\n.fc-icon {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'fcicons' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n.fc-icon-chevron-left:before {\n  content: \"\\e900\"; }\n.fc-icon-chevron-right:before {\n  content: \"\\e901\"; }\n.fc-icon-chevrons-left:before {\n  content: \"\\e902\"; }\n.fc-icon-chevrons-right:before {\n  content: \"\\e903\"; }\n.fc-icon-minus-square:before {\n  content: \"\\e904\"; }\n.fc-icon-plus-square:before {\n  content: \"\\e905\"; }\n.fc-icon-x:before {\n  content: \"\\e906\"; }\n.fc-icon {\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  text-align: center; }\n/* Buttons\n--------------------------------------------------------------------------------------------------\nLots taken from Flatly (MIT): https://bootswatch.com/4/flatly/bootstrap.css\n*/\n/* reset */\n.fc-button {\n  border-radius: 0;\n  overflow: visible;\n  text-transform: none;\n  margin: 0;\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit; }\n.fc-button:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color; }\n.fc-button {\n  -webkit-appearance: button; }\n.fc-button:not(:disabled) {\n  cursor: pointer; }\n.fc-button::-moz-focus-inner {\n  padding: 0;\n  border-style: none; }\n/* theme */\n.fc-button {\n  display: inline-block;\n  font-weight: 400;\n  color: #212529;\n  text-align: center;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  background-color: transparent;\n  border: 1px solid transparent;\n  padding: 0.4em 0.65em;\n  font-size: 1em;\n  line-height: 1.5;\n  border-radius: 0.25em; }\n.fc-button:hover {\n  color: #212529;\n  text-decoration: none; }\n.fc-button:focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(44, 62, 80, 0.25); }\n.fc-button:disabled {\n  opacity: 0.65; }\n/* \"primary\" coloring */\n.fc-button-primary {\n  color: #fff;\n  background-color: #2C3E50;\n  border-color: #2C3E50; }\n.fc-button-primary:hover {\n  color: #fff;\n  background-color: #1e2b37;\n  border-color: #1a252f; }\n.fc-button-primary:focus {\n  box-shadow: 0 0 0 0.2rem rgba(76, 91, 106, 0.5); }\n.fc-button-primary:disabled {\n  color: #fff;\n  background-color: #2C3E50;\n  border-color: #2C3E50; }\n.fc-button-primary:not(:disabled):active,\n.fc-button-primary:not(:disabled).fc-button-active {\n  color: #fff;\n  background-color: #1a252f;\n  border-color: #151e27; }\n.fc-button-primary:not(:disabled):active:focus,\n.fc-button-primary:not(:disabled).fc-button-active:focus {\n  box-shadow: 0 0 0 0.2rem rgba(76, 91, 106, 0.5); }\n/* icons within buttons */\n.fc-button .fc-icon {\n  vertical-align: middle;\n  font-size: 1.5em; }\n/* Buttons Groups\n--------------------------------------------------------------------------------------------------*/\n.fc-button-group {\n  position: relative;\n  display: inline-flex;\n  vertical-align: middle; }\n.fc-button-group > .fc-button {\n  position: relative;\n  flex: 1 1 auto; }\n.fc-button-group > .fc-button:hover {\n  z-index: 1; }\n.fc-button-group > .fc-button:focus,\n.fc-button-group > .fc-button:active,\n.fc-button-group > .fc-button.fc-button-active {\n  z-index: 1; }\n.fc-button-group > .fc-button:not(:first-child) {\n  margin-left: -1px; }\n.fc-button-group > .fc-button:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0; }\n.fc-button-group > .fc-button:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0; }\n/* Popover\n--------------------------------------------------------------------------------------------------*/\n.fc-unthemed .fc-popover {\n  border-width: 1px;\n  border-style: solid; }\n/* List View\n--------------------------------------------------------------------------------------------------*/\n.fc-unthemed .fc-list-item:hover td {\n  background-color: #f5f5f5; }\n/* Toolbar\n--------------------------------------------------------------------------------------------------*/\n.fc-toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center; }\n.fc-toolbar.fc-header-toolbar {\n  margin-bottom: 1.5em; }\n.fc-toolbar.fc-footer-toolbar {\n  margin-top: 1.5em; }\n/* inner content */\n.fc-toolbar > * > :not(:first-child) {\n  margin-left: .75em; }\n.fc-toolbar h2 {\n  font-size: 1.75em;\n  margin: 0; }\n/* View Structure\n--------------------------------------------------------------------------------------------------*/\n.fc-view-container {\n  position: relative; }\n/* undo twitter bootstrap's box-sizing rules. normalizes positioning techniques */\n/* don't do this for the toolbar because we'll want bootstrap to style those buttons as some pt */\n.fc-view-container *,\n.fc-view-container *:before,\n.fc-view-container *:after {\n  box-sizing: content-box; }\n.fc-view,\n.fc-view > table {\n  /* so dragged elements can be above the view's main element */\n  position: relative;\n  z-index: 1; }\n@media print {\n  .fc {\n    max-width: 100% !important; }\n\n  /* Global Event Restyling\n  --------------------------------------------------------------------------------------------------*/\n  .fc-event {\n    background: #fff !important;\n    color: #000 !important;\n    page-break-inside: avoid; }\n\n  .fc-event .fc-resizer {\n    display: none; }\n\n  /* Table & Day-Row Restyling\n  --------------------------------------------------------------------------------------------------*/\n  .fc th,\n  .fc td,\n  .fc hr,\n  .fc thead,\n  .fc tbody,\n  .fc-row {\n    border-color: #ccc !important;\n    background: #fff !important; }\n\n  /* kill the overlaid, absolutely-positioned components */\n  /* common... */\n  .fc-bg,\n  .fc-bgevent-skeleton,\n  .fc-highlight-skeleton,\n  .fc-mirror-skeleton,\n  .fc-bgevent-container,\n  .fc-business-container,\n  .fc-highlight-container,\n  .fc-mirror-container {\n    display: none; }\n\n  /* don't force a min-height on rows (for DayGrid) */\n  .fc tbody .fc-row {\n    height: auto !important;\n    /* undo height that JS set in distributeHeight */\n    min-height: 0 !important;\n    /* undo the min-height from each view's specific stylesheet */ }\n\n  .fc tbody .fc-row .fc-content-skeleton {\n    position: static;\n    /* undo .fc-rigid */\n    padding-bottom: 0 !important;\n    /* use a more border-friendly method for this... */ }\n\n  .fc tbody .fc-row .fc-content-skeleton tbody tr:last-child td {\n    /* only works in newer browsers */\n    padding-bottom: 1em;\n    /* ...gives space within the skeleton. also ensures min height in a way */ }\n\n  .fc tbody .fc-row .fc-content-skeleton table {\n    /* provides a min-height for the row, but only effective for IE, which exaggerates this value,\n       making it look more like 3em. for other browers, it will already be this tall */\n    height: 1em; }\n\n  /* Undo month-view event limiting. Display all events and hide the \"more\" links\n  --------------------------------------------------------------------------------------------------*/\n  .fc-more-cell,\n  .fc-more {\n    display: none !important; }\n\n  .fc tr.fc-limited {\n    display: table-row !important; }\n\n  .fc td.fc-limited {\n    display: table-cell !important; }\n\n  .fc-popover {\n    display: none;\n    /* never display the \"more..\" popover in print mode */ }\n\n  /* TimeGrid Restyling\n  --------------------------------------------------------------------------------------------------*/\n  /* undo the min-height 100% trick used to fill the container's height */\n  .fc-time-grid {\n    min-height: 0 !important; }\n\n  /* don't display the side axis at all (\"all-day\" and time cells) */\n  .fc-timeGrid-view .fc-axis {\n    display: none; }\n\n  /* don't display the horizontal lines */\n  .fc-slats,\n  .fc-time-grid hr {\n    /* this hr is used when height is underused and needs to be filled */\n    display: none !important;\n    /* important overrides inline declaration */ }\n\n  /* let the container that holds the events be naturally positioned and create real height */\n  .fc-time-grid .fc-content-skeleton {\n    position: static; }\n\n  /* in case there are no events, we still want some height */\n  .fc-time-grid .fc-content-skeleton table {\n    height: 4em; }\n\n  /* kill the horizontal spacing made by the event container. event margins will be done below */\n  .fc-time-grid .fc-event-container {\n    margin: 0 !important; }\n\n  /* TimeGrid *Event* Restyling\n  --------------------------------------------------------------------------------------------------*/\n  /* naturally position events, vertically stacking them */\n  .fc-time-grid .fc-event {\n    position: static !important;\n    margin: 3px 2px !important; }\n\n  /* for events that continue to a future day, give the bottom border back */\n  .fc-time-grid .fc-event.fc-not-end {\n    border-bottom-width: 1px !important; }\n\n  /* indicate the event continues via \"...\" text */\n  .fc-time-grid .fc-event.fc-not-end:after {\n    content: \"...\"; }\n\n  /* for events that are continuations from previous days, give the top border back */\n  .fc-time-grid .fc-event.fc-not-start {\n    border-top-width: 1px !important; }\n\n  /* indicate the event is a continuation via \"...\" text */\n  .fc-time-grid .fc-event.fc-not-start:before {\n    content: \"...\"; }\n\n  /* time */\n  /* undo a previous declaration and let the time text span to a second line */\n  .fc-time-grid .fc-event .fc-time {\n    white-space: normal !important; }\n\n  /* hide the the time that is normally displayed... */\n  .fc-time-grid .fc-event .fc-time span {\n    display: none; }\n\n  /* ...replace it with a more verbose version (includes AM/PM) stored in an html attribute */\n  .fc-time-grid .fc-event .fc-time:after {\n    content: attr(data-full); }\n\n  /* Vertical Scroller & Containers\n  --------------------------------------------------------------------------------------------------*/\n  /* kill the scrollbars and allow natural height */\n  .fc-scroller,\n  .fc-day-grid-container,\n  .fc-time-grid-container {\n    /* */\n    overflow: visible !important;\n    height: auto !important; }\n\n  /* kill the horizontal border/padding used to compensate for scrollbars */\n  .fc-row {\n    border: 0 !important;\n    margin: 0 !important; }\n\n  /* Button Controls\n  --------------------------------------------------------------------------------------------------*/\n  .fc-button-group,\n  .fc button {\n    display: none;\n    /* don't display any button-related controls */ } }\n/*!\nFullCalendar Day Grid Plugin v4.1.0\nDocs & License: https://fullcalendar.io/\n(c) 2019 Adam Shaw\n*/\n/* DayGridView\n--------------------------------------------------------------------------------------------------*/\n/* day row structure */\n.fc-dayGridWeek-view .fc-content-skeleton,\n.fc-dayGridDay-view .fc-content-skeleton {\n  /* there may be week numbers in these views, so no padding-top */\n  padding-bottom: 1em;\n  /* ensure a space at bottom of cell for user selecting/clicking */ }\n.fc-dayGrid-view .fc-body .fc-row {\n  min-height: 4em;\n  /* ensure that all rows are at least this tall */ }\n/* a \"rigid\" row will take up a constant amount of height because content-skeleton is absolute */\n.fc-row.fc-rigid {\n  overflow: hidden; }\n.fc-row.fc-rigid .fc-content-skeleton {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0; }\n/* week and day number styling */\n.fc-day-top.fc-other-month {\n  opacity: 0.3; }\n.fc-dayGrid-view .fc-week-number,\n.fc-dayGrid-view .fc-day-number {\n  padding: 2px; }\n.fc-dayGrid-view th.fc-week-number,\n.fc-dayGrid-view th.fc-day-number {\n  padding: 0 2px;\n  /* column headers can't have as much v space */ }\n.fc-ltr .fc-dayGrid-view .fc-day-top .fc-day-number {\n  float: right; }\n.fc-rtl .fc-dayGrid-view .fc-day-top .fc-day-number {\n  float: left; }\n.fc-ltr .fc-dayGrid-view .fc-day-top .fc-week-number {\n  float: left;\n  border-radius: 0 0 3px 0; }\n.fc-rtl .fc-dayGrid-view .fc-day-top .fc-week-number {\n  float: right;\n  border-radius: 0 0 0 3px; }\n.fc-dayGrid-view .fc-day-top .fc-week-number {\n  min-width: 1.5em;\n  text-align: center;\n  background-color: #f2f2f2;\n  color: #808080; }\n/* when week/day number have own column */\n.fc-dayGrid-view td.fc-week-number {\n  text-align: center; }\n.fc-dayGrid-view td.fc-week-number > * {\n  /* work around the way we do column resizing and ensure a minimum width */\n  display: inline-block;\n  min-width: 1.25em; }\n#time-picker-wrapper{\r\n    z-index: 7000 !important;\r\n    background-color: #00468f;\r\n  }\r\n \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AZnVsbGNhbGVuZGFyL2NvcmUvbWFpbi5jc3MiLCJub2RlX21vZHVsZXMvQGZ1bGxjYWxlbmRhci9kYXlncmlkL21haW4uY3NzIiwic3JjL3N0eWxlcy5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Q0FJQztBQUNEO0VBQ0UsY0FBYztFQUNkLGdCQUFnQixFQUFFO0FBRXBCO0VBQ0UsaUJBQWlCLEVBQUU7QUFFckI7RUFDRSxzQ0FBc0M7RUFDdEMsY0FBYyxFQUFFO0FBRWxCO21HQUNtRztBQUNuRztFQUNFLGlDQUFpQztFQUNqQyxtQkFBbUI7RUFDbkIsV0FBVyxFQUFFO0FBRWY7RUFDRSx1Q0FBdUM7RUFDdkMsbUJBQW1CO0VBQ25CLFdBQVcsRUFBRTtBQUVmO0VBQ0UsOENBQThDO0VBQzlDLHNDQUFzQztFQUN0QyxtQkFBbUIsRUFBRTtBQUV2QjttR0FDbUc7QUFDbkc7RUFDRSxrQkFBa0I7RUFDbEIseUNBQXlDLEVBQUU7QUFFN0M7RUFDRSxrREFBa0Q7RUFDbEQsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLGdCQUFnQixFQUFFO0FBRXBCO0VBQ0UsMkJBQTJCLEVBQUU7QUFFL0I7RUFDRSxhQUFhLEVBQUU7QUFFakI7RUFDRSxlQUFlO0VBQ2YsYUFBYTtFQUNiLGdCQUFnQixFQUFFO0FBRXBCO21HQUNtRztBQUNuRztFQUNFLG1CQUFtQjtFQUNuQixpQkFBaUIsRUFBRTtBQUVyQjtFQUNFLFNBQVM7RUFDVCxTQUFTO0VBQ1QsZ0JBQWdCO0VBQ2hCLHlEQUF5RDtFQUN6RCxtQkFBbUIsRUFBRTtBQUV2Qjs7OztFQUlFLGdFQUFnRTtFQUNoRSxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLE9BQU87RUFDUCxRQUFRLEVBQUU7QUFFWjtFQUNFLFNBQVM7RUFDVCw2QkFBNkIsRUFBRTtBQUVqQztFQUNFLFlBQVk7RUFDWiw2QkFBNkIsRUFBRTtBQUVqQzttR0FDbUc7QUFD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QztFQUNFLGtCQUFrQixFQUFFO0FBRXRCO0VBQ0UseUVBQXlFO0VBQ3pFLHFCQUFxQjtFQUNyQixpQkFBaUIsRUFBRTtBQ2pFckI7SUFDSSx3QkFBd0I7SUFDeEIseUJBQXlCO0VBQzNCIiwiZmlsZSI6InNyYy9zdHlsZXMuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG5GdWxsQ2FsZW5kYXIgQ29yZSBQYWNrYWdlIHY0LjEuMFxuRG9jcyAmIExpY2Vuc2U6IGh0dHBzOi8vZnVsbGNhbGVuZGFyLmlvL1xuKGMpIDIwMTkgQWRhbSBTaGF3XG4qL1xuLmZjIHtcbiAgZGlyZWN0aW9uOiBsdHI7XG4gIHRleHQtYWxpZ246IGxlZnQ7IH1cblxuLmZjLXJ0bCB7XG4gIHRleHQtYWxpZ246IHJpZ2h0OyB9XG5cbmJvZHkgLmZjIHtcbiAgLyogZXh0cmEgcHJlY2VkZW5jZSB0byBvdmVyY29tZSBqcXVpICovXG4gIGZvbnQtc2l6ZTogMWVtOyB9XG5cbi8qIENvbG9yc1xuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLmZjLWhpZ2hsaWdodCB7XG4gIC8qIHdoZW4gdXNlciBpcyBzZWxlY3RpbmcgY2VsbHMgKi9cbiAgYmFja2dyb3VuZDogI2JjZThmMTtcbiAgb3BhY2l0eTogLjM7IH1cblxuLmZjLWJnZXZlbnQge1xuICAvKiBkZWZhdWx0IGxvb2sgZm9yIGJhY2tncm91bmQgZXZlbnRzICovXG4gIGJhY2tncm91bmQ6ICM4ZmRmODI7XG4gIG9wYWNpdHk6IC4zOyB9XG5cbi5mYy1ub25idXNpbmVzcyB7XG4gIC8qIGRlZmF1bHQgbG9vayBmb3Igbm9uLWJ1c2luZXNzLWhvdXJzIGFyZWFzICovXG4gIC8qIHdpbGwgaW5oZXJpdCAuZmMtYmdldmVudCdzIHN0eWxlcyAqL1xuICBiYWNrZ3JvdW5kOiAjZDdkN2Q3OyB9XG5cbi8qIFBvcG92ZXJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi5mYy1wb3BvdmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3gtc2hhZG93OiAwIDJweCA2cHggcmdiYSgwLCAwLCAwLCAwLjE1KTsgfVxuXG4uZmMtcG9wb3ZlciAuZmMtaGVhZGVyIHtcbiAgLyogVE9ETzogYmUgbW9yZSBjb25zaXN0ZW50IHdpdGggZmMtaGVhZC9mYy1ib2R5ICovXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMnB4IDRweDsgfVxuXG4uZmMtcnRsIC5mYy1wb3BvdmVyIC5mYy1oZWFkZXIge1xuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7IH1cblxuLmZjLXBvcG92ZXIgLmZjLWhlYWRlciAuZmMtdGl0bGUge1xuICBtYXJnaW46IDAgMnB4OyB9XG5cbi5mYy1wb3BvdmVyIC5mYy1oZWFkZXIgLmZjLWNsb3NlIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBvcGFjaXR5OiAwLjY1O1xuICBmb250LXNpemU6IDEuMWVtOyB9XG5cbi8qIE1pc2MgUmV1c2FibGUgQ29tcG9uZW50c1xuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLmZjLWRpdmlkZXIge1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItd2lkdGg6IDFweDsgfVxuXG5oci5mYy1kaXZpZGVyIHtcbiAgaGVpZ2h0OiAwO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDAgMCAycHg7XG4gIC8qIGhlaWdodCBpcyB1bnJlbGlhYmxlIGFjcm9zcyBicm93c2Vycywgc28gdXNlIHBhZGRpbmcgKi9cbiAgYm9yZGVyLXdpZHRoOiAxcHggMDsgfVxuXG4uZmMtYmcsXG4uZmMtYmdldmVudC1za2VsZXRvbixcbi5mYy1oaWdobGlnaHQtc2tlbGV0b24sXG4uZmMtbWlycm9yLXNrZWxldG9uIHtcbiAgLyogdGhlc2UgZWxlbWVudCBzaG91bGQgYWx3YXlzIGNsaW5nIHRvIHRvcC1sZWZ0L3JpZ2h0IGNvcm5lcnMgKi9cbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwOyB9XG5cbi5mYy1iZyB7XG4gIGJvdHRvbTogMDtcbiAgLyogc3RyZWNoIGJnIHRvIGJvdHRvbSBlZGdlICovIH1cblxuLmZjLWJnIHRhYmxlIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICAvKiBzdHJlY2ggYmcgdG8gYm90dG9tIGVkZ2UgKi8gfVxuXG4vKiBUYWJsZXNcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi5mYyB0YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAvKiBmaXggc2Nyb2xsYmFyIGlzc3VlIGluIGZpcmVmb3ggKi9cbiAgdGFibGUtbGF5b3V0OiBmaXhlZDtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XG4gIGZvbnQtc2l6ZTogMWVtO1xuICAvKiBub3JtYWxpemUgY3Jvc3MtYnJvd3NlciAqLyB9XG5cbi5mYyB0aCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxuXG4uZmMgdGgsXG4uZmMgdGQge1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItd2lkdGg6IDFweDtcbiAgcGFkZGluZzogMDtcbiAgdmVydGljYWwtYWxpZ246IHRvcDsgfVxuXG4uZmMgdGQuZmMtdG9kYXkge1xuICBib3JkZXItc3R5bGU6IGRvdWJsZTtcbiAgLyogb3ZlcmNvbWUgbmVpZ2hib3JpbmcgYm9yZGVycyAqLyB9XG5cbi8qIEludGVybmFsIE5hdiBMaW5rc1xuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuYVtkYXRhLWdvdG9dIHtcbiAgY3Vyc29yOiBwb2ludGVyOyB9XG5cbmFbZGF0YS1nb3RvXTpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyB9XG5cbi8qIEZha2UgVGFibGUgUm93c1xuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLmZjIC5mYy1yb3cge1xuICAvKiBleHRyYSBwcmVjZWRlbmNlIHRvIG92ZXJjb21lIHRoZW1lcyBmb3JjaW5nIGEgMXB4IGJvcmRlciAqL1xuICAvKiBubyB2aXNpYmxlIGJvcmRlciBieSBkZWZhdWx0LiBidXQgbWFrZSBhdmFpbGFibGUgaWYgbmVlZCBiZSAoc2Nyb2xsYmFyIHdpZHRoIGNvbXBlbnNhdGlvbikgKi9cbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLXdpZHRoOiAwOyB9XG5cbi5mYy1yb3cgdGFibGUge1xuICAvKiBkb24ndCBwdXQgbGVmdC9yaWdodCBib3JkZXIgb24gYW55dGhpbmcgd2l0aGluIGEgZmFrZSByb3cuXG4gICAgIHRoZSBvdXRlciB0Ym9keSB3aWxsIHdvcnJ5IGFib3V0IHRoaXMgKi9cbiAgYm9yZGVyLWxlZnQ6IDAgaGlkZGVuIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmlnaHQ6IDAgaGlkZGVuIHRyYW5zcGFyZW50O1xuICAvKiBubyBib3R0b20gYm9yZGVycyBvbiByb3dzICovXG4gIGJvcmRlci1ib3R0b206IDAgaGlkZGVuIHRyYW5zcGFyZW50OyB9XG5cbi5mYy1yb3c6Zmlyc3QtY2hpbGQgdGFibGUge1xuICBib3JkZXItdG9wOiAwIGhpZGRlbiB0cmFuc3BhcmVudDtcbiAgLyogbm8gdG9wIGJvcmRlciBvbiBmaXJzdCByb3cgKi8gfVxuXG4vKiBEYXkgUm93ICh1c2VkIHdpdGhpbiB0aGUgaGVhZGVyIGFuZCB0aGUgRGF5R3JpZClcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi5mYy1yb3cge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cblxuLmZjLXJvdyAuZmMtYmcge1xuICB6LWluZGV4OiAxOyB9XG5cbi8qIGhpZ2hsaWdodGluZyBjZWxscyAmIGJhY2tncm91bmQgZXZlbnQgc2tlbGV0b24gKi9cbi5mYy1yb3cgLmZjLWJnZXZlbnQtc2tlbGV0b24sXG4uZmMtcm93IC5mYy1oaWdobGlnaHQtc2tlbGV0b24ge1xuICBib3R0b206IDA7XG4gIC8qIHN0cmV0Y2ggc2tlbGV0b24gdG8gYm90dG9tIG9mIHJvdyAqLyB9XG5cbi5mYy1yb3cgLmZjLWJnZXZlbnQtc2tlbGV0b24gdGFibGUsXG4uZmMtcm93IC5mYy1oaWdobGlnaHQtc2tlbGV0b24gdGFibGUge1xuICBoZWlnaHQ6IDEwMCU7XG4gIC8qIHN0cmV0Y2ggc2tlbGV0b24gdG8gYm90dG9tIG9mIHJvdyAqLyB9XG5cbi5mYy1yb3cgLmZjLWhpZ2hsaWdodC1za2VsZXRvbiB0ZCxcbi5mYy1yb3cgLmZjLWJnZXZlbnQtc2tlbGV0b24gdGQge1xuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50OyB9XG5cbi5mYy1yb3cgLmZjLWJnZXZlbnQtc2tlbGV0b24ge1xuICB6LWluZGV4OiAyOyB9XG5cbi5mYy1yb3cgLmZjLWhpZ2hsaWdodC1za2VsZXRvbiB7XG4gIHotaW5kZXg6IDM7IH1cblxuLypcbnJvdyBjb250ZW50ICh3aGljaCBjb250YWlucyBkYXkvd2VlayBudW1iZXJzIGFuZCBldmVudHMpIGFzIHdlbGwgYXMgXCJtaXJyb3JcIiAod2hpY2ggY29udGFpbnNcbnRlbXBvcmFyeSByZW5kZXJlZCBldmVudHMpLlxuKi9cbi5mYy1yb3cgLmZjLWNvbnRlbnQtc2tlbGV0b24ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDQ7XG4gIHBhZGRpbmctYm90dG9tOiAycHg7XG4gIC8qIG1hdGNoZXMgdGhlIHNwYWNlIGFib3ZlIHRoZSBldmVudHMgKi8gfVxuXG4uZmMtcm93IC5mYy1taXJyb3Itc2tlbGV0b24ge1xuICB6LWluZGV4OiA1OyB9XG5cbi5mYyAuZmMtcm93IC5mYy1jb250ZW50LXNrZWxldG9uIHRhYmxlLFxuLmZjIC5mYy1yb3cgLmZjLWNvbnRlbnQtc2tlbGV0b24gdGQsXG4uZmMgLmZjLXJvdyAuZmMtbWlycm9yLXNrZWxldG9uIHRkIHtcbiAgLyogc2VlLXRocm91Z2ggdG8gdGhlIGJhY2tncm91bmQgYmVsb3cgKi9cbiAgLyogZXh0cmEgcHJlY2VkZW5jZSB0byBwcmV2ZW50IHRoZW1lLXByb3ZpZGVkIGJhY2tncm91bmRzICovXG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIC8qIGluIGNhc2UgPHRkPnMgYXJlIGdsb2JhbGx5IHN0eWxlZCAqL1xuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50OyB9XG5cbi5mYy1yb3cgLmZjLWNvbnRlbnQtc2tlbGV0b24gdGQsXG4uZmMtcm93IC5mYy1taXJyb3Itc2tlbGV0b24gdGQge1xuICAvKiBkb24ndCBwdXQgYSBib3JkZXIgYmV0d2VlbiBldmVudHMgYW5kL29yIHRoZSBkYXkgbnVtYmVyICovXG4gIGJvcmRlci1ib3R0b206IDA7IH1cblxuLmZjLXJvdyAuZmMtY29udGVudC1za2VsZXRvbiB0Ym9keSB0ZCxcbi5mYy1yb3cgLmZjLW1pcnJvci1za2VsZXRvbiB0Ym9keSB0ZCB7XG4gIC8qIGRvbid0IHB1dCBhIGJvcmRlciBiZXR3ZWVuIGV2ZW50IGNlbGxzICovXG4gIGJvcmRlci10b3A6IDA7IH1cblxuLyogU2Nyb2xsaW5nIENvbnRhaW5lclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLmZjLXNjcm9sbGVyIHtcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoOyB9XG5cbi8qIFRPRE86IG1vdmUgdG8gdGltZWdyaWQvZGF5Z3JpZCAqL1xuLmZjLXNjcm9sbGVyID4gLmZjLWRheS1ncmlkLFxuLmZjLXNjcm9sbGVyID4gLmZjLXRpbWUtZ3JpZCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgLyogcmUtc2NvcGUgYWxsIHBvc2l0aW9ucyAqL1xuICB3aWR0aDogMTAwJTtcbiAgLyogaGFjayB0byBmb3JjZSByZS1zaXppbmcgdGhpcyBpbm5lciBlbGVtZW50IHdoZW4gc2Nyb2xsYmFycyBhcHBlYXIvZGlzYXBwZWFyICovIH1cblxuLyogR2xvYmFsIEV2ZW50IFN0eWxlc1xuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLmZjLWV2ZW50IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAvKiBmb3IgcmVzaXplIGhhbmRsZSBhbmQgb3RoZXIgaW5uZXIgcG9zaXRpb25pbmcgKi9cbiAgZGlzcGxheTogYmxvY2s7XG4gIC8qIG1ha2UgdGhlIDxhPiB0YWcgYmxvY2sgKi9cbiAgZm9udC1zaXplOiAuODVlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjMzc4OGQ4OyB9XG5cbi5mYy1ldmVudCxcbi5mYy1ldmVudC1kb3Qge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzc4OGQ4O1xuICAvKiBkZWZhdWx0IEJBQ0tHUk9VTkQgY29sb3IgKi8gfVxuXG4uZmMtZXZlbnQsXG4uZmMtZXZlbnQ6aG92ZXIge1xuICBjb2xvcjogI2ZmZjtcbiAgLyogZGVmYXVsdCBURVhUIGNvbG9yICovXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgLyogaWYgPGE+IGhhcyBhbiBocmVmICovIH1cblxuLmZjLWV2ZW50W2hyZWZdLFxuLmZjLWV2ZW50LmZjLWRyYWdnYWJsZSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgLyogZ2l2ZSBldmVudHMgd2l0aCBsaW5rcyBhbmQgZHJhZ2dhYmxlIGV2ZW50cyBhIGhhbmQgbW91c2UgcG9pbnRlciAqLyB9XG5cbi5mYy1ub3QtYWxsb3dlZCxcbi5mYy1ub3QtYWxsb3dlZCAuZmMtZXZlbnQge1xuICAvKiB0byBvdmVycmlkZSBhbiBldmVudCdzIGN1c3RvbSBjdXJzb3IgKi9cbiAgY3Vyc29yOiBub3QtYWxsb3dlZDsgfVxuXG4uZmMtZXZlbnQgLmZjLWNvbnRlbnQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDI7IH1cblxuLyogcmVzaXplciAoY3Vyc29yIEFORCB0b3VjaCBkZXZpY2VzKSAqL1xuLmZjLWV2ZW50IC5mYy1yZXNpemVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiA0OyB9XG5cbi8qIHJlc2l6ZXIgKHRvdWNoIGRldmljZXMpICovXG4uZmMtZXZlbnQgLmZjLXJlc2l6ZXIge1xuICBkaXNwbGF5OiBub25lOyB9XG5cbi5mYy1ldmVudC5mYy1hbGxvdy1tb3VzZS1yZXNpemUgLmZjLXJlc2l6ZXIsXG4uZmMtZXZlbnQuZmMtc2VsZWN0ZWQgLmZjLXJlc2l6ZXIge1xuICAvKiBvbmx5IHNob3cgd2hlbiBob3ZlcmluZyBvciBzZWxlY3RlZCAod2l0aCB0b3VjaCkgKi9cbiAgZGlzcGxheTogYmxvY2s7IH1cblxuLyogaGl0IGFyZWEgKi9cbi5mYy1ldmVudC5mYy1zZWxlY3RlZCAuZmMtcmVzaXplcjpiZWZvcmUge1xuICAvKiA0MHg0MCB0b3VjaCBhcmVhICovXG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogOTk5OTtcbiAgLyogdXNlciBvZiB0aGlzIHV0aWwgY2FuIHNjb3BlIHdpdGhpbiBhIGxvd2VyIHotaW5kZXggKi9cbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgbWFyZ2luLWxlZnQ6IC0yMHB4O1xuICBtYXJnaW4tdG9wOiAtMjBweDsgfVxuXG4vKiBFdmVudCBTZWxlY3Rpb24gKG9ubHkgZm9yIHRvdWNoIGRldmljZXMpXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4uZmMtZXZlbnQuZmMtc2VsZWN0ZWQge1xuICB6LWluZGV4OiA5OTk5ICFpbXBvcnRhbnQ7XG4gIC8qIG92ZXJjb21lcyBpbmxpbmUgei1pbmRleCAqL1xuICBib3gtc2hhZG93OiAwIDJweCA1cHggcmdiYSgwLCAwLCAwLCAwLjIpOyB9XG5cbi5mYy1ldmVudC5mYy1zZWxlY3RlZDphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMTtcbiAgLyogc2FtZSB6LWluZGV4IGFzIGZjLWJnLCBiZWhpbmQgdGV4dCAqL1xuICAvKiBvdmVyY29tZSB0aGUgYm9yZGVycyAqL1xuICB0b3A6IC0xcHg7XG4gIHJpZ2h0OiAtMXB4O1xuICBib3R0b206IC0xcHg7XG4gIGxlZnQ6IC0xcHg7XG4gIC8qIGRhcmtlbmluZyBlZmZlY3QgKi9cbiAgYmFja2dyb3VuZDogIzAwMDtcbiAgb3BhY2l0eTogLjI1OyB9XG5cbi8qIEV2ZW50IERyYWdnaW5nXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4uZmMtZXZlbnQuZmMtZHJhZ2dpbmcuZmMtc2VsZWN0ZWQge1xuICBib3gtc2hhZG93OiAwIDJweCA3cHggcmdiYSgwLCAwLCAwLCAwLjMpOyB9XG5cbi5mYy1ldmVudC5mYy1kcmFnZ2luZzpub3QoLmZjLXNlbGVjdGVkKSB7XG4gIG9wYWNpdHk6IC43NTsgfVxuXG4vKiBIb3Jpem9udGFsIEV2ZW50c1xuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYmlnZ2VyIHRvdWNoIGFyZWEgd2hlbiBzZWxlY3RlZCAqL1xuLmZjLWgtZXZlbnQuZmMtc2VsZWN0ZWQ6YmVmb3JlIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAzO1xuICAvKiBiZWxvdyByZXNpemVycyAqL1xuICB0b3A6IC0xMHB4O1xuICBib3R0b206IC0xMHB4O1xuICBsZWZ0OiAwO1xuICByaWdodDogMDsgfVxuXG4vKiBldmVudHMgdGhhdCBhcmUgY29udGludWluZyB0by9mcm9tIGFub3RoZXIgd2Vlay4ga2lsbCByb3VuZGVkIGNvcm5lcnMgYW5kIGJ1dHQgdXAgYWdhaW5zdCBlZGdlICovXG4uZmMtbHRyIC5mYy1oLWV2ZW50LmZjLW5vdC1zdGFydCxcbi5mYy1ydGwgLmZjLWgtZXZlbnQuZmMtbm90LWVuZCB7XG4gIG1hcmdpbi1sZWZ0OiAwO1xuICBib3JkZXItbGVmdC13aWR0aDogMDtcbiAgcGFkZGluZy1sZWZ0OiAxcHg7XG4gIC8qIHJlcGxhY2UgdGhlIGJvcmRlciB3aXRoIHBhZGRpbmcgKi9cbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMDtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDsgfVxuXG4uZmMtbHRyIC5mYy1oLWV2ZW50LmZjLW5vdC1lbmQsXG4uZmMtcnRsIC5mYy1oLWV2ZW50LmZjLW5vdC1zdGFydCB7XG4gIG1hcmdpbi1yaWdodDogMDtcbiAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAwO1xuICBwYWRkaW5nLXJpZ2h0OiAxcHg7XG4gIC8qIHJlcGxhY2UgdGhlIGJvcmRlciB3aXRoIHBhZGRpbmcgKi9cbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwOyB9XG5cbi8qIHJlc2l6ZXIgKGN1cnNvciBBTkQgdG91Y2ggZGV2aWNlcykgKi9cbi8qIGxlZnQgcmVzaXplciAgKi9cbi5mYy1sdHIgLmZjLWgtZXZlbnQgLmZjLXN0YXJ0LXJlc2l6ZXIsXG4uZmMtcnRsIC5mYy1oLWV2ZW50IC5mYy1lbmQtcmVzaXplciB7XG4gIGN1cnNvcjogdy1yZXNpemU7XG4gIGxlZnQ6IC0xcHg7XG4gIC8qIG92ZXJjb21lIGJvcmRlciAqLyB9XG5cbi8qIHJpZ2h0IHJlc2l6ZXIgKi9cbi5mYy1sdHIgLmZjLWgtZXZlbnQgLmZjLWVuZC1yZXNpemVyLFxuLmZjLXJ0bCAuZmMtaC1ldmVudCAuZmMtc3RhcnQtcmVzaXplciB7XG4gIGN1cnNvcjogZS1yZXNpemU7XG4gIHJpZ2h0OiAtMXB4O1xuICAvKiBvdmVyY29tZSBib3JkZXIgKi8gfVxuXG4vKiByZXNpemVyIChtb3VzZSBkZXZpY2VzKSAqL1xuLmZjLWgtZXZlbnQuZmMtYWxsb3ctbW91c2UtcmVzaXplIC5mYy1yZXNpemVyIHtcbiAgd2lkdGg6IDdweDtcbiAgdG9wOiAtMXB4O1xuICAvKiBvdmVyY29tZSB0b3AgYm9yZGVyICovXG4gIGJvdHRvbTogLTFweDtcbiAgLyogb3ZlcmNvbWUgYm90dG9tIGJvcmRlciAqLyB9XG5cbi8qIHJlc2l6ZXIgKHRvdWNoIGRldmljZXMpICovXG4uZmMtaC1ldmVudC5mYy1zZWxlY3RlZCAuZmMtcmVzaXplciB7XG4gIC8qIDh4OCBsaXR0bGUgZG90ICovXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIHdpZHRoOiA2cHg7XG4gIGhlaWdodDogNnB4O1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItY29sb3I6IGluaGVyaXQ7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIC8qIHZlcnRpY2FsbHkgY2VudGVyICovXG4gIHRvcDogNTAlO1xuICBtYXJnaW4tdG9wOiAtNHB4OyB9XG5cbi8qIGxlZnQgcmVzaXplciAgKi9cbi5mYy1sdHIgLmZjLWgtZXZlbnQuZmMtc2VsZWN0ZWQgLmZjLXN0YXJ0LXJlc2l6ZXIsXG4uZmMtcnRsIC5mYy1oLWV2ZW50LmZjLXNlbGVjdGVkIC5mYy1lbmQtcmVzaXplciB7XG4gIG1hcmdpbi1sZWZ0OiAtNHB4O1xuICAvKiBjZW50ZXJzIHRoZSA4eDggZG90IG9uIHRoZSBsZWZ0IGVkZ2UgKi8gfVxuXG4vKiByaWdodCByZXNpemVyICovXG4uZmMtbHRyIC5mYy1oLWV2ZW50LmZjLXNlbGVjdGVkIC5mYy1lbmQtcmVzaXplcixcbi5mYy1ydGwgLmZjLWgtZXZlbnQuZmMtc2VsZWN0ZWQgLmZjLXN0YXJ0LXJlc2l6ZXIge1xuICBtYXJnaW4tcmlnaHQ6IC00cHg7XG4gIC8qIGNlbnRlcnMgdGhlIDh4OCBkb3Qgb24gdGhlIHJpZ2h0IGVkZ2UgKi8gfVxuXG4vKiBEYXlHcmlkIGV2ZW50c1xuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuV2UgdXNlIHRoZSBmdWxsIFwiZmMtZGF5LWdyaWQtZXZlbnRcIiBjbGFzcyBpbnN0ZWFkIG9mIHVzaW5nIGRlc2NlbmRhbnRzIGJlY2F1c2UgdGhlIGV2ZW50IHdvbid0XG5iZSBhIGRlc2NlbmRhbnQgb2YgdGhlIGdyaWQgd2hlbiBpdCBpcyBiZWluZyBkcmFnZ2VkLlxuKi9cbi5mYy1kYXktZ3JpZC1ldmVudCB7XG4gIG1hcmdpbjogMXB4IDJweCAwO1xuICAvKiBzcGFjaW5nIGJldHdlZW4gZXZlbnRzIGFuZCBlZGdlcyAqL1xuICBwYWRkaW5nOiAwIDFweDsgfVxuXG50cjpmaXJzdC1jaGlsZCA+IHRkID4gLmZjLWRheS1ncmlkLWV2ZW50IHtcbiAgbWFyZ2luLXRvcDogMnB4O1xuICAvKiBhIGxpdHRsZSBiaXQgbW9yZSBzcGFjZSBiZWZvcmUgdGhlIGZpcnN0IGV2ZW50ICovIH1cblxuLmZjLW1pcnJvci1za2VsZXRvbiB0cjpmaXJzdC1jaGlsZCA+IHRkID4gLmZjLWRheS1ncmlkLWV2ZW50IHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgLyogZXhjZXB0IGZvciBtaXJyb3Igc2tlbGV0b24gKi8gfVxuXG4uZmMtZGF5LWdyaWQtZXZlbnQgLmZjLWNvbnRlbnQge1xuICAvKiBmb3JjZSBldmVudHMgdG8gYmUgb25lLWxpbmUgdGFsbCAqL1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuOyB9XG5cbi5mYy1kYXktZ3JpZC1ldmVudCAuZmMtdGltZSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkOyB9XG5cbi8qIHJlc2l6ZXIgKGN1cnNvciBkZXZpY2VzKSAqL1xuLyogbGVmdCByZXNpemVyICAqL1xuLmZjLWx0ciAuZmMtZGF5LWdyaWQtZXZlbnQuZmMtYWxsb3ctbW91c2UtcmVzaXplIC5mYy1zdGFydC1yZXNpemVyLFxuLmZjLXJ0bCAuZmMtZGF5LWdyaWQtZXZlbnQuZmMtYWxsb3ctbW91c2UtcmVzaXplIC5mYy1lbmQtcmVzaXplciB7XG4gIG1hcmdpbi1sZWZ0OiAtMnB4O1xuICAvKiB0byB0aGUgZGF5IGNlbGwncyBlZGdlICovIH1cblxuLyogcmlnaHQgcmVzaXplciAqL1xuLmZjLWx0ciAuZmMtZGF5LWdyaWQtZXZlbnQuZmMtYWxsb3ctbW91c2UtcmVzaXplIC5mYy1lbmQtcmVzaXplcixcbi5mYy1ydGwgLmZjLWRheS1ncmlkLWV2ZW50LmZjLWFsbG93LW1vdXNlLXJlc2l6ZSAuZmMtc3RhcnQtcmVzaXplciB7XG4gIG1hcmdpbi1yaWdodDogLTJweDtcbiAgLyogdG8gdGhlIGRheSBjZWxsJ3MgZWRnZSAqLyB9XG5cbi8qIEV2ZW50IExpbWl0aW5nXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBcIm1vcmVcIiBsaW5rIHRoYXQgcmVwcmVzZW50cyBoaWRkZW4gZXZlbnRzICovXG5hLmZjLW1vcmUge1xuICBtYXJnaW46IDFweCAzcHg7XG4gIGZvbnQtc2l6ZTogLjg1ZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XG5cbmEuZmMtbW9yZTpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyB9XG5cbi5mYy1saW1pdGVkIHtcbiAgLyogcm93cyBhbmQgY2VsbHMgdGhhdCBhcmUgaGlkZGVuIGJlY2F1c2Ugb2YgYSBcIm1vcmVcIiBsaW5rICovXG4gIGRpc3BsYXk6IG5vbmU7IH1cblxuLyogcG9wb3ZlciB0aGF0IGFwcGVhcnMgd2hlbiBcIm1vcmVcIiBsaW5rIGlzIGNsaWNrZWQgKi9cbi5mYy1kYXktZ3JpZCAuZmMtcm93IHtcbiAgei1pbmRleDogMTtcbiAgLyogbWFrZSB0aGUgXCJtb3JlXCIgcG9wb3ZlciBvbmUgaGlnaGVyIHRoYW4gdGhpcyAqLyB9XG5cbi5mYy1tb3JlLXBvcG92ZXIge1xuICB6LWluZGV4OiAyO1xuICB3aWR0aDogMjIwcHg7IH1cblxuLmZjLW1vcmUtcG9wb3ZlciAuZmMtZXZlbnQtY29udGFpbmVyIHtcbiAgcGFkZGluZzogMTBweDsgfVxuXG4vKiBOb3cgSW5kaWNhdG9yXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4uZmMtbm93LWluZGljYXRvciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm9yZGVyOiAwIHNvbGlkIHJlZDsgfVxuXG4vKiBVdGlsaXRpZXNcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi5mYy11bnNlbGVjdGFibGUge1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApOyB9XG5cbi8qXG5UT0RPOiBtb3JlIGRpc3RpbmN0aW9uIGJldHdlZW4gdGhpcyBmaWxlIGFuZCBjb21tb24uY3NzXG4qL1xuLyogQ29sb3JzXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4uZmMtdW50aGVtZWQgdGgsXG4uZmMtdW50aGVtZWQgdGQsXG4uZmMtdW50aGVtZWQgdGhlYWQsXG4uZmMtdW50aGVtZWQgdGJvZHksXG4uZmMtdW50aGVtZWQgLmZjLWRpdmlkZXIsXG4uZmMtdW50aGVtZWQgLmZjLXJvdyxcbi5mYy11bnRoZW1lZCAuZmMtY29udGVudCxcbi5mYy11bnRoZW1lZCAuZmMtcG9wb3Zlcixcbi5mYy11bnRoZW1lZCAuZmMtbGlzdC12aWV3LFxuLmZjLXVudGhlbWVkIC5mYy1saXN0LWhlYWRpbmcgdGQge1xuICBib3JkZXItY29sb3I6ICNkZGQ7IH1cblxuLmZjLXVudGhlbWVkIC5mYy1wb3BvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgfVxuXG4uZmMtdW50aGVtZWQgLmZjLWRpdmlkZXIsXG4uZmMtdW50aGVtZWQgLmZjLXBvcG92ZXIgLmZjLWhlYWRlcixcbi5mYy11bnRoZW1lZCAuZmMtbGlzdC1oZWFkaW5nIHRkIHtcbiAgYmFja2dyb3VuZDogI2VlZTsgfVxuXG4uZmMtdW50aGVtZWQgdGQuZmMtdG9kYXkge1xuICBiYWNrZ3JvdW5kOiAjZmNmOGUzOyB9XG5cbi5mYy11bnRoZW1lZCAuZmMtZGlzYWJsZWQtZGF5IHtcbiAgYmFja2dyb3VuZDogI2Q3ZDdkNztcbiAgb3BhY2l0eTogLjM7IH1cblxuLyogSWNvbnNcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mcm9tIGh0dHBzOi8vZmVhdGhlcmljb25zLmNvbS8gYW5kIGJ1aWx0IHdpdGggSWNvTW9vblxuKi9cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogJ2ZjaWNvbnMnO1xuICBzcmM6IHVybChcImRhdGE6YXBwbGljYXRpb24veC1mb250LXR0ZjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxBQUVBQUFBTEFJQUFBd0F3VDFNdk1nOFNCZkFBQUFDOEFBQUFZR050WVhBWFZ0S05BQUFCSEFBQUFGUm5ZWE53QUFBQUVBQUFBWEFBQUFBSVoyeDVaZ1l5ZHhJQUFBRjRBQUFGTkdobFlXUVVKN2NJQUFBR3JBQUFBRFpvYUdWaEIyMER6QUFBQnVRQUFBQWthRzEwZUNJQUJoUUFBQWNJQUFBQUxHeHZZMkVENEFVNkFBQUhOQUFBQUJodFlYaHdBQThBakFBQUIwd0FBQUFnYm1GdFpYc3I2OTBBQUFkc0FBQUJobkJ2YzNRQUF3QUFBQUFJOUFBQUFDQUFBd1BBQVpBQUJRQUFBcGtDekFBQUFJOENtUUxNQUFBQjZ3QXpBUWtBQUFBQUFBQUFBQUFBQUFBQUFBQUJFQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFBQURwQmdQQS84QUFRQVBBQUVBQUFBQUJBQUFBQUFBQUFBQUFBQUFnQUFBQUFBQURBQUFBQXdBQUFCd0FBUUFEQUFBQUhBQURBQUVBQUFBY0FBUUFPQUFBQUFvQUNBQUNBQUlBQVFBZzZRYi8vZi8vQUFBQUFBQWc2UUQvL2YvL0FBSC80eGNFQUFNQUFRQUFBQUFBQUFBQUFBQUFBUUFCLy84QUR3QUJBQUFBQUFBQUFBQUFBZ0FBTnprQkFBQUFBQUVBQUFBQUFBQUFBQUFDQUFBM09RRUFBQUFBQVFBQUFBQUFBQUFBQUFJQUFEYzVBUUFBQUFBQkFXSUFqUUtlQXNrQUV3QUFKU2MzTmpRbkppSUhBUVlVRndFV01qYzJOQ2NDbnVMaURRME1KQXovQUEwTkFRQU1KQXdORGNuaTRnd2pEUXdNL3dBTkl3ei9BQTBORENNTkFBQUFBUUZpQUkwQ25nTEpBQk1BQUNVQk5qUW5BU1lpQndZVUh3RUhCaFFYRmpJM0FaNEJBQTBOL3dBTUpBd05EZUxpRFEwTUpBeU5BUUFNSXcwQkFBd01EU01NNHVJTkl3d05EUUFBQUFJQTRnQzNBeDRDbmdBVEFDY0FBQ1VuTnpZMEp5WWlEd0VHRkI4QkZqSTNOalFuSVNjM05qUW5KaUlQQVFZVUh3RVdNamMyTkNjQjg3ZTNEUTBNSXczVkRRM1ZEU01NRFEwQks3ZTNEUTBNSkF6VkRRM1ZEQ1FNRFEzenVMY01KQXdORGRVTkl3eldEQXdOSXd5NHR3d2tEQTBOMVEwakROWU1EQTBqREFBQUFnRGlBTGNESGdLZUFCTUFKd0FBSlRjMk5DOEJKaUlIQmhRZkFRY0dGQmNXTWpjaE56WTBMd0VtSWdjR0ZCOEJCd1lVRnhZeU53SkoxUTBOMVEwakRBME50N2NORFF3akRmN1YxUTBOMVF3a0RBME50N2NORFF3a0RMZldEQ01OMVEwTkRDUU10N2dNSXcwTUROWU1JdzNWRFEwTUpBeTN1QXdqRFF3TUFBQURBRlVBQUFPckExVUFNd0JvQUhjQUFCTWlCZ2NPQVFjT0FRY09BUlVSRkJZWEhnRVhIZ0VYSGdFeklUSTJOejRCTno0Qk56NEJOUkUwSmljdUFTY3VBU2N1QVNNRklUSVdGeDRCRng0QkZ4NEJGUkVVQmdjT0FRY09BUWNPQVNNaElpWW5MZ0VuTGdFbkxnRTFFVFEyTno0Qk56NEJOejRCTXhNaE1qWTFOQ1lqSVNJR0ZSUVdNOVVOR0F3TEZRa0pEZ1VGQlFVRkJRNEpDUlVMREJnTkFsWU5HQXdMRlFrSkRnVUZCUVVGQlE0SkNSVUxEQmdOL2FvQ1ZnUUlCQVFIQXdNRkFRSUJBUUlCQlFNREJ3UUVDQVQ5cWdRSUJBUUhBd01GQVFJQkFRSUJCUU1EQndRRUNBU0FBVllSR1JrUi9xb1JHUmtSQTFVRkJBVU9DUWtWREFzWkRmMnJEUmtMREJVSkNBNEZCUVVGQlFVT0NRZ1ZEQXNaRFFKVkRSa0xEQlVKQ1E0RkJBVlZBZ0VDQlFNQ0J3UUVDQVg5cXdRSkF3UUhBd01GQVFJQ0FnSUJCUU1EQndRRENRUUNWUVVJQkFRSEFnTUZBZ0VDL29BWkVoRVpHUkVTR1FBQUFBQURBRlVBQUFPckExVUFNd0JvQUlrQUFCTWlCZ2NPQVFjT0FRY09BUlVSRkJZWEhnRVhIZ0VYSGdFeklUSTJOejRCTno0Qk56NEJOUkUwSmljdUFTY3VBU2N1QVNNRklUSVdGeDRCRng0QkZ4NEJGUkVVQmdjT0FRY09BUWNPQVNNaElpWW5MZ0VuTGdFbkxnRTFFVFEyTno0Qk56NEJOejRCTXhNekZSUVdNekkyUFFFek1qWTFOQ1lyQVRVMEppTWlCaDBCSXlJR0ZSUVdNOVVOR0F3TEZRa0pEZ1VGQlFVRkJRNEpDUlVMREJnTkFsWU5HQXdMRlFrSkRnVUZCUVVGQlE0SkNSVUxEQmdOL2FvQ1ZnUUlCQVFIQXdNRkFRSUJBUUlCQlFNREJ3UUVDQVQ5cWdRSUJBUUhBd01GQVFJQkFRSUJCUU1EQndRRUNBU0FnQmtTRWhtQUVSa1pFWUFaRWhJWmdCRVpHUkVEVlFVRUJRNEpDUlVNQ3hrTi9hc05HUXNNRlFrSURnVUZCUVVGQlE0SkNCVU1DeGtOQWxVTkdRc01GUWtKRGdVRUJWVUNBUUlGQXdJSEJBUUlCZjJyQkFrREJBY0RBd1VCQWdJQ0FnRUZBd01IQkFNSkJBSlZCUWdFQkFjQ0F3VUNBUUwrZ0lBU0dSa1NnQmtTRVJtQUVoa1pFb0FaRVJJWkFBQUJBT0lBalFNZUFza0FJQUFBRXhjSEJoUVhGakkvQVJjV01qYzJOQzhCTnpZMEp5WWlEd0VuSmlJSEJoUVg0dUxpRFEwTUpBemk0Z3drREEwTjR1SU5EUXdrRE9MaURDUU1EUTBDamVMaURTTU1EUTNoNFEwTkRDTU40dUlNSXcwTURPTGlEQXdOSXd3QUFBQUJBQUFBQVFBQWE1bjB5MThQUFBVQUN3UUFBQUFBQU5pdk9Wc0FBQUFBMks4NVd3QUFBQUFEcXdOVkFBQUFDQUFDQUFBQUFBQUFBQUVBQUFQQS84QUFBQVFBQUFBQUFBT3JBQUVBQUFBQUFBQUFBQUFBQUFBQUFBQUxCQUFBQUFBQUFBQUFBQUFBQWdBQUFBUUFBV0lFQUFGaUJBQUE0Z1FBQU9JRUFBQlZCQUFBVlFRQUFPSUFBQUFBQUFvQUZBQWVBRVFBYWdDcUFPb0JuZ0prQXBvQUFRQUFBQXNBaWdBREFBQUFBQUFDQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUE0QXJnQUJBQUFBQUFBQkFBY0FBQUFCQUFBQUFBQUNBQWNBWUFBQkFBQUFBQUFEQUFjQU5nQUJBQUFBQUFBRUFBY0FkUUFCQUFBQUFBQUZBQXNBRlFBQkFBQUFBQUFHQUFjQVN3QUJBQUFBQUFBS0FCb0FpZ0FEQUFFRUNRQUJBQTRBQndBREFBRUVDUUFDQUE0QVp3QURBQUVFQ1FBREFBNEFQUUFEQUFFRUNRQUVBQTRBZkFBREFBRUVDUUFGQUJZQUlBQURBQUVFQ1FBR0FBNEFVZ0FEQUFFRUNRQUtBRFFBcEdaamFXTnZibk1BWmdCakFHa0FZd0J2QUc0QWMxWmxjbk5wYjI0Z01TNHdBRllBWlFCeUFITUFhUUJ2QUc0QUlBQXhBQzRBTUdaamFXTnZibk1BWmdCakFHa0FZd0J2QUc0QWMyWmphV052Ym5NQVpnQmpBR2tBWXdCdkFHNEFjMUpsWjNWc1lYSUFVZ0JsQUdjQWRRQnNBR0VBY21aamFXTnZibk1BWmdCakFHa0FZd0J2QUc0QWMwWnZiblFnWjJWdVpYSmhkR1ZrSUdKNUlFbGpiMDF2YjI0dUFFWUFid0J1QUhRQUlBQm5BR1VBYmdCbEFISUFZUUIwQUdVQVpBQWdBR0lBZVFBZ0FFa0FZd0J2QUUwQWJ3QnZBRzRBTGdBQUFBTUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUE9XCIpIGZvcm1hdChcInRydWV0eXBlXCIpO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7IH1cbi5mYy1pY29uIHtcbiAgLyogdXNlICFpbXBvcnRhbnQgdG8gcHJldmVudCBpc3N1ZXMgd2l0aCBicm93c2VyIGV4dGVuc2lvbnMgdGhhdCBjaGFuZ2UgZm9udHMgKi9cbiAgZm9udC1mYW1pbHk6ICdmY2ljb25zJyAhaW1wb3J0YW50O1xuICBzcGVhazogbm9uZTtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXZhcmlhbnQ6IG5vcm1hbDtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICAvKiBCZXR0ZXIgRm9udCBSZW5kZXJpbmcgPT09PT09PT09PT0gKi9cbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7IH1cblxuLmZjLWljb24tY2hldnJvbi1sZWZ0OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxlOTAwXCI7IH1cblxuLmZjLWljb24tY2hldnJvbi1yaWdodDpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZTkwMVwiOyB9XG5cbi5mYy1pY29uLWNoZXZyb25zLWxlZnQ6YmVmb3JlIHtcbiAgY29udGVudDogXCJcXGU5MDJcIjsgfVxuXG4uZmMtaWNvbi1jaGV2cm9ucy1yaWdodDpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZTkwM1wiOyB9XG5cbi5mYy1pY29uLW1pbnVzLXNxdWFyZTpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZTkwNFwiOyB9XG5cbi5mYy1pY29uLXBsdXMtc3F1YXJlOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxlOTA1XCI7IH1cblxuLmZjLWljb24teDpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZTkwNlwiOyB9XG5cbi5mYy1pY29uIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMWVtO1xuICBoZWlnaHQ6IDFlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XG5cbi8qIEJ1dHRvbnNcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5Mb3RzIHRha2VuIGZyb20gRmxhdGx5IChNSVQpOiBodHRwczovL2Jvb3Rzd2F0Y2guY29tLzQvZmxhdGx5L2Jvb3RzdHJhcC5jc3NcbiovXG4vKiByZXNldCAqL1xuLmZjLWJ1dHRvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDA7XG4gIG92ZXJmbG93OiB2aXNpYmxlO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgbWFyZ2luOiAwO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xuICBsaW5lLWhlaWdodDogaW5oZXJpdDsgfVxuXG4uZmMtYnV0dG9uOmZvY3VzIHtcbiAgb3V0bGluZTogMXB4IGRvdHRlZDtcbiAgb3V0bGluZTogNXB4IGF1dG8gLXdlYmtpdC1mb2N1cy1yaW5nLWNvbG9yOyB9XG5cbi5mYy1idXR0b24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgfVxuXG4uZmMtYnV0dG9uOm5vdCg6ZGlzYWJsZWQpIHtcbiAgY3Vyc29yOiBwb2ludGVyOyB9XG5cbi5mYy1idXR0b246Oi1tb3otZm9jdXMtaW5uZXIge1xuICBwYWRkaW5nOiAwO1xuICBib3JkZXItc3R5bGU6IG5vbmU7IH1cblxuLyogdGhlbWUgKi9cbi5mYy1idXR0b24ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGNvbG9yOiAjMjEyNTI5O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgcGFkZGluZzogMC40ZW0gMC42NWVtO1xuICBmb250LXNpemU6IDFlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgYm9yZGVyLXJhZGl1czogMC4yNWVtOyB9XG5cbi5mYy1idXR0b246aG92ZXIge1xuICBjb2xvcjogIzIxMjUyOTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XG5cbi5mYy1idXR0b246Zm9jdXMge1xuICBvdXRsaW5lOiAwO1xuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMCAwIDAuMnJlbSByZ2JhKDQ0LCA2MiwgODAsIDAuMjUpO1xuICBib3gtc2hhZG93OiAwIDAgMCAwLjJyZW0gcmdiYSg0NCwgNjIsIDgwLCAwLjI1KTsgfVxuXG4uZmMtYnV0dG9uOmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC42NTsgfVxuXG4vKiBcInByaW1hcnlcIiBjb2xvcmluZyAqL1xuLmZjLWJ1dHRvbi1wcmltYXJ5IHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyQzNFNTA7XG4gIGJvcmRlci1jb2xvcjogIzJDM0U1MDsgfVxuXG4uZmMtYnV0dG9uLXByaW1hcnk6aG92ZXIge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFlMmIzNztcbiAgYm9yZGVyLWNvbG9yOiAjMWEyNTJmOyB9XG5cbi5mYy1idXR0b24tcHJpbWFyeTpmb2N1cyB7XG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDAgMC4ycmVtIHJnYmEoNzYsIDkxLCAxMDYsIDAuNSk7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDAuMnJlbSByZ2JhKDc2LCA5MSwgMTA2LCAwLjUpOyB9XG5cbi5mYy1idXR0b24tcHJpbWFyeTpkaXNhYmxlZCB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMkMzRTUwO1xuICBib3JkZXItY29sb3I6ICMyQzNFNTA7IH1cblxuLmZjLWJ1dHRvbi1wcmltYXJ5Om5vdCg6ZGlzYWJsZWQpOmFjdGl2ZSxcbi5mYy1idXR0b24tcHJpbWFyeTpub3QoOmRpc2FibGVkKS5mYy1idXR0b24tYWN0aXZlIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxYTI1MmY7XG4gIGJvcmRlci1jb2xvcjogIzE1MWUyNzsgfVxuXG4uZmMtYnV0dG9uLXByaW1hcnk6bm90KDpkaXNhYmxlZCk6YWN0aXZlOmZvY3VzLFxuLmZjLWJ1dHRvbi1wcmltYXJ5Om5vdCg6ZGlzYWJsZWQpLmZjLWJ1dHRvbi1hY3RpdmU6Zm9jdXMge1xuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMCAwIDAuMnJlbSByZ2JhKDc2LCA5MSwgMTA2LCAwLjUpO1xuICBib3gtc2hhZG93OiAwIDAgMCAwLjJyZW0gcmdiYSg3NiwgOTEsIDEwNiwgMC41KTsgfVxuXG4vKiBpY29ucyB3aXRoaW4gYnV0dG9ucyAqL1xuLmZjLWJ1dHRvbiAuZmMtaWNvbiB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIGZvbnQtc2l6ZTogMS41ZW07IH1cblxuLyogQnV0dG9ucyBHcm91cHNcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi5mYy1idXR0b24tZ3JvdXAge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IC13ZWJraXQtaW5saW5lLWJveDtcbiAgZGlzcGxheTogLW1zLWlubGluZS1mbGV4Ym94O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxuXG4uZmMtYnV0dG9uLWdyb3VwID4gLmZjLWJ1dHRvbiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgLXdlYmtpdC1ib3gtZmxleDogMTtcbiAgLW1zLWZsZXg6IDEgMSBhdXRvO1xuICBmbGV4OiAxIDEgYXV0bzsgfVxuXG4uZmMtYnV0dG9uLWdyb3VwID4gLmZjLWJ1dHRvbjpob3ZlciB7XG4gIHotaW5kZXg6IDE7IH1cblxuLmZjLWJ1dHRvbi1ncm91cCA+IC5mYy1idXR0b246Zm9jdXMsXG4uZmMtYnV0dG9uLWdyb3VwID4gLmZjLWJ1dHRvbjphY3RpdmUsXG4uZmMtYnV0dG9uLWdyb3VwID4gLmZjLWJ1dHRvbi5mYy1idXR0b24tYWN0aXZlIHtcbiAgei1pbmRleDogMTsgfVxuXG4uZmMtYnV0dG9uLWdyb3VwID4gLmZjLWJ1dHRvbjpub3QoOmZpcnN0LWNoaWxkKSB7XG4gIG1hcmdpbi1sZWZ0OiAtMXB4OyB9XG5cbi5mYy1idXR0b24tZ3JvdXAgPiAuZmMtYnV0dG9uOm5vdCg6bGFzdC1jaGlsZCkge1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMDtcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDA7IH1cblxuLmZjLWJ1dHRvbi1ncm91cCA+IC5mYy1idXR0b246bm90KDpmaXJzdC1jaGlsZCkge1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwO1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwOyB9XG5cbi8qIFBvcG92ZXJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi5mYy11bnRoZW1lZCAuZmMtcG9wb3ZlciB7XG4gIGJvcmRlci13aWR0aDogMXB4O1xuICBib3JkZXItc3R5bGU6IHNvbGlkOyB9XG5cbi8qIExpc3QgVmlld1xuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLmZjLXVudGhlbWVkIC5mYy1saXN0LWl0ZW06aG92ZXIgdGQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1OyB9XG5cbi8qIFRvb2xiYXJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi5mYy10b29sYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XG5cbi5mYy10b29sYmFyLmZjLWhlYWRlci10b29sYmFyIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41ZW07IH1cblxuLmZjLXRvb2xiYXIuZmMtZm9vdGVyLXRvb2xiYXIge1xuICBtYXJnaW4tdG9wOiAxLjVlbTsgfVxuXG4vKiBpbm5lciBjb250ZW50ICovXG4uZmMtdG9vbGJhciA+ICogPiA6bm90KDpmaXJzdC1jaGlsZCkge1xuICBtYXJnaW4tbGVmdDogLjc1ZW07IH1cblxuLmZjLXRvb2xiYXIgaDIge1xuICBmb250LXNpemU6IDEuNzVlbTtcbiAgbWFyZ2luOiAwOyB9XG5cbi8qIFZpZXcgU3RydWN0dXJlXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4uZmMtdmlldy1jb250YWluZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cblxuLyogdW5kbyB0d2l0dGVyIGJvb3RzdHJhcCdzIGJveC1zaXppbmcgcnVsZXMuIG5vcm1hbGl6ZXMgcG9zaXRpb25pbmcgdGVjaG5pcXVlcyAqL1xuLyogZG9uJ3QgZG8gdGhpcyBmb3IgdGhlIHRvb2xiYXIgYmVjYXVzZSB3ZSdsbCB3YW50IGJvb3RzdHJhcCB0byBzdHlsZSB0aG9zZSBidXR0b25zIGFzIHNvbWUgcHQgKi9cbi5mYy12aWV3LWNvbnRhaW5lciAqLFxuLmZjLXZpZXctY29udGFpbmVyICo6YmVmb3JlLFxuLmZjLXZpZXctY29udGFpbmVyICo6YWZ0ZXIge1xuICAtd2Via2l0LWJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAtbW96LWJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgfVxuXG4uZmMtdmlldyxcbi5mYy12aWV3ID4gdGFibGUge1xuICAvKiBzbyBkcmFnZ2VkIGVsZW1lbnRzIGNhbiBiZSBhYm92ZSB0aGUgdmlldydzIG1haW4gZWxlbWVudCAqL1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7IH1cblxuQG1lZGlhIHByaW50IHtcbiAgLmZjIHtcbiAgICBtYXgtd2lkdGg6IDEwMCUgIWltcG9ydGFudDsgfVxuXG4gIC8qIEdsb2JhbCBFdmVudCBSZXN0eWxpbmdcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAuZmMtZXZlbnQge1xuICAgIGJhY2tncm91bmQ6ICNmZmYgIWltcG9ydGFudDtcbiAgICBjb2xvcjogIzAwMCAhaW1wb3J0YW50O1xuICAgIHBhZ2UtYnJlYWstaW5zaWRlOiBhdm9pZDsgfVxuXG4gIC5mYy1ldmVudCAuZmMtcmVzaXplciB7XG4gICAgZGlzcGxheTogbm9uZTsgfVxuXG4gIC8qIFRhYmxlICYgRGF5LVJvdyBSZXN0eWxpbmdcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAuZmMgdGgsXG4gIC5mYyB0ZCxcbiAgLmZjIGhyLFxuICAuZmMgdGhlYWQsXG4gIC5mYyB0Ym9keSxcbiAgLmZjLXJvdyB7XG4gICAgYm9yZGVyLWNvbG9yOiAjY2NjICFpbXBvcnRhbnQ7XG4gICAgYmFja2dyb3VuZDogI2ZmZiAhaW1wb3J0YW50OyB9XG5cbiAgLyoga2lsbCB0aGUgb3ZlcmxhaWQsIGFic29sdXRlbHktcG9zaXRpb25lZCBjb21wb25lbnRzICovXG4gIC8qIGNvbW1vbi4uLiAqL1xuICAuZmMtYmcsXG4gIC5mYy1iZ2V2ZW50LXNrZWxldG9uLFxuICAuZmMtaGlnaGxpZ2h0LXNrZWxldG9uLFxuICAuZmMtbWlycm9yLXNrZWxldG9uLFxuICAuZmMtYmdldmVudC1jb250YWluZXIsXG4gIC5mYy1idXNpbmVzcy1jb250YWluZXIsXG4gIC5mYy1oaWdobGlnaHQtY29udGFpbmVyLFxuICAuZmMtbWlycm9yLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogbm9uZTsgfVxuXG4gIC8qIGRvbid0IGZvcmNlIGEgbWluLWhlaWdodCBvbiByb3dzIChmb3IgRGF5R3JpZCkgKi9cbiAgLmZjIHRib2R5IC5mYy1yb3cge1xuICAgIGhlaWdodDogYXV0byAhaW1wb3J0YW50O1xuICAgIC8qIHVuZG8gaGVpZ2h0IHRoYXQgSlMgc2V0IGluIGRpc3RyaWJ1dGVIZWlnaHQgKi9cbiAgICBtaW4taGVpZ2h0OiAwICFpbXBvcnRhbnQ7XG4gICAgLyogdW5kbyB0aGUgbWluLWhlaWdodCBmcm9tIGVhY2ggdmlldydzIHNwZWNpZmljIHN0eWxlc2hlZXQgKi8gfVxuXG4gIC5mYyB0Ym9keSAuZmMtcm93IC5mYy1jb250ZW50LXNrZWxldG9uIHtcbiAgICBwb3NpdGlvbjogc3RhdGljO1xuICAgIC8qIHVuZG8gLmZjLXJpZ2lkICovXG4gICAgcGFkZGluZy1ib3R0b206IDAgIWltcG9ydGFudDtcbiAgICAvKiB1c2UgYSBtb3JlIGJvcmRlci1mcmllbmRseSBtZXRob2QgZm9yIHRoaXMuLi4gKi8gfVxuXG4gIC5mYyB0Ym9keSAuZmMtcm93IC5mYy1jb250ZW50LXNrZWxldG9uIHRib2R5IHRyOmxhc3QtY2hpbGQgdGQge1xuICAgIC8qIG9ubHkgd29ya3MgaW4gbmV3ZXIgYnJvd3NlcnMgKi9cbiAgICBwYWRkaW5nLWJvdHRvbTogMWVtO1xuICAgIC8qIC4uLmdpdmVzIHNwYWNlIHdpdGhpbiB0aGUgc2tlbGV0b24uIGFsc28gZW5zdXJlcyBtaW4gaGVpZ2h0IGluIGEgd2F5ICovIH1cblxuICAuZmMgdGJvZHkgLmZjLXJvdyAuZmMtY29udGVudC1za2VsZXRvbiB0YWJsZSB7XG4gICAgLyogcHJvdmlkZXMgYSBtaW4taGVpZ2h0IGZvciB0aGUgcm93LCBidXQgb25seSBlZmZlY3RpdmUgZm9yIElFLCB3aGljaCBleGFnZ2VyYXRlcyB0aGlzIHZhbHVlLFxuICAgICAgIG1ha2luZyBpdCBsb29rIG1vcmUgbGlrZSAzZW0uIGZvciBvdGhlciBicm93ZXJzLCBpdCB3aWxsIGFscmVhZHkgYmUgdGhpcyB0YWxsICovXG4gICAgaGVpZ2h0OiAxZW07IH1cblxuICAvKiBVbmRvIG1vbnRoLXZpZXcgZXZlbnQgbGltaXRpbmcuIERpc3BsYXkgYWxsIGV2ZW50cyBhbmQgaGlkZSB0aGUgXCJtb3JlXCIgbGlua3NcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAuZmMtbW9yZS1jZWxsLFxuICAuZmMtbW9yZSB7XG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9XG5cbiAgLmZjIHRyLmZjLWxpbWl0ZWQge1xuICAgIGRpc3BsYXk6IHRhYmxlLXJvdyAhaW1wb3J0YW50OyB9XG5cbiAgLmZjIHRkLmZjLWxpbWl0ZWQge1xuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGwgIWltcG9ydGFudDsgfVxuXG4gIC5mYy1wb3BvdmVyIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIC8qIG5ldmVyIGRpc3BsYXkgdGhlIFwibW9yZS4uXCIgcG9wb3ZlciBpbiBwcmludCBtb2RlICovIH1cblxuICAvKiBUaW1lR3JpZCBSZXN0eWxpbmdcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAvKiB1bmRvIHRoZSBtaW4taGVpZ2h0IDEwMCUgdHJpY2sgdXNlZCB0byBmaWxsIHRoZSBjb250YWluZXIncyBoZWlnaHQgKi9cbiAgLmZjLXRpbWUtZ3JpZCB7XG4gICAgbWluLWhlaWdodDogMCAhaW1wb3J0YW50OyB9XG5cbiAgLyogZG9uJ3QgZGlzcGxheSB0aGUgc2lkZSBheGlzIGF0IGFsbCAoXCJhbGwtZGF5XCIgYW5kIHRpbWUgY2VsbHMpICovXG4gIC5mYy10aW1lR3JpZC12aWV3IC5mYy1heGlzIHtcbiAgICBkaXNwbGF5OiBub25lOyB9XG5cbiAgLyogZG9uJ3QgZGlzcGxheSB0aGUgaG9yaXpvbnRhbCBsaW5lcyAqL1xuICAuZmMtc2xhdHMsXG4gIC5mYy10aW1lLWdyaWQgaHIge1xuICAgIC8qIHRoaXMgaHIgaXMgdXNlZCB3aGVuIGhlaWdodCBpcyB1bmRlcnVzZWQgYW5kIG5lZWRzIHRvIGJlIGZpbGxlZCAqL1xuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgICAvKiBpbXBvcnRhbnQgb3ZlcnJpZGVzIGlubGluZSBkZWNsYXJhdGlvbiAqLyB9XG5cbiAgLyogbGV0IHRoZSBjb250YWluZXIgdGhhdCBob2xkcyB0aGUgZXZlbnRzIGJlIG5hdHVyYWxseSBwb3NpdGlvbmVkIGFuZCBjcmVhdGUgcmVhbCBoZWlnaHQgKi9cbiAgLmZjLXRpbWUtZ3JpZCAuZmMtY29udGVudC1za2VsZXRvbiB7XG4gICAgcG9zaXRpb246IHN0YXRpYzsgfVxuXG4gIC8qIGluIGNhc2UgdGhlcmUgYXJlIG5vIGV2ZW50cywgd2Ugc3RpbGwgd2FudCBzb21lIGhlaWdodCAqL1xuICAuZmMtdGltZS1ncmlkIC5mYy1jb250ZW50LXNrZWxldG9uIHRhYmxlIHtcbiAgICBoZWlnaHQ6IDRlbTsgfVxuXG4gIC8qIGtpbGwgdGhlIGhvcml6b250YWwgc3BhY2luZyBtYWRlIGJ5IHRoZSBldmVudCBjb250YWluZXIuIGV2ZW50IG1hcmdpbnMgd2lsbCBiZSBkb25lIGJlbG93ICovXG4gIC5mYy10aW1lLWdyaWQgLmZjLWV2ZW50LWNvbnRhaW5lciB7XG4gICAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7IH1cblxuICAvKiBUaW1lR3JpZCAqRXZlbnQqIFJlc3R5bGluZ1xuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gIC8qIG5hdHVyYWxseSBwb3NpdGlvbiBldmVudHMsIHZlcnRpY2FsbHkgc3RhY2tpbmcgdGhlbSAqL1xuICAuZmMtdGltZS1ncmlkIC5mYy1ldmVudCB7XG4gICAgcG9zaXRpb246IHN0YXRpYyAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogM3B4IDJweCAhaW1wb3J0YW50OyB9XG5cbiAgLyogZm9yIGV2ZW50cyB0aGF0IGNvbnRpbnVlIHRvIGEgZnV0dXJlIGRheSwgZ2l2ZSB0aGUgYm90dG9tIGJvcmRlciBiYWNrICovXG4gIC5mYy10aW1lLWdyaWQgLmZjLWV2ZW50LmZjLW5vdC1lbmQge1xuICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDFweCAhaW1wb3J0YW50OyB9XG5cbiAgLyogaW5kaWNhdGUgdGhlIGV2ZW50IGNvbnRpbnVlcyB2aWEgXCIuLi5cIiB0ZXh0ICovXG4gIC5mYy10aW1lLWdyaWQgLmZjLWV2ZW50LmZjLW5vdC1lbmQ6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6IFwiLi4uXCI7IH1cblxuICAvKiBmb3IgZXZlbnRzIHRoYXQgYXJlIGNvbnRpbnVhdGlvbnMgZnJvbSBwcmV2aW91cyBkYXlzLCBnaXZlIHRoZSB0b3AgYm9yZGVyIGJhY2sgKi9cbiAgLmZjLXRpbWUtZ3JpZCAuZmMtZXZlbnQuZmMtbm90LXN0YXJ0IHtcbiAgICBib3JkZXItdG9wLXdpZHRoOiAxcHggIWltcG9ydGFudDsgfVxuXG4gIC8qIGluZGljYXRlIHRoZSBldmVudCBpcyBhIGNvbnRpbnVhdGlvbiB2aWEgXCIuLi5cIiB0ZXh0ICovXG4gIC5mYy10aW1lLWdyaWQgLmZjLWV2ZW50LmZjLW5vdC1zdGFydDpiZWZvcmUge1xuICAgIGNvbnRlbnQ6IFwiLi4uXCI7IH1cblxuICAvKiB0aW1lICovXG4gIC8qIHVuZG8gYSBwcmV2aW91cyBkZWNsYXJhdGlvbiBhbmQgbGV0IHRoZSB0aW1lIHRleHQgc3BhbiB0byBhIHNlY29uZCBsaW5lICovXG4gIC5mYy10aW1lLWdyaWQgLmZjLWV2ZW50IC5mYy10aW1lIHtcbiAgICB3aGl0ZS1zcGFjZTogbm9ybWFsICFpbXBvcnRhbnQ7IH1cblxuICAvKiBoaWRlIHRoZSB0aGUgdGltZSB0aGF0IGlzIG5vcm1hbGx5IGRpc3BsYXllZC4uLiAqL1xuICAuZmMtdGltZS1ncmlkIC5mYy1ldmVudCAuZmMtdGltZSBzcGFuIHtcbiAgICBkaXNwbGF5OiBub25lOyB9XG5cbiAgLyogLi4ucmVwbGFjZSBpdCB3aXRoIGEgbW9yZSB2ZXJib3NlIHZlcnNpb24gKGluY2x1ZGVzIEFNL1BNKSBzdG9yZWQgaW4gYW4gaHRtbCBhdHRyaWJ1dGUgKi9cbiAgLmZjLXRpbWUtZ3JpZCAuZmMtZXZlbnQgLmZjLXRpbWU6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS1mdWxsKTsgfVxuXG4gIC8qIFZlcnRpY2FsIFNjcm9sbGVyICYgQ29udGFpbmVyc1xuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gIC8qIGtpbGwgdGhlIHNjcm9sbGJhcnMgYW5kIGFsbG93IG5hdHVyYWwgaGVpZ2h0ICovXG4gIC5mYy1zY3JvbGxlcixcbiAgLmZjLWRheS1ncmlkLWNvbnRhaW5lcixcbiAgLmZjLXRpbWUtZ3JpZC1jb250YWluZXIge1xuICAgIC8qICovXG4gICAgb3ZlcmZsb3c6IHZpc2libGUgIWltcG9ydGFudDtcbiAgICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDsgfVxuXG4gIC8qIGtpbGwgdGhlIGhvcml6b250YWwgYm9yZGVyL3BhZGRpbmcgdXNlZCB0byBjb21wZW5zYXRlIGZvciBzY3JvbGxiYXJzICovXG4gIC5mYy1yb3cge1xuICAgIGJvcmRlcjogMCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogMCAhaW1wb3J0YW50OyB9XG5cbiAgLyogQnV0dG9uIENvbnRyb2xzXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgLmZjLWJ1dHRvbi1ncm91cCxcbiAgLmZjIGJ1dHRvbiB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICAvKiBkb24ndCBkaXNwbGF5IGFueSBidXR0b24tcmVsYXRlZCBjb250cm9scyAqLyB9IH1cbiIsIi8qIVxuRnVsbENhbGVuZGFyIERheSBHcmlkIFBsdWdpbiB2NC4xLjBcbkRvY3MgJiBMaWNlbnNlOiBodHRwczovL2Z1bGxjYWxlbmRhci5pby9cbihjKSAyMDE5IEFkYW0gU2hhd1xuKi9cbi8qIERheUdyaWRWaWV3XG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBkYXkgcm93IHN0cnVjdHVyZSAqL1xuLmZjLWRheUdyaWRXZWVrLXZpZXcgLmZjLWNvbnRlbnQtc2tlbGV0b24sXG4uZmMtZGF5R3JpZERheS12aWV3IC5mYy1jb250ZW50LXNrZWxldG9uIHtcbiAgLyogdGhlcmUgbWF5IGJlIHdlZWsgbnVtYmVycyBpbiB0aGVzZSB2aWV3cywgc28gbm8gcGFkZGluZy10b3AgKi9cbiAgcGFkZGluZy1ib3R0b206IDFlbTtcbiAgLyogZW5zdXJlIGEgc3BhY2UgYXQgYm90dG9tIG9mIGNlbGwgZm9yIHVzZXIgc2VsZWN0aW5nL2NsaWNraW5nICovIH1cblxuLmZjLWRheUdyaWQtdmlldyAuZmMtYm9keSAuZmMtcm93IHtcbiAgbWluLWhlaWdodDogNGVtO1xuICAvKiBlbnN1cmUgdGhhdCBhbGwgcm93cyBhcmUgYXQgbGVhc3QgdGhpcyB0YWxsICovIH1cblxuLyogYSBcInJpZ2lkXCIgcm93IHdpbGwgdGFrZSB1cCBhIGNvbnN0YW50IGFtb3VudCBvZiBoZWlnaHQgYmVjYXVzZSBjb250ZW50LXNrZWxldG9uIGlzIGFic29sdXRlICovXG4uZmMtcm93LmZjLXJpZ2lkIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuXG4uZmMtcm93LmZjLXJpZ2lkIC5mYy1jb250ZW50LXNrZWxldG9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwOyB9XG5cbi8qIHdlZWsgYW5kIGRheSBudW1iZXIgc3R5bGluZyAqL1xuLmZjLWRheS10b3AuZmMtb3RoZXItbW9udGgge1xuICBvcGFjaXR5OiAwLjM7IH1cblxuLmZjLWRheUdyaWQtdmlldyAuZmMtd2Vlay1udW1iZXIsXG4uZmMtZGF5R3JpZC12aWV3IC5mYy1kYXktbnVtYmVyIHtcbiAgcGFkZGluZzogMnB4OyB9XG5cbi5mYy1kYXlHcmlkLXZpZXcgdGguZmMtd2Vlay1udW1iZXIsXG4uZmMtZGF5R3JpZC12aWV3IHRoLmZjLWRheS1udW1iZXIge1xuICBwYWRkaW5nOiAwIDJweDtcbiAgLyogY29sdW1uIGhlYWRlcnMgY2FuJ3QgaGF2ZSBhcyBtdWNoIHYgc3BhY2UgKi8gfVxuXG4uZmMtbHRyIC5mYy1kYXlHcmlkLXZpZXcgLmZjLWRheS10b3AgLmZjLWRheS1udW1iZXIge1xuICBmbG9hdDogcmlnaHQ7IH1cblxuLmZjLXJ0bCAuZmMtZGF5R3JpZC12aWV3IC5mYy1kYXktdG9wIC5mYy1kYXktbnVtYmVyIHtcbiAgZmxvYXQ6IGxlZnQ7IH1cblxuLmZjLWx0ciAuZmMtZGF5R3JpZC12aWV3IC5mYy1kYXktdG9wIC5mYy13ZWVrLW51bWJlciB7XG4gIGZsb2F0OiBsZWZ0O1xuICBib3JkZXItcmFkaXVzOiAwIDAgM3B4IDA7IH1cblxuLmZjLXJ0bCAuZmMtZGF5R3JpZC12aWV3IC5mYy1kYXktdG9wIC5mYy13ZWVrLW51bWJlciB7XG4gIGZsb2F0OiByaWdodDtcbiAgYm9yZGVyLXJhZGl1czogMCAwIDAgM3B4OyB9XG5cbi5mYy1kYXlHcmlkLXZpZXcgLmZjLWRheS10b3AgLmZjLXdlZWstbnVtYmVyIHtcbiAgbWluLXdpZHRoOiAxLjVlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xuICBjb2xvcjogIzgwODA4MDsgfVxuXG4vKiB3aGVuIHdlZWsvZGF5IG51bWJlciBoYXZlIG93biBjb2x1bW4gKi9cbi5mYy1kYXlHcmlkLXZpZXcgdGQuZmMtd2Vlay1udW1iZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cblxuLmZjLWRheUdyaWQtdmlldyB0ZC5mYy13ZWVrLW51bWJlciA+ICoge1xuICAvKiB3b3JrIGFyb3VuZCB0aGUgd2F5IHdlIGRvIGNvbHVtbiByZXNpemluZyBhbmQgZW5zdXJlIGEgbWluaW11bSB3aWR0aCAqL1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1pbi13aWR0aDogMS4yNWVtOyB9XG4iLCJAaW1wb3J0ICd+QGZ1bGxjYWxlbmRhci9jb3JlL21haW4uY3NzJztcclxuQGltcG9ydCAnfkBmdWxsY2FsZW5kYXIvZGF5Z3JpZC9tYWluLmNzcyc7XHJcblxyXG4jdGltZS1waWNrZXItd3JhcHBlcntcclxuICAgIHotaW5kZXg6IDcwMDAgIWltcG9ydGFudDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDQ2OGY7XHJcbiAgfVxyXG4gIl19 */", '', '']]

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!../node_modules/postcss-loader/src??embedded!./styles.css */ "./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src/index.js?!./src/styles.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 5:
/*!******************************!*\
  !*** multi ./src/styles.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\ThomasLeonardoHerrer\Documents\GitHub\TESIS\Fuentes\Front\src\styles.css */"./src/styles.css");


/***/ })

},[[5,"runtime"]]]);
//# sourceMappingURL=styles.js.map