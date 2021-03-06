/**
 * Module dependencies
 */

var url = require('url'),
   domains = require('./domains');

/**
 * Check if the given `path` is an URL
 *
 * @param {String} path -
 *
 * @return {Boolean}
 * @api private
 */

exports.isURL = function isURL(path) {
   var regex = /(https?:)?\/\/([\-\w\.]+)+/i;
   return regex.test(path);
};

/**
 * Convert a relative/absolute path into an URL
 *
 * @param {String} path - relative/absolute path to a resource
 * @param {String} uri - url
 *
 * @return {String}
 * @api private
 */

exports.toURL = function toURL(path,uri){
   var absolutePath = path;
   if(!exports.isURL(path)){
      var explodeURL = url.parse(uri);
      // 2 cases: absolute path and relative path to the current pathname
      if( path.charAt(0) === '/'){
         absolutePath = explodeURL.protocol + '//' + explodeURL.host + path;
      }else{
         var explodePathname = explodeURL.pathname.split('/');
         var pathname = explodePathname.slice(0,explodePathname.length - 1).join('/');
         absolutePath = explodeURL.protocol + '//' + (explodeURL.host + '/' +pathname + '/' + path).replace('\/\/','/','g');
      }
   }
   return absolutePath;
};

/**
 * Inline the text, remove characters "/n" and " " (space)
 *
 * @param {String} text -
 *
 * @return {String}
 * @api private
 */

exports.inline = function inline(text){
   var explode = text.split('\n').join('').split(' ');
   var size = explode.length;
   for(var i=0; i < size ; i++){
      if(!explode[i]){
         explode.splice(i,1);
         i--;
         size--;
      }
   }
   return explode.join(' ').trim();
};



/**
 * Get the name of the website from an uri
 *
 * @param {String} uri
 *
 * @return {String} - name of the website
 * @api private
 */

exports.getWebsiteName = function getWebsiteName(uri){
   var hostname = url.parse(uri).hostname;
   var name = '';
   if(hostname){
      var subdomains = domains;
      var components = hostname.split('.');
      for(var i = components.length -1 ; i >=  0; i-- ){
         if(subdomains[components[i]]){
            subdomains = subdomains[components[i]];
         }else{
            name = components[i];
            break;
         }
      }
   }
   return name;
};