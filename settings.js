require("./all/module.js")

//========== Setting Owner ==========//
global.owner = "6285713107279"
global.namaowner = "Pakoy ID"
global.namaowner2 = "Pakoy ID"

//======== Setting Bot & Link ========//
global.namabot = "Pakoy ID" 
global.namabot2 = "Pakoy ID"
global.version = "v1.0.0"
global.foother = "Created By Pakoy ID"
global.linkgc = 'https://chat.whatsapp.com/KSzHychQNNP2oNMUUq7RCC'
global.db = { data: { chats: {} } };
global.linksaluran = "https://whatsapp.com/channel/0029Vb60rjm05MUhvzLPU125"
global.linkyt = 'https://wkwkwk-wheat.vercel.app'
global.linktele = "https://t.me/"
global.packname = "Created By"
global.author = "Pakoy ID"

//========== Setting Auto react  ===========//
global.settings = {
    autoreact: false
}

// Pick random emoji react status
global.emoji = [
    "🥶",
    "🙄",
    "😳",
    "😒",
    "🥰",
    "😎",
    "🫣",
    "😍",
    "😨",
    "😁",
    "😂",
    "👀",
    "👿",
    "🤖",
    "😮"
]
//========== Setting Event ==========//
global.welcome = true
global.autoread = false
global.anticall = false
global.autoreadsw = false
global.owneroff = false
global.antibug = true

//==== Waktu Jeda Jpm & Pushkon ====//
global.delaypushkontak = 4500
global.delayjpm = 1000

//========== Setting Foto ===========//

//========== Setting Panell ==========//
global.egg = "15"
global.loc = "1"
global.domain = "https://"
global.apikey = "plta_"
global.capikey = "pltc_"

//========= Setting Payment =========//
//Kalo Gak Ada Isi Aja jadi false
global.dana = "-"
global.gopay = "-"
global.ovo = "-"
global.qris = fs.readFileSync("./media/qris.jpg")

//========= Setting Payment =========// 
global.namadana = "-"
global.namagopay = "-"
global.namaovo = "-" 
                          
//=========== Api Domain ===========//
global.zone1 = ""
global.apitoken1 = ""
global.tld1 = ""

//========== Api Domain 2 ==========//
global.zone2 = "";
global.apitoken2 = "";
global.tld2 = "";
//========== Api Domain 3 ==========//
global.zone3 = "";
global.apitoken3 = "";
global.tld3 = "";
//========== Api Domain 4 ==========//
global.zone4 = "";
global.apitoken4 = "";
global.tld4 = "";

//========= Setting Message =========//
global.msg = {
"error": "Error terjasi kesalahan",
"done": "Done Bang ✅", 
"wait": "Bot Sedang Memproses Tunggu Sebentar . . .", 
"group": "*• Group Only* Fitur Ini Hanya Untuk Di Dalam Grup!", 
"private": "*• Private Chat* Fitur Ini Hanya Untuk Didalam Private Chat!", 
"admin": "*• Admin Only* Fitur Ini Hanya Untuk Admin Grup!", 
"adminbot": "*• Bot Admin* Fitur Ini Dapat Digunakan Ketika Bot Menjadi Admin", 
"owner": "*• Owner Only* Fitur Ini Hanya Untuk Owner Bot!", 
"developer": "*• Developer Only* Fitur Ini Hanya Untuk Developer"
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})