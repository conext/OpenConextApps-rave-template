/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Default container configuration. To change the configuration, you have two options:
//
// A. If you run the Java server: Create your own "myContainer.js" file and
// modify the value in web.xml.
//
//  B. If you run the PHP server: Create a myContainer.js, copy the contents of container.js to it,
//  change
//		{"gadgets.container" : ["default"],
//  to
//		{"gadgets.container" : ["myContainer"],
// And make your changes that you need to myContainer.js.
// Just make sure on the iframe URL you specify &container=myContainer
// for it to use that config.
//
// All configurations will automatically inherit values from this
// config, so you only need to provide configuration for items
// that you require explicit special casing for.
//
// Please namespace your attributes using the same conventions
// as you would for javascript objects, e.g. gadgets.features
// rather than "features".

// NOTE: Please _don't_ leave trailing commas because the php json parser
// errors out on this.

// Container must be an array; this allows multiple containers
// to share configuration.

// Note that you can embed values directly or you can choose to have values read from a file on disk
// or read from the classpath ("foo-key" : "file:///foo-file.txt" || "foo-key" : "res://foo-file.txt")
// TODO: Move out accel container config into a separate accel.js file.
{"gadgets.container" : ["default", "accel"],

// Set of regular expressions to validate the parent parameter. This is
// necessary to support situations where you want a single container to support
// multiple possible host names (such as for localized domains, such as
// <language>.example.org. If left as null, the parent parameter will be
// ignored; otherwise, any requests that do not include a parent
// value matching this set will return a 404 error.
"gadgets.parent" : null,

// Should all gadgets be forced on to a locked domain?
"gadgets.uri.iframe.lockedDomainRequired" : false,

// DNS domain on which gadgets should render.
// Default Uri config: these must be overridden - specified here for testing purposes
"gadgets.uri.iframe.unlockedDomain": "${Cur['defaultShindigTestAuthority']}",
// When setting up the server to enable locked domains, you should set this to something that does not
// attempt to use the authority at all.  Ideally it would be another hostname that points to this server.
// Example: unlockedDomain="shindig.example.com" lockedDomainSuffix="-locked.gadgets.example.com"
"gadgets.uri.iframe.lockedDomainSuffix": "${Cur['defaultShindigTestAuthority']}",

// Origins for CORS requests and/or Referer validation
// Indicate a set of origins or an entry with * to indicate that all origins are allowed
"gadgets.parentOrigins" : ["*"],

// Various urls generated throughout the code base.
// iframeBaseUri will automatically have the host inserted
// if locked domain is enabled and the implementation supports it.
// query parameters will be added.
"gadgets.iframeBaseUri" : "/gadgets/ifr",
"gadgets.uri.iframe.basePath" : "/gadgets/ifr",
"gadgets.uri.iframe.alwaysAppendSecurityToken" : true,

// jsUriTemplate will have %host% and %js% substituted.
// No locked domain special cases, but jsUriTemplate must
// never conflict with a lockedDomainSuffix.
"gadgets.jsUriTemplate" : "https://rave-shindig.example.com/gadgets/js/%js%",

"gadgets.uri.js.host" : "https://www.example.com/",
"gadgets.uri.js.path" : "/gadgets/js",

// Callback URL.  Scheme relative URL for easy switch between https/http.
"gadgets.uri.oauth.callbackTemplate" : "//rave-shindig.example.com/gadgets/oauthcallback",

// Config param to load Opensocial data for social
// preloads in data pipelining.  %host% will be
// substituted with the current host.
"gadgets.osDataUri" : "https://rave-shindig.example.com/rpc",

// Use an insecure security token by default
//"gadgets.securityTokenType" : "insecure",

// Uncomment the securityTokenType and one of the securityTokenKey's to switch to a secure version.
// Note that you can choose to use an embedded key, a filesystem reference or a classpath reference.
// The best way to generate a key is to do something like this:
// dd if=/dev/random bs=32 count=1 | openssl base64
//
"gadgets.securityTokenType" : "secure",
//"gadgets.securityTokenKey" : "default-insecure-embedded-key",
//"gadgets.securityTokenKey" : "file:///path/to/key/file.txt",
"gadgets.securityTokenKey" : "res://security_token_encryption_key.txt",

// OS 2.0 Gadget DOCTYPE: used in Gadgets with @specificationVersion 2.0 or greater and
// quirksmode on Gadget has not been set.
"gadgets.doctype_qname" : "HTML",  //HTML5 doctype
"gadgets.doctype_pubid" : "",
"gadgets.doctype_sysid" : "",


// Authority (host:port without scheme) for the default shindig test instance.
"defaultShindigTestAuthority":"rave-shindig.example.com",

// Authority (host:port without scheme) for the proxy and concat servlets.
"defaultShindigProxyConcatAuthority":"rave-shindig.example.com",

// Default Js Uri config: also must be overridden.
"gadgets.uri.js.host": "//${Cur['defaultShindigTestAuthority']}",
"gadgets.uri.js.path": "/gadgets/js",

// Default concat Uri config; used for testing.
"gadgets.uri.concat.host" : "${Cur['defaultShindigProxyConcatAuthority']}",
"gadgets.uri.concat.path" : "/gadgets/concat",
"gadgets.uri.concat.js.splitToken" : "false",

// Default proxy Uri config; used for testing.
"gadgets.uri.proxy.host" : "${Cur['defaultShindigProxyConcatAuthority']}",
"gadgets.uri.proxy.path" : "/gadgets/proxy",

//Enables/Disables feature administration
"gadgets.admin.enableFeatureAdministration" : "false",

//Enables whitelist checks
"gadgets.admin.enableGadgetWhitelist" : "false",

// This config data will be passed down to javascript. Please
// configure your object using the feature name rather than
// the javascript name.

// Only configuration for required features will be used.
// See individual feature.xml files for configuration details.
"gadgets.features" : {
  "core.io" : {
    // Note: /proxy is an open proxy. Be careful how you expose this!
    // Note: Here // is replaced with the current protocol http/https
   //"proxyUrl" : "//rave-shindig.example.com/gadgets/proxy?container=%container%%rewriteMime%&refresh=%refresh%&gadget=%gadget%/%rawurl%",
    "proxyUrl" : "//rave-shindig.example.com/gadgets/proxy?container=%container%&refresh=%refresh%&url=%url%%rewriteMime%",
    "jsonProxyUrl" : "//rave-shindig.example.com/gadgets/makeRequest"
  },
  "views" : {
    "profile" : {
      "isOnlyVisible" : false,
      "urlTemplate" : "https://rave-shindig.example.com/gadgets/profile?{var}",
      "aliases": ["DASHBOARD", "default"]
    },
    "canvas" : {
      "isOnlyVisible" : true,
      "urlTemplate" : "https://rave-shindig.example.com/gadgets/canvas?{var}",
      "aliases" : ["FULL_PAGE"]
    },
    "default" : {
      "isOnlyVisible" : false,
      "urlTemplate" : "https://rave-shindig.example.com/gadgets/default?{var}",
      "aliases" : ["home", "profile", "canvas"]
    }
  },
  "tabs": {
    "css" : [
      ".tablib_table {",
      "width: 100%;",
      "border-collapse: separate;",
      "border-spacing: 0px;",
      "empty-cells: show;",
      "font-size: 11px;",
      "text-align: center;",
    "}",
    ".tablib_emptyTab {",
      "border-bottom: 1px solid #676767;",
      "padding: 0px 1px;",
    "}",
    ".tablib_spacerTab {",
      "border-bottom: 1px solid #676767;",
      "padding: 0px 1px;",
      "width: 1px;",
    "}",
    ".tablib_selected {",
      "padding: 2px;",
      "background-color: #ffffff;",
      "border: 1px solid #676767;",
      "border-bottom-width: 0px;",
      "color: #3366cc;",
      "font-weight: bold;",
      "width: 80px;",
      "cursor: default;",
    "}",
    ".tablib_unselected {",
      "padding: 2px;",
      "background-color: #dddddd;",
      "border: 1px solid #aaaaaa;",
      "border-bottom-color: #676767;",
      "color: #000000;",
      "width: 80px;",
      "cursor: pointer;",
    "}",
    ".tablib_navContainer {",
      "width: 10px;",
      "vertical-align: middle;",
    "}",
    ".tablib_navContainer a:link, ",
    ".tablib_navContainer a:visited, ",
    ".tablib_navContainer a:hover {",
      "color: #3366aa;",
      "text-decoration: none;",
    "}"
    ]
  },
  "minimessage": {
      "css": [
        ".mmlib_table {",
        "width: 100%;",
        "font: bold 9px arial,sans-serif;",
        "background-color: #fff4c2;",
        "border-collapse: separate;",
        "border-spacing: 0px;",
        "padding: 1px 0px;",
      "}",
      ".mmlib_xlink {",
        "font: normal 1.1em arial,sans-serif;",
        "font-weight: bold;",
        "color: #0000cc;",
        "cursor: pointer;",
      "}"
     ]
  },
  "rpc" : {
    // Path to the relay file. Automatically appended to the parent
    // parameter if it passes input validation and is not null.
    // This should never be on the same host in a production environment!
    // Only use this for TESTING!
    "parentRelayUrl" : "/container/rpc_relay.html",

    // If true, this will use the legacy ifpc wire format when making rpc
    // requests.
    "useLegacyProtocol" : false,

    // Path to the cross-domain enabling SWF for rpc's Flash transport.
    "commSwf": "/xpc.swf",
    "passReferrer": "c2p:query"
  },
  // Skin defaults
  "skins" : {
    "properties" : {
      "BG_COLOR": "",
      "BG_IMAGE": "",
      "BG_POSITION": "",
      "BG_REPEAT": "",
      "FONT_COLOR": "",
      "ANCHOR_COLOR": ""
    }
  },
  "opensocial" : {
    // Path to fetch opensocial data from
    // Must be on the same domain as the gadget rendering server
    "path" : "https://rave-shindig.example.com/rpc",
    // Path to issue invalidate calls
    "invalidatePath" : "https://rave-shindig.example.com/rpc",
    "domain" : "shindig",
    "enableCaja" : false,
    "supportedFields" : {
       "person" : ["id", {"name" : ["familyName", "givenName", "unstructured"]}, "thumbnailUrl", "profileUrl"],
       "activity" : ["appId", "body", "bodyId", "externalId", "id", "mediaItems", "postedTime", "priority", 
                     "streamFaviconUrl", "streamSourceUrl", "streamTitle", "streamUrl", "templateParams", "title",
                     "url", "userId"],
       "activityEntry" : ["actor", "content", "generator", "icon", "id", "object", "published", "provider", "target",
                          "title", "updated", "url", "verb"],
       "album" : ["id", "thumbnailUrl", "title", "description", "location", "ownerId"],
       "mediaItem" : ["album_id", "created", "description", "duration", "file_size", "id", "language", "last_updated",
                      "location", "mime_type", "num_comments", "num_views", "num_votes", "rating", "start_time",
                      "tagged_people", "tags", "thumbnail_url", "title", "type", "url"]
    }
  },
  "osapi.services" : {
    // Specifying a binding to "container.listMethods" instructs osapi to dynamicaly introspect the services
    // provided by the container and delay the gadget onLoad handler until that introspection is
    // complete.
    // Alternatively a container can directly configure services here rather than having them
    // introspected. Simply list out the available servies and omit "container.listMethods" to
    // avoid the initialization delay caused by gadgets.rpc
    // E.g. "gadgets.rpc" : ["activities.requestCreate", "messages.requestSend", "requestShareApp", "requestPermission"]
    "gadgets.rpc" : ["container.listMethods"]
  },
  "osapi" : {
    // The endpoints to query for available JSONRPC/REST services
    "endPoints" : [ "//rave-shindig.example.com/rpc" ]
  },
  "osml": {
    // OSML library resource.  Can be set to null or the empty string to disable OSML
    // for a container.
    "library": "config/OSML_library.xml"
  },
  "shindig-container": {
    "serverBase": "/gadgets/"
  },
  "container" : {
    "relayPath": "/gadgets/files/container/rpc_relay.html",

    //Enables/Disables the RPC arbitrator functionality in the common container
    "enableRpcArbitration": false
  }
}}
