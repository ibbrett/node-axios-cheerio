const axios = require('axios');
const cheerio = require('cheerio'); // html parsing
const baseUrl = 'https://www.webmd.com/rx/browse-drugs/';

/**
 *
 *  get drug list objects for specified letter of the alphabet
 *
 **/
const getDrugList = async ( letter ) => {

  try {

    const list = await axios.get( baseUrl + letter )
      .then((response) => {
          if(response.status === 200) {
              const html = response.data;
              const $ = cheerio.load(html);
              const drugList = [];
              $('div.results-by-letter ul li a').each(function(i, elem) {
               
                  drugList[i] = {
                      href: $(this).attr('href'),
                      name: $(this).text().trim()
                  }      
               
              });

              return drugList;

          }
      }, (error) => console.log(err) );

    return list;

  } catch (err) { console.error(err); }

};

const drive = async () => {

  console.log(await getDrugList('a'));
  process.exit();

};

drive();
