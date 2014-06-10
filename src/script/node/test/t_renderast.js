var assert = require("assert");
var renderer = require("../../renderast");
var fix = require("./astfixtures");
var tst = require ("./testutensils");
var jsdom = require('jsdom');
var fs = require('fs');


function ast2svg(pAST, pWindow) {
    // make a deep copy first, as renderAST actively modifies its input
    var lFixtureString = JSON.stringify(pAST, null, " ");
    var lFixture = JSON.parse(lFixtureString);
    renderer.clean("__svg", pWindow);
    renderer.renderAST(lFixture, lFixtureString, "__svg", pWindow);
    return pWindow.document.body.innerHTML;
}

function processAndCompare(pExpectedFile, pInputFile) {
    jsdom.env("<html><body></body></html>", function(err, window) {
        tst.assertequalProcessing(pExpectedFile, pInputFile, function(pInput) {
            return ast2svg(JSON.parse(pInput), window);
        });
    });
};

describe('renderast', function() {
    describe('#renderAST() - xu everyting', function() {

        it('should render all the stuff', function() {
            processAndCompare('./src/script/node/test/fixtures/test01_all_possible_arcs.svg', //
            './src/script/node/test/fixtures/test01_all_possible_arcs.json');
        });

        it('should render colors', function() {
            processAndCompare('./src/script/node/test/fixtures/rainbow.svg', //
            './src/script/node/test/fixtures/rainbow.json');
        }); 
    });
    
    describe('#renderAST() - mscgen classic compatible - simple syntax trees', function() {

        it('should, given a simple syntax tree, render an svg', function() {
            jsdom.env("<html><body></body></html>", function(err, window) {
                var lSvg = ast2svg(fix.astSimple, window);
                var lExpectedSvg = '<svg version="1.1" id="mscgen_js$svg$__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="336" height="120"><desc id="mscgen_js$svg$__svg__msc_source">\n\
\n\
# Generated by mscgen_js - http://sverweij.github.io/mscgen_js\n\
{\n\
 "entities": [\n\
  {\n\
   "name": "a"\n\
  },\n\
  {\n\
   "name": "b space"\n\
  }\n\
 ],\n\
 "arcs": [\n\
  [\n\
   {\n\
    "kind": "=&gt;",\n\
    "from": "a",\n\
    "to": "b space",\n\
    "label": "a simple script"\n\
   }\n\
  ]\n\
 ]\n\
}</desc><defs><style type="text/css">svg {     font-family: Helvetica, sans-serif;     font-size: 9pt;     background-color: white;     stroke : black;     color  : black; } rect {     fill: none;     stroke: black;     stroke-width: 2; } .bglayer {     fill:white;     stroke: white;     stroke-width: 0; } rect.textbg {     fill:white;     stroke:white;     stroke-width:0;     opacity: 0.9; } line {     stroke: black;     stroke-width: 2; } .arcrowomit {     stroke-dasharray: 2,2; } text {     color: inherit;     stroke: none;     text-anchor: middle; } text.entity {     text-decoration : underline; } text.anchor-start {     text-anchor: start; }path {     stroke: black;     color: black;     stroke-width: 2;     fill: none; } .dotted {    stroke-dasharray: 5,2; } .striped {     stroke-dasharray: 10,5; } .arrow-marker {     overflow:visible; } .arrow-style {     stroke : black;     stroke-dasharray : 100,1; /* \'none\' should work, but doesn\'t in webkit */     stroke-width : 1; } .filled {     stroke:inherit;     fill:black; /* no-inherit */ } .arcrowomit {     stroke-dasharray: 2,2; } .box {     /* fill: #ffc;  no-inherit */     fill : white;     opacity: 0.9; } .boxtext, .arctext {     font-size: 0.8em;     text-anchor: middle; } .comment {     stroke-dasharray: 5,2; } .signal {     marker-end : url(#signal); } .signal-u {     marker-end : url(#signal-u); } .signal-both {     marker-end : url(#signal);     marker-start : url(#signal-l); } .signal-both-u {     marker-end : url(#signal-u);     marker-start : url(#signal-lu); } .signal-both-self {     marker-end : url(#signal-u);     marker-start : url(#signal-l); } .method {     marker-end : url(#method); } .method-both {     marker-end : url(#method);     marker-start : url(#method-l); } .returnvalue {     stroke-dasharray: 5,2;     marker-end : url(#callback); } .returnvalue-both {     stroke-dasharray: 5,2;     marker-end : url(#callback);     marker-start : url(#callback-l); } .callback {     marker-end : url(#callback); } .callback-both {     marker-end : url(#callback);     marker-start : url(#callback-l); } .emphasised {     marker-end : url(#method); } .emphasised-both {     marker-end : url(#method);     marker-start : url(#method-l); } .lost {     marker-end : url(#lost); } .inherit {     stroke : inherit;     color : inherit; } .inherit-fill {     fill : inherit; } .watermark {     stroke: black;     color : black;     fill  : black;     font-size: 48pt;     font-weight: bold;     opacity : 0.14; }</style><marker orient="auto" id="signal" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><path d="M 9 3 l -8 2" class="arrow-style"></path></marker><marker orient="auto" id="signal-u" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><path d="M 9 3 l -8 -2" class="arrow-style"></path></marker><marker orient="auto" id="signal-l" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><path d="M 9 3 l 8 2" class="arrow-style"></path></marker><marker orient="auto" id="signal-lu" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><path d="M 9 3 l 8 -2" class="arrow-style"></path></marker><marker orient="auto" id="method" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><polygon points="1,1 9,3 1,5" class="filled arrow-style"></polygon></marker><marker orient="auto" id="method-l" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><polygon points="17,1 9,3 17,5" class="filled arrow-style"></polygon></marker><marker orient="auto" id="callback" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><path d="M 1 1 l 8 2 l -8 2" class="arrow-style"></path></marker><marker orient="auto" id="callback-l" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><path d="M 17 1 l -8 2 l 8 2" class="arrow-style"></path></marker><marker orient="auto" id="lost" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><path d="M6.5,-0.5 L11.5,5.5 M6.5,5.5 L11.5,-0.5" class="arrow-style"></path></marker><g id="mscgen_js$svg$__svg__defs"><g id="mscgen_js$svg$__svga"><rect width="100" height="38" style=""></rect><g id="mscgen_js$svg$__svga_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="50" y="22.75" class="entity"><tspan>a</tspan></text></g></g><g id="mscgen_js$svg$__svgb space"><rect width="100" height="38" style=""></rect><g id="mscgen_js$svg$__svgb space_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="50" y="22.75" class="entity"><tspan>b space</tspan></text></g></g><g id="mscgen_js$svg$__svgarcrow"><line x1="50" y1="-19" x2="50" y2="19" class="mscgen_js$svg$__svgarcrow"></line><line x1="210" y1="-19" x2="210" y2="19" class="mscgen_js$svg$__svgarcrow"></line></g><g id="mscgen_js$svg$__svg0_0"><line x1="50" y1="0" x2="210" y2="0" class="method"></line><g id="mscgen_js$svg$__svg0_0_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="-4.25"><tspan>a simple script</tspan></text><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="11.75"><tspan></tspan></text></g></g><g id="mscgen_js$svg$__svgarcrow_0"><line x1="50" y1="-19" x2="50" y2="19" class="arcrow"></line><line x1="210" y1="-19" x2="210" y2="19" class="arcrow"></line></g></g></defs><g id="mscgen_js$svg$__svg__body" transform="translate(38,3) scale(1,1)"><g id="mscgen_js$svg$__svg__background"><rect width="336" height="120" x="-38" y="-3" class="bglayer"></rect></g><g id="mscgen_js$svg$__svg__arcspanlayer"></g><g id="mscgen_js$svg$__svg__lifelinelayer"><use x="0" y="57" xlink:href="#mscgen_js$svg$__svgarcrow"></use><use x="0" y="95" xlink:href="#mscgen_js$svg$__svgarcrow_0"></use></g><g id="mscgen_js$svg$__svg__sequencelayer"><use x="0" y="0" xlink:href="#mscgen_js$svg$__svga"></use><use x="160" y="0" xlink:href="#mscgen_js$svg$__svgb space"></use><use x="0" y="95" xlink:href="#mscgen_js$svg$__svg0_0"></use></g><g id="mscgen_js$svg$__svg__notelayer"></g><g id="mscgen_js$svg$__svg__watermark"></g></g></svg>';
                assert.equal(lSvg, lExpectedSvg);
            });
        });
        it('should, given the cheat sheet syntax tree, render an svg', function() {
            jsdom.env("<html><body></body></html>", function(err, window) {
                var lSvg = ast2svg(fix.astCheatSheet, window);
                var lExpectedSvg = '<svg version="1.1" id="mscgen_js$svg$__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="336" height="538"><desc id="mscgen_js$svg$__svg__msc_source">\n\
\n\
# Generated by mscgen_js - http://sverweij.github.io/mscgen_js\n\
{\n\
 "entities": [\n\
  {\n\
   "name": "a"\n\
  },\n\
  {\n\
   "name": "b"\n\
  }\n\
 ],\n\
 "arcs": [\n\
  [\n\
   {\n\
    "kind": "-&gt;",\n\
    "from": "a",\n\
    "to": "b",\n\
    "label": "a -&gt; b  (signal)"\n\
   }\n\
  ],\n\
  [\n\
   {\n\
    "kind": "=&gt;",\n\
    "from": "a",\n\
    "to": "b",\n\
    "label": "a =&gt; b  (method)"\n\
   }\n\
  ],\n\
  [\n\
   {\n\
    "kind": "&gt;&gt;",\n\
    "from": "b",\n\
    "to": "a",\n\
    "label": "b &gt;&gt; a  (return value)"\n\
   }\n\
  ],\n\
  [\n\
   {\n\
    "kind": "=&gt;&gt;",\n\
    "from": "a",\n\
    "to": "b",\n\
    "label": "a =&gt;&gt; b (callback)"\n\
   }\n\
  ],\n\
  [\n\
   {\n\
    "kind": "-x",\n\
    "from": "a",\n\
    "to": "b",\n\
    "label": "a -x b  (lost)"\n\
   }\n\
  ],\n\
  [\n\
   {\n\
    "kind": ":&gt;",\n\
    "from": "a",\n\
    "to": "b",\n\
    "label": "a :&gt; b  (emphasis)"\n\
   }\n\
  ],\n\
  [\n\
   {\n\
    "kind": "..",\n\
    "from": "a",\n\
    "to": "b",\n\
    "label": "a .. b  (dotted)"\n\
   }\n\
  ],\n\
  [\n\
   {\n\
    "kind": "note",\n\
    "from": "a",\n\
    "to": "a",\n\
    "label": "a note a"\n\
   },\n\
   {\n\
    "kind": "box",\n\
    "from": "b",\n\
    "to": "b",\n\
    "label": "b box b"\n\
   }\n\
  ],\n\
  [\n\
   {\n\
    "kind": "rbox",\n\
    "from": "a",\n\
    "to": "a",\n\
    "label": "a rbox a"\n\
   },\n\
   {\n\
    "kind": "abox",\n\
    "from": "b",\n\
    "to": "b",\n\
    "label": "b abox b"\n\
   }\n\
  ],\n\
  [\n\
   {\n\
    "kind": "|||",\n\
    "label": "||| (empty row)"\n\
   }\n\
  ],\n\
  [\n\
   {\n\
    "kind": "...",\n\
    "label": "... (omitted row)"\n\
   }\n\
  ],\n\
  [\n\
   {\n\
    "kind": "---",\n\
    "label": "--- (comment)"\n\
   }\n\
  ]\n\
 ]\n\
}</desc><defs><style type="text/css">svg {     font-family: Helvetica, sans-serif;     font-size: 9pt;     background-color: white;     stroke : black;     color  : black; } rect {     fill: none;     stroke: black;     stroke-width: 2; } .bglayer {     fill:white;     stroke: white;     stroke-width: 0; } rect.textbg {     fill:white;     stroke:white;     stroke-width:0;     opacity: 0.9; } line {     stroke: black;     stroke-width: 2; } .arcrowomit {     stroke-dasharray: 2,2; } text {     color: inherit;     stroke: none;     text-anchor: middle; } text.entity {     text-decoration : underline; } text.anchor-start {     text-anchor: start; }path {     stroke: black;     color: black;     stroke-width: 2;     fill: none; } .dotted {    stroke-dasharray: 5,2; } .striped {     stroke-dasharray: 10,5; } .arrow-marker {     overflow:visible; } .arrow-style {     stroke : black;     stroke-dasharray : 100,1; /* \'none\' should work, but doesn\'t in webkit */     stroke-width : 1; } .filled {     stroke:inherit;     fill:black; /* no-inherit */ } .arcrowomit {     stroke-dasharray: 2,2; } .box {     /* fill: #ffc;  no-inherit */     fill : white;     opacity: 0.9; } .boxtext, .arctext {     font-size: 0.8em;     text-anchor: middle; } .comment {     stroke-dasharray: 5,2; } .signal {     marker-end : url(#signal); } .signal-u {     marker-end : url(#signal-u); } .signal-both {     marker-end : url(#signal);     marker-start : url(#signal-l); } .signal-both-u {     marker-end : url(#signal-u);     marker-start : url(#signal-lu); } .signal-both-self {     marker-end : url(#signal-u);     marker-start : url(#signal-l); } .method {     marker-end : url(#method); } .method-both {     marker-end : url(#method);     marker-start : url(#method-l); } .returnvalue {     stroke-dasharray: 5,2;     marker-end : url(#callback); } .returnvalue-both {     stroke-dasharray: 5,2;     marker-end : url(#callback);     marker-start : url(#callback-l); } .callback {     marker-end : url(#callback); } .callback-both {     marker-end : url(#callback);     marker-start : url(#callback-l); } .emphasised {     marker-end : url(#method); } .emphasised-both {     marker-end : url(#method);     marker-start : url(#method-l); } .lost {     marker-end : url(#lost); } .inherit {     stroke : inherit;     color : inherit; } .inherit-fill {     fill : inherit; } .watermark {     stroke: black;     color : black;     fill  : black;     font-size: 48pt;     font-weight: bold;     opacity : 0.14; }</style><marker orient="auto" id="signal" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><path d="M 9 3 l -8 2" class="arrow-style"></path></marker><marker orient="auto" id="signal-u" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><path d="M 9 3 l -8 -2" class="arrow-style"></path></marker><marker orient="auto" id="signal-l" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><path d="M 9 3 l 8 2" class="arrow-style"></path></marker><marker orient="auto" id="signal-lu" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><path d="M 9 3 l 8 -2" class="arrow-style"></path></marker><marker orient="auto" id="method" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><polygon points="1,1 9,3 1,5" class="filled arrow-style"></polygon></marker><marker orient="auto" id="method-l" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><polygon points="17,1 9,3 17,5" class="filled arrow-style"></polygon></marker><marker orient="auto" id="callback" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><path d="M 1 1 l 8 2 l -8 2" class="arrow-style"></path></marker><marker orient="auto" id="callback-l" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><path d="M 17 1 l -8 2 l 8 2" class="arrow-style"></path></marker><marker orient="auto" id="lost" class="arrow-marker" viewBox="0 0 10 10" refX="9" refY="3" markerUnits="strokeWidth" markerWidth="10" markerHeight="10"><path d="M6.5,-0.5 L11.5,5.5 M6.5,5.5 L11.5,-0.5" class="arrow-style"></path></marker><g id="mscgen_js$svg$__svg__defs"><g id="mscgen_js$svg$__svga"><rect width="100" height="38" style=""></rect><g id="mscgen_js$svg$__svga_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="50" y="22.75" class="entity"><tspan>a</tspan></text></g></g><g id="mscgen_js$svg$__svgb"><rect width="100" height="38" style=""></rect><g id="mscgen_js$svg$__svgb_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="50" y="22.75" class="entity"><tspan>b</tspan></text></g></g><g id="mscgen_js$svg$__svgarcrow"><line x1="50" y1="-19" x2="50" y2="19" class="mscgen_js$svg$__svgarcrow"></line><line x1="210" y1="-19" x2="210" y2="19" class="mscgen_js$svg$__svgarcrow"></line></g><g id="mscgen_js$svg$__svg0_0"><line x1="50" y1="0" x2="210" y2="0" class="signal"></line><g id="mscgen_js$svg$__svg0_0_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="-4.25"><tspan>a -&gt; b  (signal)</tspan></text><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="11.75"><tspan></tspan></text></g></g><g id="mscgen_js$svg$__svgarcrow_0"><line x1="50" y1="-19" x2="50" y2="19" class="arcrow"></line><line x1="210" y1="-19" x2="210" y2="19" class="arcrow"></line></g><g id="mscgen_js$svg$__svg1_0"><line x1="50" y1="0" x2="210" y2="0" class="method"></line><g id="mscgen_js$svg$__svg1_0_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="-4.25"><tspan>a =&gt; b  (method)</tspan></text><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="11.75"><tspan></tspan></text></g></g><g id="mscgen_js$svg$__svgarcrow_1"><line x1="50" y1="-19" x2="50" y2="19" class="arcrow"></line><line x1="210" y1="-19" x2="210" y2="19" class="arcrow"></line></g><g id="mscgen_js$svg$__svg2_0"><line x1="210" y1="0" x2="50" y2="0" class="returnvalue"></line><g id="mscgen_js$svg$__svg2_0_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="-4.25"><tspan>b &gt;&gt; a  (return value)</tspan></text><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="11.75"><tspan></tspan></text></g></g><g id="mscgen_js$svg$__svgarcrow_2"><line x1="50" y1="-19" x2="50" y2="19" class="arcrow"></line><line x1="210" y1="-19" x2="210" y2="19" class="arcrow"></line></g><g id="mscgen_js$svg$__svg3_0"><line x1="50" y1="0" x2="210" y2="0" class="callback"></line><g id="mscgen_js$svg$__svg3_0_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="-4.25"><tspan>a =&gt;&gt; b (callback)</tspan></text><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="11.75"><tspan></tspan></text></g></g><g id="mscgen_js$svg$__svgarcrow_3"><line x1="50" y1="-19" x2="50" y2="19" class="arcrow"></line><line x1="210" y1="-19" x2="210" y2="19" class="arcrow"></line></g><g id="mscgen_js$svg$__svg4_0"><line x1="50" y1="0" x2="170" y2="0" class="lost"></line><g id="mscgen_js$svg$__svg4_0_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="110" y="-4.25"><tspan>a -x b  (lost)</tspan></text><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="110" y="11.75"><tspan></tspan></text></g></g><g id="mscgen_js$svg$__svgarcrow_4"><line x1="50" y1="-19" x2="50" y2="19" class="arcrow"></line><line x1="210" y1="-19" x2="210" y2="19" class="arcrow"></line></g><g id="mscgen_js$svg$__svg5_0"><path d="M50,0l1,0M50,-2 l160,0M50,2 l160,0M209,0l1,0" class="emphasised"></path><g id="mscgen_js$svg$__svg5_0_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="-4.25"><tspan>a :&gt; b  (emphasis)</tspan></text><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="11.75"><tspan></tspan></text></g></g><g id="mscgen_js$svg$__svgarcrow_5"><line x1="50" y1="-19" x2="50" y2="19" class="arcrow"></line><line x1="210" y1="-19" x2="210" y2="19" class="arcrow"></line></g><g id="mscgen_js$svg$__svg6_0"><line x1="50" y1="0" x2="210" y2="0" class="dotted"></line><g id="mscgen_js$svg$__svg6_0_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="-4.25"><tspan>a .. b  (dotted)</tspan></text><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="11.75"><tspan></tspan></text></g></g><g id="mscgen_js$svg$__svgarcrow_6"><line x1="50" y1="-19" x2="50" y2="19" class="arcrow"></line><line x1="210" y1="-19" x2="210" y2="19" class="arcrow"></line></g><g id="mscgen_js$svg$__svg7_0"><path d="M-28,-17l147,0 l0,9 l9,0 m-9,-9 l9,9 l0,25 l-156,0 l0,-34 " class="box" style=""></path><g id="mscgen_js$svg$__svg7_0_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="50" y="3.75"><tspan>a note a</tspan></text></g></g><g id="mscgen_js$svg$__svg7_1"><rect width="156" height="34" x="132" y="-17" class="box" style=""></rect><g id="mscgen_js$svg$__svg7_1_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="210" y="3.75"><tspan>b box b</tspan></text></g></g><g id="mscgen_js$svg$__svgarcrow_7"><line x1="50" y1="-19" x2="50" y2="19" class="arcrow"></line><line x1="210" y1="-19" x2="210" y2="19" class="arcrow"></line></g><g id="mscgen_js$svg$__svg8_0"><rect width="156" height="34" x="-28" y="-17" rx="6" ry="6" class="box" style=""></rect><g id="mscgen_js$svg$__svg8_0_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="50" y="3.75"><tspan>a rbox a</tspan></text></g></g><g id="mscgen_js$svg$__svg8_1"><path d="M132,0l3, -17l150,0l3,17l-3,17l-150,0 l-3,-17" class="box" style=""></path><g id="mscgen_js$svg$__svg8_1_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="210" y="3.75"><tspan>b abox b</tspan></text></g></g><g id="mscgen_js$svg$__svgarcrow_8"><line x1="50" y1="-19" x2="50" y2="19" class="arcrow"></line><line x1="210" y1="-19" x2="210" y2="19" class="arcrow"></line></g><g id="mscgen_js$svg$__svg9_0"><g id="mscgen_js$svg$__svg9_0"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="3.75"><tspan>||| (empty row)</tspan></text></g></g><g id="mscgen_js$svg$__svgarcrow_9"><line x1="50" y1="-19" x2="50" y2="19" class="arcrow"></line><line x1="210" y1="-19" x2="210" y2="19" class="arcrow"></line></g><g id="mscgen_js$svg$__svg10_0"><g id="mscgen_js$svg$__svg10_0"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="3.75"><tspan>... (omitted row)</tspan></text></g></g><g id="mscgen_js$svg$__svgarcrow_10"><line x1="50" y1="-19" x2="50" y2="19" class="arcrowomit"></line><line x1="210" y1="-19" x2="210" y2="19" class="arcrowomit"></line></g><g id="mscgen_js$svg$__svg11_0"><line x1="0" y1="0" x2="260" y2="0" class="dotted"></line><g id="mscgen_js$svg$__svg11_0_txt"><g id="mscgen_js$svg$__svg11_0_txt"><rect width="15" height="15" x="2" y="2" class="textbg"></rect><text x="130" y="3.75"><tspan>--- (comment)</tspan></text></g></g></g><g id="mscgen_js$svg$__svgarcrow_11"><line x1="50" y1="-19" x2="50" y2="19" class="arcrow"></line><line x1="210" y1="-19" x2="210" y2="19" class="arcrow"></line></g></g></defs><g id="mscgen_js$svg$__svg__body" transform="translate(38,3) scale(1,1)"><g id="mscgen_js$svg$__svg__background"><rect width="336" height="538" x="-38" y="-3" class="bglayer"></rect></g><g id="mscgen_js$svg$__svg__arcspanlayer"></g><g id="mscgen_js$svg$__svg__lifelinelayer"><use x="0" y="57" xlink:href="#mscgen_js$svg$__svgarcrow"></use><use x="0" y="95" xlink:href="#mscgen_js$svg$__svgarcrow_0"></use><use x="0" y="133" xlink:href="#mscgen_js$svg$__svgarcrow_1"></use><use x="0" y="171" xlink:href="#mscgen_js$svg$__svgarcrow_2"></use><use x="0" y="209" xlink:href="#mscgen_js$svg$__svgarcrow_3"></use><use x="0" y="247" xlink:href="#mscgen_js$svg$__svgarcrow_4"></use><use x="0" y="285" xlink:href="#mscgen_js$svg$__svgarcrow_5"></use><use x="0" y="323" xlink:href="#mscgen_js$svg$__svgarcrow_6"></use><use x="0" y="361" xlink:href="#mscgen_js$svg$__svgarcrow_7"></use><use x="0" y="399" xlink:href="#mscgen_js$svg$__svgarcrow_8"></use><use x="0" y="437" xlink:href="#mscgen_js$svg$__svgarcrow_9"></use><use x="0" y="475" xlink:href="#mscgen_js$svg$__svgarcrow_10"></use><use x="0" y="513" xlink:href="#mscgen_js$svg$__svgarcrow_11"></use></g><g id="mscgen_js$svg$__svg__sequencelayer"><use x="0" y="0" xlink:href="#mscgen_js$svg$__svga"></use><use x="160" y="0" xlink:href="#mscgen_js$svg$__svgb"></use><use x="0" y="95" xlink:href="#mscgen_js$svg$__svg0_0"></use><use x="0" y="133" xlink:href="#mscgen_js$svg$__svg1_0"></use><use x="0" y="171" xlink:href="#mscgen_js$svg$__svg2_0"></use><use x="0" y="209" xlink:href="#mscgen_js$svg$__svg3_0"></use><use x="0" y="247" xlink:href="#mscgen_js$svg$__svg4_0"></use><use x="0" y="285" xlink:href="#mscgen_js$svg$__svg5_0"></use><use x="0" y="323" xlink:href="#mscgen_js$svg$__svg6_0"></use><use x="0" y="437" xlink:href="#mscgen_js$svg$__svg9_0"></use><use x="0" y="475" xlink:href="#mscgen_js$svg$__svg10_0"></use><use x="0" y="513" xlink:href="#mscgen_js$svg$__svg11_0"></use></g><g id="mscgen_js$svg$__svg__notelayer"><use x="0" y="361" xlink:href="#mscgen_js$svg$__svg7_0"></use><use x="0" y="361" xlink:href="#mscgen_js$svg$__svg7_1"></use><use x="0" y="399" xlink:href="#mscgen_js$svg$__svg8_0"></use><use x="0" y="399" xlink:href="#mscgen_js$svg$__svg8_1"></use></g><g id="mscgen_js$svg$__svg__watermark"></g></g></svg>';
                assert.equal(lSvg, lExpectedSvg);
            });
        });
    });
});
