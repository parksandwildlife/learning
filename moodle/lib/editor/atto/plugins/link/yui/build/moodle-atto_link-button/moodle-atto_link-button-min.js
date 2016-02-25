YUI.add("moodle-atto_link-button",function(e,t){var n="atto_link",r={NEWWINDOW:"atto_link_openinnewwindow",URLINPUT:"atto_link_urlentry"},i={URLINPUT:".atto_link_urlentry"},s='<form class="atto_form"><label for="{{elementid}}_atto_link_urlentry">{{get_string "enterurl" component}}</label><input class="fullwidth url {{CSS.URLINPUT}}" type="url" id="{{elementid}}_atto_link_urlentry" size="32"/><br/>{{#if showFilepicker}}<button class="openlinkbrowser">{{get_string "browserepositories" component}}</button><br/>{{/if}}<input type="checkbox" class="newwindow" id="{{elementid}}_{{CSS.NEWWINDOW}}"/><label class="sameline" for="{{elementid}}_{{CSS.NEWWINDOW}}">{{get_string "openinnewwindow" component}}</label><br/><div class="mdl-align"><br/><button type="submit" class="submit">{{get_string "createlink" component}}</button></div></form>';e.namespace("M.atto_link").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{_currentSelection:null,_content:null,initializer:function(){this.addButton({icon:"e/insert_edit_link",callback:this._displayDialogue,tags:"a",tagMatchRequiresAll:!1}),this.addButton({buttonName:"unlink",callback:this._unlink,icon:"e/remove_link",title:"unlink",tags:"a",tagMatchRequiresAll:!1})},_displayDialogue:function(){this._currentSelection=this.get("host").getSelection();if(this._currentSelection===!1)return;var e=this.getDialogue({headerContent:M.util.get_string("createlink",n),focusAfterHide:!0,focusOnShowSelector:i.URLINPUT});e.set("bodyContent",this._getDialogueContent()),this._resolveAnchors(),e.show()},_resolveAnchors:function(){var t=this.get("host").getSelectionParentNode(),n,r,i,s;if(!t)return;n=this._findSelectedAnchors(e.one(t)),n.length>0&&(r=n[0],this._currentSelection=this.get("host").getSelectionFromNode(r),i=r.getAttribute("href"),s=r.getAttribute("target"),i!==""&&this._content.one(".url").setAttribute("value",i),s==="_blank"?this._content.one(".newwindow").setAttribute("checked","checked"):this._content.one(".newwindow").removeAttribute("checked"))},_filepickerCallback:function(e){this.getDialogue().set("focusAfterHide",null).hide(),e.url!==""&&(this._setLinkOnSelection(e.url),this.markUpdated())},_setLink:function(e){var t,n;e.preventDefault(),this.getDialogue({focusAfterHide:null}).hide(),t=this._content.one(".url"),n=t.get("value"),n!==""&&(this._setLinkOnSelection(n),this.markUpdated())},_setLinkOnSelection:function(t){var n=this.get("host"),r,i,s,o;this.editor.focus(),n.setSelection(this._currentSelection),this._currentSelection[0].collapsed?(r=e.Node.create("<a>"+t+"</a>"),r.setAttribute("href",t),i=n.insertContentAtFocusPoint(r.get("outerHTML")),n.setSelection(n.getSelectionFromNode(i))):(document.execCommand("unlink",!1,null),document.execCommand("createLink",!1,t),i=n.getSelectionParentNode());if(!i)return;return o=this._findSelectedAnchors(e.one(i)),e.Array.each(o,function(e){s=this._content.one(".newwindow"),s.get("checked")?e.setAttribute("target","_blank"):e.removeAttribute("target")},this),i},_findSelectedAnchors:function(e){var t=e.get("tagName"),n,r;return t&&t.toLowerCase()==="a"?[e]:(r=[],e.all("a").each(function(e){!n&&this.get("host").selectionContainsNode(e)&&r.push(e)},this),r.length>0?r:(n=e.ancestor("a"),n?[n]:[]))},_getDialogueContent:function(){var t=this.get("host").canShowFilepicker("link"),i=e.Handlebars.compile(s);return this._content=e.Node.create(i({showFilepicker:t,component:n,CSS:r})),this._content.one(".submit").on("click",this._setLink,this),t&&this._content.one(".openlinkbrowser").on("click",function(e){e.preventDefault(),this.get("host").showFilepicker("link",this._filepickerCallback,this)},this),this._content},_unlink:function(){var e=this.get("host"),t=e.getSelection();if(t&&t.length)if(t[0].startOffset===t[0].endOffset){var n=e.getSelectedNodes();n&&(n.each(function(t){var n=t.ancestor("a",!0);n&&(e.setSelection(e.getSelectionFromNode(n)),document.execCommand("unlink",!1,null))},this),this.markUpdated())}else document.execCommand("unlink",!1,null),this.markUpdated()}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});
