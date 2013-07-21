/*
 * parser for MSC (messsage sequence chart)
 * see http://www.mcternan.me.uk/mscgen/ for more 
 * information
 * - In the original mscgen booleans and ints are 
 *   allowed in some of the options, without presenting them
 *   as quotes, but floats are not. Pourquoi? This PEG 
 *   does allow them ...
 * - quoted identifiers present some problems in mscgen in this
 *   pathological case:
 *   define entitites "C" and C 
 *   - the entities are rendered as separate ones
 *   - C -> "C",  generates a self-reference
 *     to C, as does "C" -> C and "C" -> "C"
 *   mscgen_js does not render the entities as separate ones
 * - in mscgen grammar, only the option list is optional;
 *   empty input (no entities/ no arcs) is apparently not allowed
 *   mscgen_js does allow this
 * 
 * - there's some kludgy non-DRY code still. 
 */

{
    function merge(obj1,obj2){
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    }
}

program         = _ x:starttoken _  "{" _ d:declarationlist _ "}" _ 
{ return merge (d[0], merge (d[1], d[2])) }

starttoken      = "msc"i

declarationlist = (o:optionlist {return {options:o}})? 
                  (e:entitylist {return {entities:e}})?
                  (a:arclist {return {arcs:a}})?
optionlist      = o:((o:option "," {return o})* 
                  (o:option ";" {return o})) 
{
  var lOptionList = new Object();
  var opt, bla;
  for (opt in o[0]) {
    for (bla in o[0][opt]){
      lOptionList[bla]=o[0][opt][bla];
    }
  }
  lOptionList = merge(lOptionList, o[1]);
  return lOptionList;
}

option          = _ n:optionname _ "=" _ 
                  v:(s:string {return s}
                     / i:number {return i.toString()}
                     / b:boolean {return b.toString()}) _ 
{
   var lOption = new Object();
   n = n.toLowerCase();
   lOption[n]=v;
   return lOption;
}
optionname      = "hscale"i / "width"i / "arcgradient"i
                  /"wordwraparcs"i
entitylist      = el:((e:entity "," {return e})* (e:entity ";" {return e}))
{
  el[0].push(el[1]);
  return el[0];
}
entity "entity" =  _ i:identifier _ al:("[" a:attributelist  "]" {return a})? _
{
  var lOption = new Object();
  lOption["name"] = i;
  lOption = merge (lOption, al);
  return lOption;
}
arclist         = (a:arcline _ ";" {return a})+
arcline         = al:((a:arc "," {return a})* (a:arc {return [a]}))
{
   al[0].push(al[1][0]);

   return al[0];
}
arc             = a:((a:singlearc {return a}) 
                / (a:dualarc {return a})
                / (a:commentarc {return a}))
                  al:("[" al:attributelist "]" {return al})?
{
  a = merge (a, al);
  return a;
}

singlearc       = _ kind:singlearctoken _ {return {kind:kind}}
commentarc      = _ kind:commenttoken _ {return {kind:kind}}
dualarc         = 
 (_ from:identifier _ kind:dualarctoken _ to:identifier _
  {return {kind: kind, from:from, to:to}})
/(_ "*" _ kind:bckarrowtoken _ to:identifier _
  {return {kind:kind, from: "*", to:to}})
/(_ from:identifier _ kind:fwdarrowtoken _ "*" _
  {return {kind:kind, from: from, to:"*"}})
singlearctoken  = "|||" / "..." 
commenttoken    = "---"
dualarctoken    =   "--"  / "<->"
                  / "=="  / "<<=>>"
                          / "<=>"
                  / ".."  / "<<>>"
                  / "::"  / "<:>" 
                  / fwdarrowtoken / bckarrowtoken
                  / "note"i / "abox"i / "rbox"i / "box"i
fwdarrowtoken   "left to right arrow"
                = "->" / "=>>"/ "=>" / ">>"/ ":>" / "-x"i
bckarrowtoken   "right to left arrow"
                = "<-" / "<<=" / "<=" / "<<" / "<:" / "x-"i 

attributelist   = al:((a:attribute "," {return a})* (a:attribute {return a}))
{
  var obj = new Object();
  var opt, bla;
  for (opt in al[0]) {
    for (bla in al[0][opt]){
      obj[bla]=al[0][opt][bla];
    }
  }
  obj = merge(obj, al[1]);
  return obj;
}
attribute       = _ n:attributename _ "=" _ v:string _
{
  var lAttribute = new Object();
  n = n.toLowerCase();
  n = n.replace("colour", "color");
  lAttribute[n] = v;
  return lAttribute 
}
attributename  "attribute name" 
                =  "label"i / "idurl"i/ "id"i / "url"i 
                  / "linecolor"i / "linecolour"i
                  / "textcolor"i / "textcolour"i
                  / "textbgcolor"i / "textbgcolour"i 
                  / "arclinecolor"i / "arclinecolour"i 
                  / "arctextcolor"i / "arctextcolour"i
                  / "arctextbgcolor"i / "arctextbgcolour"i
                  / "arcskip"i

string          = '"' s:stringcontent '"' {return s.join("")}
stringcontent   = (!'"' c:('\\"'/ .) {return c})*

identifier "identifier"
 = (letters:([A-Za-z_0-9])+ {return letters.join("")})
  / string

whitespace "whitespace"
                = [ \t]
lineend "lineend"
                = [\r\n]
comment "comment"
                =   ("//" / "#" ) ([^\r\n])*
                  / "/*" (!"*/" .)* "*/"
_               = ((whitespace)+ / (lineend)+ / (comment)+)*

number = real / integer
integer "integer"
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }

real "real"
  = digits:([0-9]+ "." [0-9]+) { return parseFloat(digits.join("")); }

boolean "boolean"
  = "true"i / "false"i

/*
    This file is part of mscgen_js.

    mscgen_js is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    mscgen_js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with mscgen_js.  If not, see <http://www.gnu.org/licenses/>.
*/