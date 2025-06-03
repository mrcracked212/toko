const axios = require('axios');
const BodyForm = require('form-data');
const { fromBuffer } = require('file-type');
const fetch = require('node-fetch');
const fs = require('fs');
const crypto = require('crypto')
const chalk = require('chalk')
const cheerio = require('cheerio');

async function TelegraPh(Path) {
  if (!fs.existsSync(Path)) {
    throw new Error("File not Found");
  }
 try {
 let formData = new BodyForm();
 formData.append("images", fs.createReadStream(Path));

 let headers = {
 headers: {
 ...formData.getHeaders(),
 },
 };

 let { data: uploads } = await axios.post(
 "https://telegraph.zorner.men/upload",
 formData,
 headers
 );

 return {
 uploadedLinks: uploads.links,
 };
 } catch (e) {
 console.error(e.message);
 return { error: e.message };
 }
};

async function catbox(content) {
  const { ext, mime } = (await fromBuffer(content)) || {};


  const formData = new BodyForm();
  const randomBytes = crypto.randomBytes(5).toString("hex");
  formData.append("reqtype", "fileupload");
  //formData.append("fileToUpload", blob, randomBytes + "." + ext);
  formData.append('fileToUpload', content, { filename: "tmp"+randomBytes + '.' + ext, contentType: mime });

  const response = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: formData,
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36",
      //...formData.getHeaders(),
    },
  });

  return await response.text();
}

async function UploadFileUgu(input) {
  const form = new BodyForm();
  form.append("files[]", fs.createReadStream(input));

  try {
    const { data } = await axios.post("https://uguu.se/upload.php", form, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
        ...form.getHeaders(),
      },
    });

    return data.files[0];
  } catch (err) {
    throw err;
  }
}

async function webp2mp4File(path) {
  const form = new BodyForm();
  form.append('new-image-url', '');
  form.append('new-image', fs.createReadStream(path));

  try {
    const { data } = await axios.post('https://s6.ezgif.com/webp-to-mp4', form, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
      },
    });

    const bodyFormThen = new BodyForm();
    const $ = cheerio.load(data);
    const file = $('input[name="file"]').attr('value');
    bodyFormThen.append('file', file);
    bodyFormThen.append('convert', "Convert WebP to MP4!");

    const { data: secondData } = await axios.post('https://ezgif.com/webp-to-mp4/' + file, bodyFormThen, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`,
      },
    });

    const $2 = cheerio.load(secondData);
    const result = 'https:' + $2('div#output > p.outfile > video > source').attr('src');

    return {
      status: true,
      message: "Created By Zetsuboxygen",
      result: result
    };
  } catch (err) {
    throw err;
  }
}


async function floNime(medianya, options = {}) {
  const { ext } = await fromBuffer(medianya) || options.ext;
  var form = new BodyForm();
  form.append('file', medianya, 'tmp.' + ext);
  let response = await fetch('https://flonime.my.id/upload', {
    method: 'POST',
    body: form
  });
  let jsonnya = await response.json();
  return jsonnya;
}

async function pomfCDN(path) {
  try {
    const fileStream = fs.createReadStream(path);
    const formData = new BodyForm();
    formData.append('files[]', fileStream);

    const response = await axios.post('https://pomf.lain.la/upload.php', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    return response.data.files[0].url
  } catch (error) {
    console.log("Error at pomf uploader in lib/uploader.js:", error)
    return "error"
  }
}

async function webp2mp4(urls) {
    try {
        const response = await axios.get(`https://ezgif.com/webp-to-mp4?url=${urls}`);
        const $ = cheerio.load(response.data);
        const formAction = $('form.ajax-form').attr('action');
        const fileName = $('input[name="file"]').val();
        
        const postResponse = await axios.post(formAction, new URLSearchParams({
            file: fileName
        }), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:128.0) Gecko/128.0 Firefox/128.0',
                'Referer': urls
            }
        });

        const $post = cheerio.load(postResponse.data);
        const videoSrc = $post('p.outfile video source').attr('src');
        const fullVideoUrl = videoSrc && videoSrc.startsWith('//') ? `https:${videoSrc}` : videoSrc;

        return {
          success: true,
          redirectUrl: response.request.res.responseUrl,
          fileName: fileName,
          convertUrl: fullVideoUrl
        };
    } catch (error) {
      return { success: false, message: error.message };
      console.error("Error:", error.response ? error.response.data : error.message);      
    }
}

module.exports = { TelegraPh, catbox, UploadFileUgu, webp2mp4File, floNime, pomfCDN, webp2mp4 };

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})