var scrapinode = require('./../main.js')();

var url = 'http://www.amazon.co.uk/gp/product/B004NNU9YM/ref=s9_simh_gw_p23_d1_g23_i5?pf_rd_m=A3P5ROKL5A1OLE&pf_rd_s=center-3&pf_rd_r=147TGMN0P7SCYD1BCNKC&pf_rd_t=101&pf_rd_p=467128473&pf_rd_i=468294';

scrapinode.createScraper(url,'jsdom',function(err,scraper){
   if(err){
    console.log(err);
   }else{
      var title = scraper.get('title');
      var description = scraper.get('description');
      var images = scraper.get('images');
      console.log('IMAGES');
      console.log(images);
      console.log('TITLE:'+title);
      console.log('DESCRIPTION');
      console.log(description);
   }
});
